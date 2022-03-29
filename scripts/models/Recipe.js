export default class Recipe {
    constructor(id, name, servings, ingredients, time, desc, appliance, ustensils) {
        this.id = id;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.desc = desc;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }

    render() {
        let ingredientsList = ''
        this.ingredients.forEach(item => {
            ingredientsList += item.render();
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
                    <p>${this.limitDesc(this.desc,200)}</p>
                </div>
            </div>
        </article>
        `
    }

    limitDesc(desc, limit) {
        var dots = "...";
        if(desc.length > limit)
        {
          desc = desc.substring(0,limit) + dots;
        }
        return desc;
    }
}