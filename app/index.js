const app = document.getElementById('app');

const isEmail = email => /\S+@\S+\.\S+/.test(email);

class EmailInput extends HTMLElement {
  static get is() {
    return 'email-input';
  }

  static get observedAttributes() {
    return ['name', 'placeholder'];
  }

  constructor() {
    super();
    this.innerHTML = this.template;
  }

  connectedCallback() {
    const input = this.innerElement;
    const { outline } = input.style;

    input.addEventListener('input', e => {
      const { value } = e.target;

      if (value.length) {
        const color = isEmail(value) ? 'green' : 'red';
        input.style.outline = `solid 2px ${color}`;
      } else {
        input.style.outline = outline;
      }
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.innerElement[name] = newValue;
  }

  get template() {
    return `
      <input
        name="${this.name}"
        placeholder="${this.placeholder}" />
    `;
  }

  get innerElement() {
    return document.querySelector('email-input input');
  }

  get name() {
    return this.getAttribute('name');
  }

  set name(value) {
    if (value) {
      this.setAttribute('name', value);
    } else {
      this.removeAttribute('name');
    }
  }

  get placeholder() {
    return this.getAttribute('placeholder');
  }

  set placeholder(value) {
    if (value) {
      this.setAttribute('placeholder', value);
    } else {
      this.removeAttribute('placeholder');
    }
  }
}

customElements.define('email-input', EmailInput);

customElements.whenDefined('email-input').then(() => {
  app.innerHTML =
    '<email-input name="email" placeholder="Email"></email-input>';
});
