import { Component, Input, ViewEncapsulation } from "@angular/core";
import { Recipe } from "../../models/recipe.model";

@Component({
  selector: "recipe-card",
  template: ` <a class="recipe-card" [routerLink]="recipe.id">
    <img
      src="/assets/img/{{ recipe.img }}"
      [alt]="recipe.name"
      class="recipe-card-icon"
    />
    <div>
      <p class="recipe-card-name">
        {{ recipe.name }}
      </p>
    </div>
  </a>`,
  styles: [
    `
      .recipe-card {
        display: flex;
        align-items: center;
        background: #f7f7f7;
        border-radius: 5px;
        margin-bottom: 5px;
        padding: 5px 15px;
        transition: transform 0.2s ease-in-out;
        &:hover {
          transform: translateY(-3px);
        }
        &-name {
          font-size: 16px;
        }
        &-label {
          border: 1px solid #c14583;
          border-radius: 4px;
          padding: 0 4px;
          margin-left: 5px;
          font-size: 12px;
          color: #c14583;
        }
        &-price {
          font-size: 14px;
          color: #c14583;
        }
        &-icon {
          width: 50px;
          margin-right: 10px;
        }
        &-promo {
          border: 1px dotted #c14583;
        }
      }
    `,
  ],
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}
