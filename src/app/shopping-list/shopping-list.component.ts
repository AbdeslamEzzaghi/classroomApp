import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients: Ingredient[];
  igChangeSub: Subscription;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) {} 

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientsChanger.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy(): void { 
    this.igChangeSub.unsubscribe();
  }
  onEditItem(index : number){
    this.shoppingListService.startedEditing.next(index);
  }
}
