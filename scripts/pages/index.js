import items from "../../data/recipes.js";
import FilterByIngredient from "../models/FilterByIngredient.js";
import FilterByAppliance from "../models/FilterByAppliance.js"
import FilterByUstensil from "../models/FilterByUstensil.js"
import Recipes from "../models/Recipes.js";


let list = new Recipes();

list.hydrate(items);

list.display();

list.addFilter(new FilterByIngredient(list))
list.addFilter(new FilterByAppliance(list))
list.addFilter(new FilterByUstensil(list))

list.listenForSearch();
