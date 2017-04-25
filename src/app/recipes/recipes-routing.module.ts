import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';

const recipeRoutes: Routes = [
  { path: 'recipes',  component: RecipeListComponent },
  { path: 'recipes/new', component: RecipeFormComponent },
  { path: 'recipe/:id', component: RecipeDetailsComponent },
  { path: 'recipe/:id/edit', component: RecipeEditComponent}
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