import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserForRegistrationDto } from 'src/app/_interfaces/user/userForRegistrationDto.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })


  ngOnInit(): void {

  }

  public registerUser = (registerFormValue) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: UserForRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      confirmPassword: formValues.confirm
    };

    this.authService.registerUser("api/accounts/registration", user)
    .subscribe({
      next: (_) => this.router.navigate(["/authentication/login"]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
