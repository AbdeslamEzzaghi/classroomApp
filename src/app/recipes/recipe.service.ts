import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = [];
  /*private recipes: Recipe[] = [ 
    new Recipe(
      'beef tagine with prunes',
      "One of the most important dishes of Moroccan cuisine. The plate is also known as M'assal in Rabat.[1] It is a sweet and salty meat tajine, combining a ras el hanout blend of spices with honey, cinnamon and almonds.",
      'https://pbs.twimg.com/media/F7LjU7cXsAA5HGN?format=jpg&name=medium',
      [new Ingredient('prunes',10),new Ingredient('almondes',30)]
    ),
    new Recipe(
      'Pastilla',
      'Poultry pastilla was traditionally made of squab (fledgling pigeons), but shredded chicken is more often used today.',
      'https://pbs.twimg.com/media/F7LjV9xXgAA0vlc?format=jpg&name=medium',
      [new Ingredient('chicken',2),new Ingredient('almondes',30)]
    ),
    new Recipe(
      'Rfissa',
      'It is traditionally served with chicken and lentils and fenugreek seeds (tifiḍas in Amazigh, helba in Arabic), msemmen, meloui or day-old bread, and the spices blend ras el hanout',
      'https://pbs.twimg.com/media/F7LjXUlXIAA6Nl2?format=jpg&name=medium',
      [new Ingredient('chicken',1),new Ingredient('halba',30),new Ingredient('oignon',3)]
    ),
  ];*/

  constructor(private shoppingService : ShoppingListService){}

  getRecipeById(id : number) : Recipe {
    return this.recipes[id];
  }
  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }
  setRecipes(recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }
  addIngredientsToShopingList(ingredients : Ingredient[]){
      this.shoppingService.addIngredients(ingredients)
  }

  addRecipe(newRecipe : Recipe){ 
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index : number,newRecipe : Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index : number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
} 
