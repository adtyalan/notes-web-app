class InputInfo extends HTMLElement {
  static get observedAttributes() {
    return ['background-color', 'color']
  }
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._color = this.getAttribute('color') || 'black'
    this._bgColor =
      this.getAttribute('background-color') || 'rgb(232, 216, 196)'
    this._style = document.createElement('style')
  }

  connectedCallback() {
    this.render()
  }

  updateStyle() {
    this._style.textContent = `
      .notesInfoContainer {
        padding: 0px;
      }

      .notesInfo {
        padding: 1px 15px;
        background-color: ${this._bgColor};
        border-radius: 5px;
      }

      .notesInfo h2 {
        color: ${this._color};
      }
      
      @media (max-width: 576px) {
        .addNotesWithInfoContainer {
          margin: 10px 20px;
        }

        .notesInfo {
          margin: 0px 10px;
          padding: 1px 15px;
          background-color: rgb(86, 28, 36);
          border: 1px solid rgb(232, 216, 196);
        }

        .notesInfo h2 {
          color: white;
        }
        
        .white-text {
          color: white;
        }
      }
    `
  }

  render() {
    this.updateStyle()

    this.shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <aside class="notesInfoContainer">
          <div class="notesInfo">
            <h2 class="white-text">Informasi</h2>
            <p class="white-text">
              <strong>Catatan</strong> adalah fitur yang memungkinkan Anda untuk
              menuliskan hal-hal yang perlu diingat. Misalnya, jadwal kuliah,
              rencana belajar, atau hal-hal penting lainnya.
            </p>
            <p class="white-text">
              <strong>Arsip</strong> adalah fitur yang memungkinkan Anda untuk
              menyimpan catatan yang sudah tidak diperlukan lagi. Catatan yang
              diarsipkan tidak akan muncul di daftar catatan.
            </p>
          </div>
      </aside>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name.replace('-', '_')}`] = newValue
    this.render()
  }
}

customElements.define('input-info', InputInfo)
