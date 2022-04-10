import Recipe from "./Recipe.js";

export default class Recipes {
    constructor() {
        this.all = [];
    }

    hydrate(items) {
        items.forEach(item => {
            let recipe = new Recipe(item)
            this.all.push(recipe);
        });
    }

    display() {
        let html = '';
        this.all.forEach(recipe => {
            html += recipe.render();
        })
        document.getElementById('recipe-section').innerHTML = html;
    }
}