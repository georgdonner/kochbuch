import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';

import { RecipesService } from "./recipes/recipes.service";
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipes/recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
    RecipeListComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [RecipesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
