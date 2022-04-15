import items from "../../data/recipes.js";
import FilterBy from "../models/FilterBy.js";
import Recipes from "../models/Recipes.js";


let list = new Recipes();

list.hydrate(items);

list.display();

const filterByIngredient = new FilterBy(list, 'ingredient', 'primary', 'Ingrédients');
//const filterByAppliance = new FilterBy(list, 'appliance', 'secondary', 'Appareils');
//const filterByUstensil = new FilterBy(list, 'ustensil', 'tertiary', 'Ustensiles');

filterByIngredient.buildDropdown();
filterByIngredient.getAllIngredients();
filterByIngredient.display();
filterByIngredient.listen();




/*
filterByAppliance.buildDropdown();

filterByAppliance.display();

filterByUstensil.buildDropdown();

filterByUstensil.display();
*/