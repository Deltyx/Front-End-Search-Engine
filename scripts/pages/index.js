import items from "../../data/recipes.js";
import FilterByIngredient from "../models/FilterByIngredient.js";
import FilterByAppliance from "../models/FilterByAppliance.js"
import Recipes from "../models/Recipes.js";


let list = new Recipes();

list.hydrate(items);

list.display();

const filterByIngredient = new FilterByIngredient(list);
const filterByAppliance = new FilterByAppliance(list);
//const filterByUstensil = new FilterBy(list, 'ustensil', 'tertiary', 'Ustensiles');

filterByIngredient.start();
filterByAppliance.start();