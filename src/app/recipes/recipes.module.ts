import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'angular2-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { InlineHrefDirective } from 'ng-inline-href';

import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';
import { RecipePrintComponent } from './components/recipe-print/recipe-print.component';

import { RecipeService } from './services/recipe.service';
import { CurrentQueryService } from './services/current-query.service';

import { RecipeRoutingModule } from './recipes-routing.module';
import { CalcServingsPipe } from './pipes/calc-servings.pipe';
import { FilterRecipesPipe } from './pipes/filter-recipes.pipe';
import { DifficultyStringPipe } from './pipes/difficulty-string.pipe';
import { ConverterComponent } from './components/converter/converter.component';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RecipeRoutingModule,
    NgbModule,
    MarkdownModule,
    NguiAutoCompleteModule
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
    InlineHrefDirective,
    RecipePrintComponent,
    ConverterComponent,
    RoundPipe
  ],
  providers: [ 
    RecipeService,
    CurrentQueryService
  ]
})

export class RecipesModule {}