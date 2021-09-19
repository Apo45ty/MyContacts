import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class login {
  public username: string;
  constructor(private router: Router) { }

  public login(event, username) {
    if (!username)
      return;
    this.username = username;
    console.log(this.username);
    this.setCookie("username", this.username, 1);
    this.router.navigateByUrl('/mainpage');
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
