import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanger = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients : Ingredient[] = []; 
  getIngredient(index : number){
    return this.ingredients[index];
  }
  getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }
  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanger.next(this.ingredients.slice());
  }
  updateIngredient(index : number, newIngredient:Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanger.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanger.next(this.ingredients.slice());
  }
  deleteIngredient(index : number){
    this.ingredients.splice(index,1);
    this.ingredientsChanger.next(this.ingredients.slice());
  }
}
 