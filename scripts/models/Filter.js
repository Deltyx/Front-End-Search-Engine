import Tags from "./Tags.js";

export default class Filter {
    constructor(ref, color, placeholder) {
        this.ref = ref;
        this.color = color;
        this.placeholder = placeholder;
        this.list = null;
        this.all = new Set();
        this.selection = new Set();
    }

    async buildDropdown() {
        document.getElementById('filters_section').innerHTML += `
        <div id="filterBy_${this.ref}" class="search_tag_wrapper">
            <div class="search_tag_input_wrapper ${this.color}">
                <input id="filterBy_${this.ref}_search" class="search_tag_input" type="text" placeholder="${this.placeholder}">
                <button id="dropdown_filterBy_${this.ref}_btn" class="search_tag_btn">
                    <svg fill="#FFFFFF" width="25" height="25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                        <g>
                            <path d="M32,46.8c-1.2,0-2.4-0.4-3.4-1.3L1.8,20.3c-0.7-0.7-0.7-1.8-0.1-2.5c0.7-0.7,1.8-0.7,2.5-0.1L31,42.9c0.5,0.5,1.4,0.5,2,0
                                l26.8-25.2c0.7-0.7,1.8-0.6,2.5,0.1c0.7,0.7,0.6,1.8-0.1,2.5L35.4,45.4C34.4,46.3,33.2,46.8,32,46.8z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div id="dropdown_filterBy_${this.ref}_content" class="dropdown_filterBy_content ${this.color}"></div>
            <div id="dropdown_filterBy_${this.ref}_no_result" class="dropdown_filterBy_no_result ${this.color}">Aucun résultat</div>
        </div>
        `
    }

    async buildSelection() {
        document.getElementById('tag_selection').innerHTML += `<div id="selection-${this.ref}" class="tag_selection"></div>`;
    }

    dropdownContentFilter() {
        let count = 0;
        document.getElementById(`dropdown_filterBy_${this.ref}_no_result`).style.display = "none"
        let dropdownContent = document.getElementById(`dropdown_filterBy_${this.ref}_content`).getElementsByClassName('dropdown_item');
        for(let i=0; i < dropdownContent.length; i++) {
            if(dropdownContent[i].innerText.toUpperCase().indexOf(document.getElementById(`filterBy_${this.ref}_search`).value.toUpperCase()) > -1
            || this.selection.has(dropdownContent[i].innerText)) {
                dropdownContent[i].style.display = "";
                count++;
            } else {
                dropdownContent[i].style.display = "none";
            }
        }

        if(count === 0) {
            this.showDropdownNoResult();
            this.hideDropdownContent();
        }
    }

    showSelection() {
        let html = '';
        this.selection.forEach(tag => {
            html += new Tags(this.color, tag).render();
        })
        document.getElementById(`selection-${this.ref}`).innerHTML = html;
        this.listenForUnselect();
    }

    showDropdownContent() {
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display = "grid";
        this.listenForSelect();
    }

    showDropdownNoResult() {
        document.getElementById(`dropdown_filterBy_${this.ref}_no_result`).style.display = "block";
    }

    hideDropdownContent() {
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display = "none";
    }

    hideDropdownNoResult() {
        document.getElementById(`dropdown_filterBy_${this.ref}_no_result`).style.display = "none";
    }

    listenOnFocus() {
        document.getElementById(`filterBy_${this.ref}_search`).addEventListener('focus', () => {
            this.showDropdownContent();
        })
    }

    listenOutsideClick() {
        document.addEventListener('click', (e) => {
            if(!e.target.closest('.search_tag_wrapper')) {
                this.hideDropdownContent();
                document.getElementById(`filterBy_${this.ref}_search`).value = "";
                this.dropdownContentFilter(); 
            }
        })
    }

    listenOnKeyUp() {
        document.getElementById(`filterBy_${this.ref}_search`).addEventListener('keyup', () => {
            this.dropdownContentFilter();  
        })
    }

    listenOnClick() {
        document.getElementById(`dropdown_filterBy_${this.ref}_btn`).addEventListener('click', () => {
            if(document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display === "grid"
                || document.getElementById(`dropdown_filterBy_${this.ref}_no_result`).style.display === "block") {
                this.hideDropdownContent();
                this.hideDropdownNoResult();
                document.getElementById(`filterBy_${this.ref}_search`).value = "";
                this.dropdownContentFilter();
            } else {
                this.showDropdownContent();
            } 
        })
    }

    listenForSelect() {
        this.all.forEach(tag => {
            document.querySelector(`.dropdown_item[data-value="${tag}"]`).addEventListener('click', () => {
                this.selection.add(tag);
                this.showSelection();
                this.list.filter();                
            })
        })
    }

    listenForUnselect() {
        this.selection.forEach(tag => {
            document.querySelector(`.tag_btn[data-value="${tag}"]`).addEventListener('click', () => {
                this.selection.delete(tag);
                this.showSelection();
                this.list.filter(true);
            })
        })
    }

    listen() {
        this.listenOnFocus();
        this.listenOutsideClick();
        this.listenOnKeyUp();
        this.listenOnClick();
    }

    display() {
        let html = ''
        this.all.forEach(item => {
            let classes = (this.selection.has(item)) ? 'dropdown_item-selected' : ''
            html += `<div class="dropdown_item ${classes}" data-value="${item}">${item}</div>`
        })
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).innerHTML = html
    }

    async start(list) {
        this.list = list;
        await this.buildSelection();
        await this.buildDropdown();
        this.collect();
        this.display();
        this.listen();
    }
}