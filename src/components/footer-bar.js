class FooterBar extends HTMLElement {
  static get observedAttributes() {
    return ['background-color', 'text-align']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._color = this.getAttribute('background-color') || 'rgb(109, 41, 50)'
    this._align = this.getAttribute('text-align') || 'center'
    this._style = document.createElement('style')
  }

  connectedCallback() {
    this.render()
  }

  updateStyle() {
    this._style.textContent = `
      footer {
        padding: 16px;
        background-color: ${this._color};
        color: white;
        text-align: ${this._align};
      }
    `
  }

  render() {
    this.updateStyle()

    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}

      <footer>
        <slot>
          Primpen 2024, Created by Alan Aditya
        </slot>
      </footer>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name.replace('-', '_')}`] = newValue
    this.render()
  }
}

customElements.define('footer-bar', FooterBar)
