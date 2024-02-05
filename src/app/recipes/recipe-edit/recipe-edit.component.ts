import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null; 
      this.initForm();
    });

  }

  private initForm() {
    let recipeName = '';
    let recipeImagePatch = "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg";
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePatch = (recipe.imagePath == "")?"https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg":recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePatch, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  getRecipeIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null,Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onSubmit() {
    /*const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );*/
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          name: new FormControl(this.recipeForm.value['name'],Validators.required),
          amount: new FormControl(+this.recipeForm.value['description'], [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ]),
        })
      );
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'],{relativeTo : this.route});

  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});
  }
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
