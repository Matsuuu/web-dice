export default class WebDice extends HTMLElement {
    static get attributes() {
        return {
            size: { default: 1 },
            die: { default: 6 },
        };
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.setDefaults();
        this.loadStylesAndContent().then(content => this.render(content));
    }

    async loadStylesAndContent() {
        let content = this._createSides();
        const styles = await import(`./styles/dice-d${this.die}.js`);
        content = styles.default + content;
        return content;
    }

    render(content) {
        this.shadowRoot.innerHTML = `
<style>
:host {
    --size: ${this.size};
    position: relative;
    width: calc(${this.size} * 3rem);
    height: calc(${this.size} * 3rem);
    display: block;
}
</style>
        ${content}`;
    }

    _createSides() {
        let sides = ``;
        for (let i = 1; i <= this.die; i++) {
            sides += `<div class="side">${i}</div>`;
        }
        return sides;
    }

    requestRender() {
        if (this._requestRenderCalled) return;

        this._requestRenderCalled = true;
        window.requestAnimationFrame(() => {
            this.render();
            this._requestRenderCalled = false;
        });
    }

    setDefaults() {
        const attributes = WebDice.attributes;
        Object.keys(attributes).forEach(attr => {
            if (!this[attr]) {
                this[attr] = attributes[attr].default;
            }
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        this[name] = newValue === '' ? true : newValue;
        this.requestRender();
    }

    static get observedAttributes() {
        const attributes = WebDice.attributes;
        return Object.keys(attributes).filter(attr => {
            return typeof attributes[attr].watch === 'undefined' || attributes[attr].watch;
        });
    }
}

if (!customElements.get('web-dice')) {
    customElements.define('web-dice', WebDice);
}
