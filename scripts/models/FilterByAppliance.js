import Filter from "./Filter.js";

export default class FilterByAppliance extends Filter {
    constructor() {
        super('appliance', 'secondary', 'Appareils');
    }

    collect() {
        this.all = new Set();
        this.list.filtered.forEach(recipe => {
            this.all.add(recipe.getAppliance());
        })
    }

    filter(recipes) {
        let tags = [];
        this.selection.forEach(tag => tags.push(tag));

        return recipes.filter(recipe => {
            return tags.every(tag => recipe.getAppliance().includes(tag))
        })

    }
}