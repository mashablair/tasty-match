import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";

@Component({
  selector: "recipe-list",
  template: `
    <div>
      <div class="recipe-list-actions">
        <a routerLink="new" class="btn btn--green"
          >New Recipe
          <img src="/assets/img/icon/plus.svg" alt="add new recipe" />
        </a>
      </div>

      <ng-container *ngIf="recipes?.length; else nothing">
        <recipe-card
          *ngFor="let recipe of recipes; trackBy: trackById"
          [recipe]="recipe"
        ></recipe-card>
      </ng-container>

      <ng-template #nothing>
        <p>No Recipes here...</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .recipe-list {
        &-actions {
          margin-bottom: 10px;
        }
      }
    `,
  ],
})
export class RecipeListComponent implements OnInit {
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService
      .read()
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }

  trackById(index: number, value: Recipe) {
    return value.id;
  }
}
