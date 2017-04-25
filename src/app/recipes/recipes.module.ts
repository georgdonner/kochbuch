import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { InlineHrefDirective } from 'ng-inline-href';

import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipeService } from './recipe.service';
import { CurrentQueryService } from './current-query.service';

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
  exports: [
    InlineHrefDirective
  ],
  declarations: [
    RecipeDetailsComponent,
    RecipeFormComponent,
    RecipeListComponent,
    RecipeEditComponent,
    CalcServingsPipe,
    FilterRecipesPipe,
    DifficultyStringPipe,
    InlineHrefDirective
  ],
  providers: [ 
    RecipeService,
    CurrentQueryService
  ]
})

export class RecipesModule {}