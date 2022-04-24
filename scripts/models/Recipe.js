export default class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings;
        this.ingredients = data.ingredients;
        this.time = data.time;
        this.description = data.description;
        this.appliance = data.appliance;
        this.ustensils = data.ustensils;
    }

    getAppliance() {
        return this.appliance;
    }

    getIngredients() {
        return this.ingredients.map(item => item.ingredient );
    }

    render() {
        let ingredientsList = ''
        this.ingredients.forEach(item => {
            if(item.unit) {
                ingredientsList += `<strong>${item.ingredient}: </strong>${item.quantity} ${item.unit}<br>`
            } else if(item.quantity) {
                ingredientsList += `<strong>${item.ingredient}: </strong>${item.quantity}<br>`
            } else {
                ingredientsList += `<strong>${item.ingredient}</strong><br>`
            }
        });
        return `
            <article class="recipe_card">
                <div class="recipe_card_img"></div>
                <div class="recipe_card_info">
                    <div class="recipe_card_title">
                        <p>${this.name}</p>
                        <strong>${this.time} min</strong>
                    </div>
                    <div class="recipe_card_ingredients">
                        <p>
                            ${ingredientsList}
                        </p>
                    </div>
                    <div class="recipe_card_desc">
                        <p>${this.limitStr(this.description,200)}</p>
                    </div>
                </div>
            </article>
            `
    }

    limitStr(str, limit = 100) {
        var dots = "...";
        if(str.length > limit)
        {
            str = str.substring(0,limit) + dots;
        }
        return str;
    }
}