'use strict'

import { remote } from 'electron'

import { controls, roles } from './controls'

const app = remote.app

class Controller {
  constructor () {
    this.menu = { default: {} }
    this.mode = 'default'
  }

  start () {
    controls.forEach(({ mode, cat, label, fn, accelerator }) =>
      this.add(mode, cat, label, fn, accelerator)
    )
    roles.forEach(({ mode, cat, label }) => this.addRole(mode, cat, label))
  }

  add (mode, cat, label, fn, accelerator) {
    if (!this.menu[mode]) {
      this.menu[mode] = {}
    }
    if (!this.menu[mode][cat]) {
      this.menu[mode][cat] = {}
    }
    this.menu[mode][cat][label] = { fn: fn, accelerator: accelerator }
  }

  addRole (mode, cat, label) {
    if (!this.menu[mode]) {
      this.menu[mode] = {}
    }
    if (!this.menu[mode][cat]) {
      this.menu[mode][cat] = {}
    }
    this.menu[mode][cat][label] = { role: label }
  }

  clearCat (mode, cat) {
    if (this.menu[mode]) {
      this.menu[mode][cat] = {}
    }
  }

  set (mode = 'default') {
    this.mode = mode
    this.commit()
  }

  format () {
    const f = []
    const m = this.menu[this.mode]
    for (const cat in m) {
      const submenu = []
      for (const name in m[cat]) {
        const option = m[cat][name]
        if (option.role) {
          submenu.push({ role: option.role })
        } else {
          submenu.push({ label: name, accelerator: option.accelerator, click: option.fn })
        }
      }
      f.push({ label: cat, submenu: submenu })
    }
    return f
  }

  commit () {
    app.injectMenu(this.format())
  }

  accelerator (key, menu) {
    const acc = { basic: null, ctrl: null }
    for (cat in menu) {
      const options = menu[cat]
      for (const id in options.submenu) {
        const option = options.submenu[id]
        if (option.role) {
          continue
        }
        acc.basic =
          option.accelerator.toLowerCase() === key.toLowerCase()
            ? option.label
              .toUpperCase()
              .replace('TOGGLE ', '')
              .substr(0, 8)
              .trim()
            : acc.basic
        acc.ctrl =
          option.accelerator.toLowerCase() === ('CmdOrCtrl+' + key).toLowerCase()
            ? option.label
              .toUpperCase()
              .replace('TOGGLE ', '')
              .substr(0, 8)
              .trim()
            : acc.ctrl
      }
    }
    return acc
  }

  docs () {
    // TODO
    console.log(this.menu.default)
  }
}

module.exports = Controller
