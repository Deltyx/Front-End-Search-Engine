import recipes from "../../data/recipes.js";
import Ingredient from "../models/Ingredient.js";
import Recipe from "../models/Recipe.js";


function getRecipesList() {

    const recipesList = [];
    recipes.forEach(recipe => {
        
        let ingredientList = [];
        let ustensilsList = [];
        recipe.ingredients.forEach(ingredient => {
            ingredientList.push(new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit));
        });

        recipe.ustensils.forEach(ustensil => {
            ustensilsList.push(ustensil);
        })

        recipesList.push(new Recipe(
            recipe.id, recipe.name, recipe.servings, ingredientList, recipe.time,
            recipe.description, recipe.appliance, ustensilsList));
    });
    return recipesList;
}

let test = getRecipesList();

const recipeSection = document.getElementById('recipe-section');
console.log(recipeSection)
recipeSection.innerHTML = '';
console.log(recipeSection)
let html5 = '';
test.forEach(item => {
    html5 += item.render();
})
recipeSection.innerHTML = html5;