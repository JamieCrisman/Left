const controls = [
  {
    mode: 'default',
    cat: '*',
    label: 'About',
    fn: () => {
      shell.openExternal('https://github.com/hundredrabbits/Left')
    },
    accelerator: 'CmdOrCtrl+,'
  },
  {
    mode: 'default',
    cat: '*',
    label: 'Fullscreen',
    fn: () => {
      app.toggleFullscreen()
    },
    accelerator: 'CmdOrCtrl+Enter'
  },
  {
    mode: 'default',
    cat: '*',
    label: 'Hide',
    fn: () => {
      app.toggleVisible()
    },
    accelerator: 'CmdOrCtrl+H'
  },
  {
    mode: 'default',
    cat: '*',
    label: 'Reset',
    fn: () => {
      left.reset()
    },
    accelerator: 'CmdOrCtrl+Backspace'
  },
  {
    mode: 'default',
    cat: '*',
    label: 'Quit',
    fn: () => {
      left.project.quit()
    },
    accelerator: 'CmdOrCtrl+Q'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'New',
    fn: () => {
      left.project.new()
    },
    accelerator: 'CmdOrCtrl+N'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Open',
    fn: () => {
      left.project.open()
    },
    accelerator: 'CmdOrCtrl+O'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Save',
    fn: () => {
      left.project.save()
    },
    accelerator: 'CmdOrCtrl+S'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Save As',
    fn: () => {
      left.project.save_as()
    },
    accelerator: 'CmdOrCtrl+Shift+S'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Discard Changes',
    fn: () => {
      left.project.discard()
    },
    accelerator: 'CmdOrCtrl+D'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Close File',
    fn: () => {
      left.project.close()
    },
    accelerator: 'CmdOrCtrl+W'
  },
  {
    mode: 'default',
    cat: 'File',
    label: 'Force Close',
    fn: () => {
      left.project.force_close()
    },
    accelerator: 'CmdOrCtrl+Shift+W'
  },
  {
    mode: 'default',
    cat: 'Edit',
    label: 'Add Linebreak',
    fn: () => {
      left.go.to_next(EOL, false)
      left.inject(EOL)
    },
    accelerator: 'CmdOrCtrl+Shift+Enter'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Select Autocomplete',
    fn: () => {
      left.select_autocomplete()
    },
    accelerator: 'Tab'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Select Synonym',
    fn: () => {
      left.select_synonym()
    },
    accelerator: 'Shift+Tab'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Find',
    fn: () => {
      left.operator.start('find: ')
    },
    accelerator: 'CmdOrCtrl+F'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Replace',
    fn: () => {
      left.operator.start('replace: a -> b')
    },
    accelerator: 'CmdOrCtrl+Shift+F'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Goto',
    fn: () => {
      left.operator.start('goto: ')
    },
    accelerator: 'CmdOrCtrl+G'
  },
  {
    mode: 'default',
    cat: 'Select',
    label: 'Open Url',
    fn: () => {
      left.open_url()
    },
    accelerator: 'CmdOrCtrl+B'
  },
  {
    mode: 'default',
    cat: 'Navigation',
    label: 'Next File',
    fn: () => {
      left.navi.next_page()
    },
    accelerator: 'CmdOrCtrl+Shift+]'
  },
  {
    mode: 'default',
    cat: 'Navigation',
    label: 'Prev File',
    fn: () => {
      left.navi.prev_page()
    },
    accelerator: 'CmdOrCtrl+Shift+['
  },
  {
    mode: 'default',
    cat: 'Navigation',
    label: 'Next Marker',
    fn: () => {
      left.navi.next_marker()
    },
    accelerator: 'CmdOrCtrl+]'
  },
  {
    mode: 'default',
    cat: 'Navigation',
    label: 'Prev Marker',
    fn: () => {
      left.navi.prev_marker()
    },
    accelerator: 'CmdOrCtrl+['
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Toggle Navigation',
    fn: () => {
      left.navi.toggle()
    },
    accelerator: 'CmdOrCtrl+\\'
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Previous Font',
    fn: () => {
      left.font.previousFont()
    },
    accelerator: 'CmdOrCtrl+Shift+,'
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Next Font',
    fn: () => {
      left.font.nextFont()
    },
    accelerator: 'CmdOrCtrl+Shift+.'
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Decrease Font Size',
    fn: () => {
      left.font.decreaseFontSize()
    },
    accelerator: 'CmdOrCtrl+-'
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Increase Font Size',
    fn: () => {
      left.font.increaseFontSize()
    },
    accelerator: 'CmdOrCtrl+='
  },
  {
    mode: 'default',
    cat: 'View',
    label: 'Reset Font Size',
    fn: () => {
      left.font.resetFontSize()
    },
    accelerator: 'CmdOrCtrl+0'
  },
  {
    mode: 'default',
    cat: 'Mode',
    label: 'Reader',
    fn: () => {
      left.reader.start()
    },
    accelerator: 'CmdOrCtrl+K'
  },
  {
    mode: 'default',
    cat: 'Mode',
    label: 'Insert',
    fn: () => {
      left.insert.start()
    },
    accelerator: 'CmdOrCtrl+I'
  },
  {
    mode: 'default',
    cat: 'Theme',
    label: 'Noir',
    fn: () => {
      left.theme.noir()
    },
    accelerator: 'CmdOrCtrl+Shift+1'
  },
  {
    mode: 'default',
    cat: 'Theme',
    label: 'Pale',
    fn: () => {
      left.theme.pale()
    },
    accelerator: 'CmdOrCtrl+Shift+2'
  },
  {
    mode: 'default',
    cat: 'Theme',
    label: 'Invert',
    fn: () => {
      left.theme.invert()
    },
    accelerator: 'CmdOrCtrl+Shift+I'
  },
  {
    mode: 'default',
    cat: 'Theme',
    label: 'Install',
    fn: () => {
      require('electron').shell.openExternal('https://github.com/hundredrabbits/Themes')
    }
  },
  {
    mode: 'reader',
    cat: '*',
    label: 'About',
    fn: () => {
      require('electron').shell.openExternal('https://github.com/hundredrabbits/Left')
    },
    accelerator: 'CmdOrCtrl+,'
  },
  {
    mode: 'reader',
    cat: '*',
    label: 'Fullscreen',
    fn: () => {
      app.toggleFullscreen()
    },
    accelerator: 'CmdOrCtrl+Enter'
  },
  {
    mode: 'reader',
    cat: '*',
    label: 'Hide',
    fn: () => {
      app.toggleVisible()
    },
    accelerator: 'CmdOrCtrl+H'
  },
  {
    mode: 'reader',
    cat: '*',
    label: 'Reset',
    fn: () => {
      left.theme.reset()
    },
    accelerator: 'CmdOrCtrl+Backspace'
  },
  {
    mode: 'reader',
    cat: '*',
    label: 'Quit',
    fn: () => {
      left.project.quit()
    },
    accelerator: 'CmdOrCtrl+Q'
  },
  {
    mode: 'reader',
    cat: 'Reader',
    label: 'Stop',
    fn: () => {
      left.reader.stop()
    },
    accelerator: 'Esc'
  },
  {
    mode: 'operator',
    cat: '*',
    label: 'About',
    fn: () => {
      require('electron').shell.openExternal('https://github.com/hundredrabbits/Left')
    },
    accelerator: 'CmdOrCtrl+,'
  },
  {
    mode: 'operator',
    cat: '*',
    label: 'Fullscreen',
    fn: () => {
      app.toggleFullscreen()
    },
    accelerator: 'CmdOrCtrl+Enter'
  },
  {
    mode: 'operator',
    cat: '*',
    label: 'Hide',
    fn: () => {
      app.toggleVisible()
    },
    accelerator: 'CmdOrCtrl+H'
  },
  {
    mode: 'operator',
    cat: '*',
    label: 'Reset',
    fn: () => {
      left.theme.reset()
    },
    accelerator: 'CmdOrCtrl+Backspace'
  },
  {
    mode: 'operator',
    cat: '*',
    label: 'Quit',
    fn: () => {
      left.project.quit()
    },
    accelerator: 'CmdOrCtrl+Q'
  },
  {
    mode: 'insert',
    cat: '*',
    label: 'About',
    fn: () => {
      require('electron').shell.openExternal('https://github.com/hundredrabbits/Left')
    },
    accelerator: 'CmdOrCtrl+,'
  },
  {
    mode: 'insert',
    cat: '*',
    label: 'Fullscreen',
    fn: () => {
      app.toggleFullscreen()
    },
    accelerator: 'CmdOrCtrl+Enter'
  },
  {
    mode: 'insert',
    cat: '*',
    label: 'Hide',
    fn: () => {
      app.toggleVisible()
    },
    accelerator: 'CmdOrCtrl+H'
  },
  {
    mode: 'insert',
    cat: '*',
    label: 'Reset',
    fn: () => {
      left.theme.reset()
    },
    accelerator: 'CmdOrCtrl+Backspace'
  },
  {
    mode: 'insert',
    cat: '*',
    label: 'Quit',
    fn: () => {
      left.project.quit()
    },
    accelerator: 'CmdOrCtrl+Q'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Date',
    fn: () => {
      left.insert.date()
    },
    accelerator: 'CmdOrCtrl+D'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Time',
    fn: () => {
      left.insert.time()
    },
    accelerator: 'CmdOrCtrl+T'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Path',
    fn: () => {
      left.insert.path()
    },
    accelerator: 'CmdOrCtrl+P'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Header',
    fn: () => {
      left.insert.header()
    },
    accelerator: 'CmdOrCtrl+H'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'SubHeader',
    fn: () => {
      left.insert.subheader()
    },
    accelerator: 'CmdOrCtrl+Shift+H'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Comment',
    fn: () => {
      left.insert.comment()
    },
    accelerator: 'CmdOrCtrl+/'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'Line',
    fn: () => {
      left.insert.line()
    },
    accelerator: 'CmdOrCtrl+L'
  },
  {
    mode: 'insert',
    cat: 'Insert',
    label: 'List',
    fn: () => {
      left.insert.list()
    },
    accelerator: 'CmdOrCtrl+-'
  },
  {
    mode: 'insert',
    cat: 'Mode',
    label: 'Stop',
    fn: () => {
      left.insert.stop()
    },
    accelerator: 'Esc'
  },
  {
    mode: 'operator',
    cat: 'Find',
    label: 'Find',
    fn: () => {
      left.operator.start('find: ')
    },
    accelerator: 'CmdOrCtrl+F'
  },
  {
    mode: 'operator',
    cat: 'Find',
    label: 'Find Next',
    fn: () => {
      left.operator.find_next()
    },
    accelerator: 'CmdOrCtrl+N'
  },
  {
    mode: 'operator',
    cat: 'Operator',
    label: 'Stop',
    fn: () => {
      left.operator.stop()
    },
    accelerator: 'Esc'
  }
]

const roles = [
  { mode: 'default', cat: '*', label: 'reload' },
  { mode: 'default', cat: '*', label: 'forcereload' },
  { mode: 'default', cat: '*', label: 'toggledevtools' },
  { mode: 'default', cat: 'Edit', label: 'undo' },
  { mode: 'default', cat: 'Edit', label: 'redo' },
  { mode: 'default', cat: 'Edit', label: 'cut' },
  { mode: 'default', cat: 'Edit', label: 'copy' },
  { mode: 'default', cat: 'Edit', label: 'paste' },
  { mode: 'default', cat: 'Edit', label: 'delete' },
  { mode: 'default', cat: 'Edit', label: 'selectall' },
  { mode: 'operator', cat: 'Edit', label: 'undo' },
  { mode: 'operator', cat: 'Edit', label: 'redo' },
  { mode: 'operator', cat: 'Edit', label: 'cut' },
  { mode: 'operator', cat: 'Edit', label: 'copy' },
  { mode: 'operator', cat: 'Edit', label: 'paste' },
  { mode: 'operator', cat: 'Edit', label: 'delete' },
  { mode: 'operator', cat: 'Edit', label: 'selectall' }
]

export { controls, roles }
