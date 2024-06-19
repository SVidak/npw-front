import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.get<boolean>('http://localhost:8080/user/logIn', { params: { email: loginData.email, password: loginData.password } })
        .subscribe(response => {
          if (response) {
            console.log('Login successful');
            this.router.navigate(['/home']);
          } else {
            console.log('Login failed');
            alert('Login failed');
          }
        }, error => {
          console.error('Error logging in', error);
          alert('An error occurred');
        });
    } 
  }
}