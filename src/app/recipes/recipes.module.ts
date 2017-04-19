import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipeService } from './recipe.service';

import { RecipeRoutingModule } from './recipes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipeRoutingModule
  ],
  declarations: [
    RecipeDetailsComponent,
    RecipeFormComponent,
    RecipeListComponent
  ],
  providers: [ RecipeService ]
})

export class RecipesModule {}