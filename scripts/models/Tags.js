export default class Tags {
    constructor(ref, color, name) {
        this.ref = ref;
        this.color = color;
        this.name = name;
    }

    render() {
        return `
        <button id="${this.ref}" class="tag_btn ${this.color}">
            <p>${this.name}</p>
            <svg fill="#FFFFFF" width="22" height="22" version="1.1" id="lni_lni-cross-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                <g>
                    <path d="M32,1.3C15,1.3,1.3,15,1.3,32C1.3,49,15,62.8,32,62.8C49,62.8,62.8,49,62.8,32C62.8,15,49,1.3,32,1.3z M32,59.3
                        C17,59.3,4.8,47,4.8,32C4.8,17,17,4.8,32,4.8C47,4.8,59.3,17,59.3,32C59.3,47,47,59.3,32,59.3z"/>
                    <path d="M41.2,22.8c-0.7-0.7-1.8-0.7-2.5,0L32,29.5l-6.7-6.7c-0.7-0.7-1.8-0.7-2.5,0c-0.7,0.7-0.7,1.8,0,2.5l6.7,6.7l-6.7,6.7
                        c-0.7,0.7-0.7,1.8,0,2.5c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5l6.7-6.7l6.7,6.7c0.3,0.3,0.8,0.5,1.2,0.5c0.4,0,0.9-0.2,1.2-0.5
                        c0.7-0.7,0.7-1.8,0-2.5L34.5,32l6.7-6.7C41.8,24.6,41.8,23.5,41.2,22.8z"/>
                </g>
            </svg>
        </button>
        `
    }
}