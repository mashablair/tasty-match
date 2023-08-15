import { Component, Input, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Recipe } from "../../models/recipe.model";

@Component({
  selector: "recipe-form",
  template: `
    <form class="recipe-form" #form="ngForm" *ngIf="recipe; else loading">
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          required
          minlength="5"
          [ngModel]="recipe.name"
          [ngModelOptions]="{ updateOn: 'blur' }"
          #name="ngModel"
        />
        <ng-container *ngIf="name.invalid && name.touched">
          <div class="recipe-form-error" *ngIf="name.errors?.minlength">
            Minimum length of a name is 5!
          </div>
          <div class="recipe-form-error" *ngIf="name.errors?.required">
            Name is required.
          </div>
        </ng-container>
      </label>

      <!-- <label>
        <span>Icon</span>
        <select
          name="icon"
          class="input input--select"
          required
          [ngModel]="recipe.img"
          #icon="ngModel"
        >
          <option *ngFor="let icon of icons" [ngValue]="img">
            {{ icon }}
          </option>
        </select>
        <ng-container *ngIf="icon.invalid && icon.touched">
          <div class="recipe-form-error" *ngIf="icon.errors?.required">
            Icon is required.
          </div>
        </ng-container>
      </label> -->

      <!-- <label>
        <span>Description</span>
        <textarea
          name="description"
          class="input input--textarea"
          required
          [ngModel]="recipe.description"
          #description="ngModel"
        ></textarea>
        <ng-container *ngIf="description.invalid && description.touched">
          <div class="recipe-form-error" *ngIf="description.errors?.required">
            Description is required.
          </div>
        </ng-container>
      </label> -->

      <button
        type="button"
        class="btn btn--green"
        *ngIf="!isEdit"
        (click)="handleCreate(form)"
      >
        Create
      </button>

      <button
        type="button"
        class="btn btn--green"
        [disabled]="form.untouched"
        *ngIf="isEdit"
        (click)="handleUpdate(form)"
      >
        Update
      </button>

      <button
        type="button"
        class="btn btn--green"
        *ngIf="isEdit"
        (click)="handleDelete()"
      >
        Delete
      </button>

      <button
        type="button"
        class="btn btn--grey"
        *ngIf="form.touched || isEdit"
        (click)="form.resetForm()"
      >
        Reset
      </button>

      <div class="recipe-form-working" *ngIf="form.valid && form.submitted">
        Working...
      </div>
    </form>

    <ng-template #loading>Loading...</ng-template>
  `,
  styles: [
    `
      .recipe-form {
        &-radios {
          display: flex;
          align-content: center;
          &-label {
            margin-right: 10px;
          }
          label {
            display: flex;
            align-items: center;
            span {
              color: #444;
              margin-bottom: 0;
            }
          }
        }
        &-working {
          font-size: 12px;
          font-style: italic;
          margin: 10px 0;
        }
        &-error {
          font-size: 12px;
          color: #e66262;
        }
      }
    `,
  ],
})
export class RecipeFormComponent {
  @Input() recipe!: Recipe;
  @Input() isEdit!: boolean;

  @Output() create = new EventEmitter<Recipe>();
  @Output() update = new EventEmitter<Recipe>();
  @Output() delete = new EventEmitter<Recipe>();

  icons: string[] = [
    "caramel-swirl",
    "glazed-fudge",
    "just-chocolate",
    "sour-supreme",
    "strawberry-glaze",
    "vanilla-sundae",
    "zesty-lemon",
  ];

  handleCreate(form: NgForm) {
    if (form.valid) {
      console.log(form.value);
      this.create.emit(form.value);
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleUpdate(form: NgForm) {
    if (form.valid) {
      this.update.emit({ id: this.recipe.id, ...form.value });
    } else {
      form.form.markAllAsTouched();
    }
  }

  handleDelete() {
    console.log("handling delete!");
    if (confirm(`Really delete ${this.recipe.name}? `))
      this.delete.emit({ ...this.recipe });
  }
}
