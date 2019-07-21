const fs = require('fs')
const { remote } = require('electron')
const { app, dialog } = remote

const Page = require('./page')
const Splash = require('./splash')

const isJSON = text => {
  try {
    JSON.parse(text)
    return true
  } catch (error) {
    return false
  }
}

class Project {
  constructor () {
    this.pages = []

    this.index = 0
    this.original = ''
  }

  start () {
    // Load previous files
    if (localStorage.hasOwnProperty('paths')) {
      if (isJSON(localStorage.getItem('paths'))) {
        let paths = JSON.parse(localStorage.getItem('paths'))
        for (const id in paths) {
          left.project.add(paths[id])
        }
      }
    }

    // Add splash
    if (this.pages.length === 0) {
      left.project.pages.push(new Splash())
    }
  }

  add (path = null) {
    console.log(`Adding page(${path})`)

    this.remove_splash()

    let page = new Page()

    if (path) {
      if (this.paths().indexOf(path) > -1) {
        console.warn(`Already open(skipped): ${path}`)
        return
      }
      if (!this.load(path)) {
        console.warn(`Invalid url(skipped): ${path}`)
        return
      }
      page = new Page(this.load(path), path)
    }

    this.pages.push(page)
    left.go.to_page(this.pages.length - 1)

    localStorage.setItem('paths', JSON.stringify(this.paths()))
  }

  page () {
    return this.pages[this.index]
  }

  update () {
    if (!this.page()) {
      console.warn('Missing page')
      return
    }

    this.page().commit(left.textarea_el.value)
  }

  load (path) {
    console.log(`Load: ${path}`)

    let data
    try {
      data = fs.readFileSync(path, 'utf-8')
    } catch (err) {
      console.warn(`Could not load ${path}`)
      return
    }
    return data
  }

  // ========================

  new () {
    console.log('New Page')

    this.add()
    left.reload()

    setTimeout(() => {
      left.navi.next_page()
      left.textarea_el.focus()
    }, 200)
  }

  open () {
    console.log('Open Pages')

    let paths = dialog.showOpenDialog(app.win, { properties: ['openFile', 'multiSelections'] })

    if (!paths) {
      console.log('Nothing to load')
      return
    }

    for (const id in paths) {
      this.add(paths[id])
    }

    setTimeout(() => {
      left.navi.next_page()
      left.update()
    }, 200)
  }

  save () {
    console.log('Save Page')

    let page = this.page()

    if (!page.path) {
      this.save_as()
      return
    }

    fs.writeFile(page.path, page.text, err => {
      if (err) {
        alert('An error ocurred updating the file' + err.message)
        console.log(err)
        return
      }
      left.update()
      setTimeout(() => {
        left.stats.el.innerHTML = `<b>Saved</b> ${page.path}`
      }, 200)
    })
  }

  save_as () {
    console.log('Save As Page')

    let page = this.page()
    let path = dialog.showSaveDialog(app.win)

    if (!path) {
      console.log('Nothing to save')
      return
    }

    fs.writeFile(path, page.text, err => {
      if (err) {
        alert('An error ocurred creating the file ' + err.message)
        return
      }
      if (!page.path) {
        page.path = path
      } else if (page.path !== path) {
        left.project.pages.push(new Page(page.text, path))
      }
      left.update()
      setTimeout(() => {
        left.stats.el.innerHTML = `<b>Saved</b> ${page.path}`
      }, 200)
    })
  }

  close () {
    if (this.pages.length === 1) {
      console.warn('Cannot close')
      return
    }

    if (this.page().has_changes()) {
      let response = dialog.showMessageBox(app.win, {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'Confirm',
        message: 'Are you sure you want to discard changes?',
        icon: `${app.getAppPath()}/icon.png`
      })
      if (response !== 0) {
        return
      }
    }
    this.force_close()
    localStorage.setItem('paths', JSON.stringify(this.paths()))
  }

  force_close () {
    if (this.pages.length === 1) {
      console.warn('Cannot close')
      return
    }

    console.log('Closing..')

    this.pages.splice(this.index, 1)
    left.go.to_page(this.index - 1)
  }

  discard () {
    let response = dialog.showMessageBox(app.win, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to discard changes?',
      icon: `${app.getAppPath()}/icon.png`
    })
    if (response === 0) {
      // Runs the following if 'Yes' is clicked
      left.reload(true)
    }
  }

  has_changes () {
    for (const id in this.pages) {
      if (this.pages[id].has_changes()) {
        return true
      }
    }
    return false
  }

  quit () {
    if (this.has_changes()) {
      this.quit_dialog()
    } else {
      app.exit()
    }
  }

  quit_dialog () {
    let response = dialog.showMessageBox(app.win, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Unsaved data will be lost. Are you sure you want to quit?',
      icon: `${app.getAppPath()}/icon.png`
    })
    if (response === 0) {
      app.exit()
    }
  }

  remove_splash () {
    for (const id in this.pages) {
      let page = this.pages[id]
      if (page.text === new Splash().text) {
        this.pages.splice(0, 1)
        return
      }
    }
  }

  paths () {
    let a = []
    for (const id in this.pages) {
      let page = this.pages[id]
      if (page.path) {
        a.push(page.path)
      }
    }
    return a
  }
}

export default Project
