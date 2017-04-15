import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';

import { RecipesService } from "./recipes/recipes.service";

const ROUTES = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent
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
