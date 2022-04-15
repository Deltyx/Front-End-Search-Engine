import Tags from "./Tags.js";

export default class FilterBy {
    constructor(list, ref, color, placeholder) {
        this.ref = ref;
        this.color = color;
        this.placeholder = placeholder;
        this.list = list;
        this.all = new Set();
        this.selection = new Set();
    }

    buildDropdown() {
        document.getElementById('filters_section').innerHTML = `
        <div class="search_tag_wrapper ${this.color}">
            <div class="search_tag_input_wrapper">
                <input id="filterBy_${this.ref}_search" class="search_tag_input" type="text" placeholder="${this.placeholder}">
                <button id="dropdown_filterBy_${this.ref}_btn" class="search_tag_btn">
                    <svg fill="#FFFFFF" width="25" height="25" version="1.1" id="lni_lni-chevron-down" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                        <g>
                            <path d="M32,46.8c-1.2,0-2.4-0.4-3.4-1.3L1.8,20.3c-0.7-0.7-0.7-1.8-0.1-2.5c0.7-0.7,1.8-0.7,2.5-0.1L31,42.9c0.5,0.5,1.4,0.5,2,0
                                l26.8-25.2c0.7-0.7,1.8-0.6,2.5,0.1c0.7,0.7,0.6,1.8-0.1,2.5L35.4,45.4C34.4,46.3,33.2,46.8,32,46.8z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <div id="dropdown_filterBy_${this.ref}_content" class="dropdown_filterBy_content"></div>
        </div>
        `
    }

    getAllIngredients() {
        this.all = new Set();
        this.list.all.forEach(recipe => {
            recipe.getIngredients().forEach(ingredient => {
                this.all.add(ingredient);
            });
        })
    }

    showSelection() {
        let html = '';
        this.selection.forEach(tag => {
            html += new Tags(this.color, tag).render();
        })
        document.getElementById('tag_selection').innerHTML = html;
        this.listenForUnselect();
    }

    showDropdownContent() {
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display = "grid";
        this.listenForSelect();
    }

    hideDropdownContent() {
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display = "none";
    }

    listenOnFocus() {
        document.getElementById(`filterBy_${this.ref}_search`).addEventListener('focus', () => {
            this.showDropdownContent();
        })
        document.getElementById(`filterBy_${this.ref}_search`).addEventListener('blur', () => {
            this.hideDropdownContent();
        })
    }

    listenOnKeyUp() {
        let input = document.getElementById(`filterBy_${this.ref}_search`);
        input.addEventListener('keyup', () => {
            let dropdownContent = document.getElementById(`dropdown_filterBy_${this.ref}_content`).getElementsByClassName('dropdown_item');
            for(let i=0; i < dropdownContent.length; i++) {
                if(dropdownContent[i].innerText.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
                    dropdownContent[i].style.display = "";
                } else {
                    dropdownContent[i].style.display = "none";
                }
            }
        })
    }

    listenOnClick() {
        document.getElementById(`dropdown_filterBy_${this.ref}_btn`).addEventListener('click', () => {
            if(document.getElementById(`dropdown_filterBy_${this.ref}_content`).style.display === "grid") {
                this.hideDropdownContent();
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
                console.log({Selection: this.selection});
                this.filter(this.list.filtered);
                console.log({Filtered: this.list.filtered});
            })
        })
    }

    listenForUnselect() {
        this.selection.forEach(tag => {
            document.querySelector(`.tag_btn[data-value="${tag}"]`).addEventListener('click', () => {
                this.selection.delete(tag);
                this.showSelection();
                console.log({Selection: this.selection});
                this.filter(this.list.all);
                console.log({All: this.list.all});
            })
        })
    }

    listen() {
        this.listenOnFocus();
        this.listenOnKeyUp();
        this.listenOnClick();
    }

    display() {
        let html = ''
        this.all.forEach(item => {
            html += `<div class="dropdown_item" data-value="${item}">${item}</div>`
        })
        document.getElementById(`dropdown_filterBy_${this.ref}_content`).innerHTML = html
    }

    filter(recipes) {
        this.list.filtered = recipes.filter(() => {
            this.selection.forEach(tag => {
                this.list.filtered.forEach(recipe => {
                    recipe.getIngredients().forEach(ingredient => {
                        console.log(tag === ingredient);
                        return tag === ingredient;
                    });
                })
            })
        })
    }
}