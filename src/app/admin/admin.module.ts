import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

// containers
import { RecipeListComponent } from "./containers/recipe-list/recipe-list.component";
import { RecipeSingleComponent } from "./containers/recipe-single/recipe-single.component";

// components
import { RecipeCardComponent } from "./components/recipe-card/recipe-card.component";
import { RecipeFormComponent } from "./components/recipe-form/recipe-form.component";

// services

// guards

// directives

export const routes: Routes = [
  {
    path: "recipes",
    component: RecipeCardComponent,
  },
  {
    path: "recipes/new",
    component: RecipeSingleComponent,
    data: { isEdit: false },
  },
  {
    path: "recipes/:id",
    component: RecipeSingleComponent,
    data: { isEdit: true },
  },
  { path: "", pathMatch: "full", redirectTo: "recipes" },
];

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeSingleComponent,
    RecipeCardComponent,
    RecipeFormComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
