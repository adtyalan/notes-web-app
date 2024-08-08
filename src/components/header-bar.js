class HeaderBar extends HTMLElement {
  static get observedAttributes() {
    return ['background-color', 'color']
  }

  constructor() {
    super()

    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._color = this.getAttribute('color') || 'white'
    this._bgColor = this.getAttribute('background-color') || 'rgb(109, 41, 50)'
    this._style = document.createElement('style')
  }

  connectedCallback() {
    this.render()
    this.addSmoothScroll()
  }

  updateStyle() {
    this._style.textContent = `
    @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');

    :host {
      width: 100%;
      box-sizing: border-box;
      --color: ${this._color};
      --bg-color: ${this._bgColor};
      
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
    }

    .head_bar {
      background-color: var(--bg-color);
      color: var(--color);

      box-sizing: border-box;
      padding: 0 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h2 {
    padding: 0 1em;
    }

    nav {
      display: flex;
      align-items: center;
    }

    nav ul {
      display: flex;
      list-style-type: none;
      gap: 1em;
    }

    nav > ul > li {
      border-radius: 5px;
      width: 90px;
    }

    nav > ul > li:hover {
    font-weight: bold;
    }

    nav > ul > li > a {
      font-size: 1em;
      color: var(--color);
      text-decoration: none;
    }

    @media (max-width: 420px) {
        .head_bar {
          display: grid;
        }

        h2 {
          padding: 0;
        }

        nav ul {
          display: flex;
          list-style-type: none;
          gap: 6em;
        }
      }
    `
  }

  render() {
    this.updateStyle()

    this.shadowRoot.innerHTML = `
    ${this._style.outerHTML}
    <header class="head_bar">
      <h2 class="head_bar_title"><i class="fas fa-sticky-note"></i><slot> Primpen</slot></h2>
      <nav>
        <ul>
          <li>
              <a href="#daftarCatatan"
                ><i class="fas fa-clipboard"></i> Catatan</a
              >
          </li>
          <li>
              <a href="#catatanArsip"><i class="fas fa-archive"></i> Arsip</a>
          </li>
        </ul>
      </nav>
    </header>
    `
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name.replace('-', '_')}`] = newValue
    this.render()
    this.addSmoothScroll()
  }

  // animasi scroll halus header
  addSmoothScroll() {
    const links = this.shadowRoot.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        const targetId = link.getAttribute('href').substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          this.smoothScrollTo(targetElement)
        }
      })
    })
  }

  smoothScrollTo(targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    })
  }
}

customElements.define('header-bar', HeaderBar)
