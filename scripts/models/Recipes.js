import Recipe from "./Recipe.js";

export default class Recipes {
    constructor() {
        this.all = [];
        this.filtered = [];
        this.filters = [];
        this.searchInput = '';
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
        if(this.filtered.length > 0) {
            this.filtered.forEach(recipe => {
                html += recipe.render();
            })
        } else {
            html = '<div class="recipe_no_result">Aucun résultat</div>'
        }
        document.getElementById('recipe-section').innerHTML = html;
    }

    filter(isUnselect = false) {
        const search = document.getElementById('search');
        let list = this.filtered;

        if(isUnselect || this.searchInput.length >= search.value.length) {
            list = this.all;
        }
        
        this.searchInput = search.value.toLowerCase();

        this.filters.forEach(filter => {
            list = filter.filter(list);
        })

        console.group('SpeedTest');
        console.time()

        list = this.searchAlt(list);

        console.groupEnd();
        console.timeEnd();

        this.filtered = list;

        this.filters.forEach(filter => {
            filter.collect();
            filter.display();
            filter.listenForSelect();
        })
        this.display();
    }

    listenForSearch() {
        const search = document.getElementById('search');
    
        search.addEventListener('input', () => {
            this.filter();
        })
    }

    search(list) {
        return list.filter(recipe => {
            return recipe.name.toLowerCase().includes(this.searchInput)
                || recipe.description.toLowerCase().includes(this.searchInput)
                || recipe.getIngredients().includes(this.searchInput)
        })
    }

    searchAlt(list) {
        let filtered = []
        for(let i=0; i < list.length; i++) {
            if(list[i].name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
            || list[i].description.toLowerCase().indexOf(search.value.toLowerCase()) > -1
            || list[i].getIngredients().includes(search.value.toLowerCase())) {
                filtered.push(list[i]);
            }
        }
        return filtered;
    }
}