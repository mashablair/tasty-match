import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

import { catchError, delay, map, of, retry, tap, throwError } from "rxjs";

import { Recipe } from "../models/recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  read() {
    if (this.recipes.length) {
      return of(this.recipes);
    }

    // to add http headers and options
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    headers = headers.append("Api-Token", "1234abcd");

    const options = {
      headers,
    };

    return this.http.get<Recipe[]>(`/api/recipes`, options).pipe(
      tap((recipes) => {
        this.recipes = recipes;
      }),
      retry({ count: 2, delay: 5000 }),
      catchError(this.handleError)
    );
  }

  readOne(id: string | null) {
    return this.read().pipe(
      map((recipes: Recipe[]) => {
        const recipe = recipes.find((recipe: Recipe) => recipe.id === id);

        return recipe
          ? recipe
          : {
              name: "",
              ingredients: [],
              category: "",
            };
      })
    );
  }

  // so this does both things: 1) adds a recipe to db.json via post() and adds this recipe to our local State via .pipe & tap
  create(payload: Recipe) {
    return this.http.post<Recipe>(`/api/recipes`, payload).pipe(
      tap((recipe) => {
        this.recipes = [...this.recipes, recipe];
      }),
      catchError(this.handleError)
    );
  }

  update(payload: Recipe) {
    return this.http.put<Recipe>(`/api/recipes/${payload.id}`, payload).pipe(
      tap((recipe) => {
        this.recipes = this.recipes.map((item: Recipe) => {
          if (item.id === payload.id) {
            return recipe;
          }
          return item;
        });
      }),
      catchError(this.handleError)
    );
  }

  delete(payload: Recipe) {
    return this.http.delete<Recipe>(`/api/recipes/${payload.id}`).pipe(
      tap((recipe) => {
        this.recipes = this.recipes.filter(
          (recipe: Recipe) => recipe.id !== payload.id
        );
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    console.warn(err);
    if (err.error instanceof ErrorEvent) {
      // client-side error from Angular
      console.warn("Client", err.message);
    } else {
      // server-side error
      console.warn("Server", err.status);
    }
    return throwError(() => new Error(err.message));
  }
}
