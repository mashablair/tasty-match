import { Component, OnInit } from "@angular/core";
import { Recipe } from "../../models/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "recipe-single",
  template: `
    <div>
      <recipe-form
        [recipe]="recipe"
        [isEdit]="isEdit"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (delete)="onDelete($event)"
      ></recipe-form>
    </div>
  `,
  styles: [],
})
export class RecipeSingleComponent implements OnInit {
  recipe!: Recipe;
  isEdit!: boolean;

  constructor(
    private route: ActivatedRoute, // returns Observable
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    console.log(id);

    this.recipeService
      .readOne(id)
      .subscribe((recipe: Recipe) => (this.recipe = recipe));

    this.isEdit = this.route.snapshot.data["isEdit"];
  }

  onCreate(recipe: Recipe) {
    this.recipeService
      .create(recipe)
      .subscribe((recipe) =>
        this.router.navigate(["admin", "recipes", recipe.id])
      );
  }

  onUpdate(recipe: Recipe) {
    this.recipeService.update(recipe).subscribe({
      // this is success
      next: () => this.router.navigate(["admin"]),
      // this is fail
      error: (err) => console.log("onUpdate error", err),
    });
  }

  onDelete(recipe: Recipe) {
    this.recipeService
      .delete(recipe)
      .subscribe(() => console.log("Deleted successfully!"));
  }
}
