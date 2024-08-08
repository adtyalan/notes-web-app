class LoadingBar extends HTMLElement {
  static get observedAttributes() {
    return ['display']
  }

  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._style = document.createElement('style')
    this._display = this.getAttribute('display') || 'none'
  }

  connectedCallback() {
    this.render()
  }

  updateStyle() {
    this._style.textContent = `
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

      :host {
        position: absolute;
        display: block;
        z-index: 1000;
      }

      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .loading-box {
        color: white;
        background-color: #6D2932;
        padding: 150px 50px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 50px;
      }

      .loading-bar {
        width: fit-content;
        font-weight: bold;
        font-family: monospace;
        font-size: 30px;
      }

      i {
        font-size: 50px;
      }
    `
  }

  render() {
    this.updateStyle()

    this._shadowRoot.innerHTML = `
          ${this._style.outerHTML}

          <div class="loading-overlay">
            <div class="loading-box">
              <div class="loading-bar">
                <slot>Memuat catatan</slot>
              </div>
              <i class="fas fa-spinner fa-spin"></i>
            </div>
          </div>
        `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name.replace('-', '_')}`] = newValue
    this.render()
  }
}

customElements.define('loading-bar', LoadingBar)
