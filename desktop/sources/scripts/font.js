class Font {
  constructor () {
    // Currently, the custom_serif font is Zilla Slab and the custom_sans_serif font is Roboto Condensed. These can be changed by replacing the serif.ttf and sans_serif.ttf fonts in the media/fonts folder.
    this.root = document.documentElement
    this.fonts = ['custom_mono', 'custom_serif', 'custom_sans_serif']

    this.fontIndex = 0
    this.fontSize = 12
  }

  // Called when Left is initialized
  start () {
    // If localStorage has information about the font,
    // load the saved values and apply them
    if (localStorage.getItem('font')) {
      const { fontSize, fontIndex } = JSON.parse(localStorage.getItem('font'))
      this.fontSize = fontSize
      this.fontIndex = fontIndex
      this.updateVariables()
    }

    this.element = document.querySelector('textarea')
  }

  // Save the font-related values to localStorage
  save () {
    localStorage.setItem(
      'font',
      JSON.stringify({
        fontSize: this.fontSize,
        fontIndex: this.fontIndex
      })
    )
  }

  reset () {
    localStorage.removeItem('font')
    this.fontSize = 12
    this.fontIndex = 0
    this.fontFamily = this.fonts[this.fontIndex]
    this.updateVariables()
  }

  // Cycles to the previous font in the font list
  previousFont () {
    this.fontIndex--
    if (this.fontIndex < 0) this.fontIndex = this.fonts.length - 1
    this.updateVariables()
  }

  // Cycles to the next font in the font list
  nextFont () {
    this.fontIndex = (this.fontIndex + 1) % this.fonts.length
    this.updateVariables()
  }

  // Decrease font size by 1 px (also decreases line height)
  decreaseFontSize () {
    this.fontSize--
    this.updateVariables()
  }

  // Increase font size by 1 px (also increases line height)
  increaseFontSize () {
    this.fontSize++
    this.updateVariables()
  }

  // Reset font size to 12px
  resetFontSize () {
    this.fontSize = 12
    this.updateVariables()
  }

  // Update the CSS variables, save the values to localStorage
  updateVariables () {
    this.root.style.setProperty('--font-size', `${this.fontSize}px`)
    this.root.style.setProperty('--line-height', `${this.fontSize + 8}px`)
    this.root.style.setProperty('--font-family', this.fonts[this.fontIndex])
    this.save()
  }
}

export default Font
