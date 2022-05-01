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

    filter() {
        let list = this.filtered;
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
}