import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  token = "1f5as6";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(){
    localStorage.setItem('token', this.token);
    this.router.navigate(['/home'])
  }
}
