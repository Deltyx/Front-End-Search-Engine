import Filter from "./Filter.js";

export default class FilterByUstensil extends Filter {
    constructor() {
        super('ustensil', 'tertiary', 'Ustensiles');
    }

    collect() {
        this.all = new Set();
        this.list.filtered.forEach(recipe => {
            recipe.getUstensils().forEach(item => {
                this.all.add(item);
            });
        })
    }

    filter(recipes) {
        let tags = [];
        this.selection.forEach(tag => tags.push(tag));

        return recipes.filter(recipe => {
            return tags.every(tag => recipe.getUstensils().includes(tag))
        })

    }
}