import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipeService } from './recipe.service';

import { RecipeRoutingModule } from './recipes-routing.module';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { CalcServingsPipe } from './pipes/calc-servings.pipe';
import { FilterRecipesPipe } from './pipes/filter-recipes.pipe';
import { DifficultyStringPipe } from './pipes/difficulty-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipeRoutingModule
  ],
  declarations: [
    RecipeDetailsComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeEditComponent,
    CalcServingsPipe,
    FilterRecipesPipe,
    DifficultyStringPipe
  ],
  providers: [ RecipeService ]
})

export class RecipesModule {}