import Recipe from "./Recipe.js";

export default class Recipes {
    constructor() {
        this.all = [];
        this.filtered = [];
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
}