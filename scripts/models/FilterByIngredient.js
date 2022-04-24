import Filter from "./Filter.js";

export default class FilterByIngredient extends Filter {
    constructor(list) {
        super(list, 'ingredient', 'primary', 'Ingrédients');
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
        if(this.selection.size == 0) {
            this.list.filtered = this.list.all;
        } else {
            this.list.filtered = recipes.filter(recipe => {
                return tags.every(tag => recipe.getIngredients().includes(tag))
            })
        }
    }
}