import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private urlAPI =
    'https://angular-food-app-backend-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.urlAPI, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    //<[key:String]:Recipe>

    return this.http.get<Recipe[]>(this.urlAPI).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      })
    );

    /*return this.http.get<Recipe[]>(this.urlAPI)
    .pipe(
      map(
        recipes => {
          return recipes.map(
            recipe => {
              return {...recipe , ingredients : recipe.ingredients ? recipe.ingredients : []}
            }
          )
        }        
      ),tap(
        recipes => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes)
        }
      )
      )*/

    /*.pipe(
      map(
        data => {
          const recipes : Recipe[] = [];
          for(let key in data){
            if(data.hasOwnProperty(key)){
              recipes.push(...data[key])
            }
          }
          return recipes;
        }
      )
    )*/
  }
}
