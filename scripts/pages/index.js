import recipes from "../../data/recipes.js";
import Ingredient from "../models/Ingredient.js";
import Recipe from "../models/Recipe.js";


function getRecipesList() {

    const recipesList = [];
    recipes.forEach(recipe => {
        
        let ingredientsList = [];
        let ustensilsList = [];
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.push(new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit));
        });

        recipe.ustensils.forEach(ustensil => {
            ustensilsList.push(ustensil);
        })

        recipesList.push(new Recipe(
            recipe.id, recipe.name, recipe.servings, ingredientsList, recipe.time,
            recipe.description, recipe.appliance, ustensilsList));
    });
    return recipesList;
}

function getIngredientsList() {
    const ingredientsList = [];
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsList.push(new Ingredient(ingredient.ingredient, ingredient.quantity, ingredient.unit));
        })
    })
    /*
    ingredientList = ingredientList.filter((value, index, self) => {
        index === self.findIndex((t) => {
            t.ingredient === value.ingredient && t.quantity === value.quantity && t.unit === value.unit
        })
    })
    */
    return ingredientsList;
}

function getAppliancesList() {
    const appliancesList = [];
    recipes.forEach(recipe => {
        appliancesList.push(recipe.appliance);
    })
    return appliancesList;
}

function getUstensilsList() {
    const ustensilsList = [];
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsList.push(ustensil);
        })
    })
    return ustensilsList;
}

function removeDuplicates(data) {
    let unique = data.reduce(function (a, b) {
        if(a.indexOf(b) < 0) a.push(b);
        return a;
    }, []);
 
    return unique;
}

function displayRecipesList(list) {
    const recipeSection = document.getElementById('recipe-section');
    let htmlToDisplay = '';
    list.forEach(item => {
        htmlToDisplay += item.render();
    })
    recipeSection.innerHTML = htmlToDisplay; 
}

function init() {
    displayRecipesList(getRecipesList());
}

init();

let test1 = getIngredientsList();
let test2 = getUstensilsList();
let test3 = getAppliancesList()

console.log(removeDuplicates(test1));
console.log(removeDuplicates(test2));
console.log(removeDuplicates(test3));