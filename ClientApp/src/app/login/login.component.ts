import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class login {
  constructor(private router: Router) { }

  public login(event) {
    this.router.navigateByUrl('/mainpage');
  }
}
