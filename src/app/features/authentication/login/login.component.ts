import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AuthResponseDto } from 'src/app/_interfaces/response/authResponseDto.model';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private returnUrl: string = '';
  
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  loginUser = (loginFormValue : FormGroup) => {
    this.showError = false;
    const login = {... loginFormValue };

    const userForAuth: UserForAuthenticationDto = {
      email: login.username,
      password: login.password
    }

    this.authService.loginUser('api/accounts/login', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
       localStorage.setItem("token", res.token);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      this.errorMessage = err.message;
      this.showError = true;
    }})
  }

}
