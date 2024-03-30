import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../../Interfaces/auth-response';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  userNameErrorMessage: string = 'username is required';
  passwordErrorMessage: string = 'password is required';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get usernameControl(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as LoginCredentials;
      this.authService
        .login(credentials.username, credentials.password)
        .subscribe({
          next: (user) => {
            this.router.navigate(['/']); // Redirect to main page on successful login
          },
          error: (error) => {},
        });
    } else {
      // Handle form validation errors (optional)
    }
  }
}
