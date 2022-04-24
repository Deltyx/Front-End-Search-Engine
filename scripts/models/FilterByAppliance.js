import Filter from "./Filter.js";

export default class FilterByAppliance extends Filter {
    constructor(list) {
        super(list, 'appliance', 'secondary', 'Appareils');
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
        if(this.selection.size == 0) {
            this.list.filtered = this.list.all;
        } else {
            this.list.filtered = recipes.filter(recipe => {
                return tags.every(tag => recipe.getAppliance().includes(tag))
            })
        }
    }
}