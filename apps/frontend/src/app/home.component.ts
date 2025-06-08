import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<h1 class="text-4xl font-bold text-center text-blue-600 my-8">
      Welcome to the Task Management App!
    </h1>
    <p class="text-center text-gray-700">
      This is the home page. You can navigate to the login page to access your
      tasks, or register a new account.
    </p>`,
})
export class HomeComponent {}
