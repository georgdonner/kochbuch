import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const recipeRoutes: Routes = [
  { path: 'recipes',  component: RecipeListComponent },
  { path: 'recipes/new', component: RecipeFormComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class RecipeRoutingModule { }