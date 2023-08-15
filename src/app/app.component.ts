import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-root",
  template: `
    <div class="app">
      <header class="header">
        <img src="/assets/img/logo.jpg" alt="Tasty Match app" class="logo" />
        <h1>Tasty Match</h1>
      </header>

      <p class="mb-3">
        Hi! This app will help you to find recipes that match the ingredients
        you already have on hand. Chances are you have a lot of great foods at
        home and don't need to buy anything else for a healthy, delicious meal.
      </p>

      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .app {
        background: #fff;
        border-radius: 8px;
        width: 94%;
        margin: 25px auto;
        padding: 25px;
        border: 4px solid #ef9fc7;
      }
      .header {
        display: flex;
        justify-content: center;
        margin-bottom: 25px;
      }
      .logo {
        width: 100px;
        height: 88px;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  message!: string;
  newMessage!: string;

  ngOnInit() {
    this.message = "Hello World";
  }
}
