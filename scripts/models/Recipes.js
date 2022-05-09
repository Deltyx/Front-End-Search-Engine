import Recipe from "./Recipe.js";

export default class Recipes {
    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
    }

    addFilter(filter) {
        this.filters.push(filter);
        filter.start(this);
    }

    hydrate(items) {
        items.forEach(item => {
            let recipe = new Recipe(item)
            this.all.push(recipe);
        });
        this.filtered = this.all;
    }

    display() {
        let html = '';
        this.filtered.forEach(recipe => {
            html += recipe.render();
        })
        document.getElementById('recipe-section').innerHTML = html;
    }

    filter(isUnselect = false) {

        let list = this.filtered;

        if(isUnselect) {
            list = this.all;
        }
        
        this.filters.forEach(filter => {
            list = filter.filter(list);
            console.log('filter', filter.ref, list);
        })

        this.filtered = list;
        this.display();
        this.filters.forEach(filter => {
            filter.collect();
            filter.display();
            filter.listenForSelect();
        })
    }

    listenForSearch() {
        const search = document.getElementById('search');
    
        search.addEventListener('keyup', (e) => {
            if(search.value && search.value.trim().length >= 3) {
                if(e.key === "Backspace") {
                    this.search(this.all);
                } else {
                    this.search(this.filtered);
                }
            } else {
                this.filtered = this.all;
                this.display();
            }    
        })
    }

    search(list) {
        let filtered = []
        for(let i=0; i < list.length; i++) {
            if(list[i].name.toUpperCase().indexOf(search.value.toUpperCase()) > -1) {
                filtered.push(list[i]);
            }
        }
        this.filtered = filtered;
        this.display();
    }
}