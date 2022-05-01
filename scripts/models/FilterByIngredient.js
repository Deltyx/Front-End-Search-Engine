import Filter from "./Filter.js";

export default class FilterByIngredient extends Filter {
    constructor() {
        super('ingredient', 'primary', 'Ingrédients');
    }

    collect() {
        this.all = new Set();
        this.list.filtered.forEach(recipe => {
            recipe.getIngredients().forEach(item => {
                this.all.add(item);
            });
        })
    }

    filter(recipes) {
        let tags = [];
        this.selection.forEach(tag => tags.push(tag));

        return recipes.filter(recipe => {
            return tags.every(tag => recipe.getIngredients().includes(tag))
        })

    }
}