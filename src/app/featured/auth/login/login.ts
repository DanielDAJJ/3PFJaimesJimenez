import { Component } from '@angular/core';
import { UserService } from '../../../core/services/users/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm : FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  login(){
    if(!this.loginForm.valid){
      alert('Formulario no válido');
      return;
    }
    this.userService.login(this.loginForm.value).subscribe(users => {
      if(users.length === 0 || !users){
        alert('Credenciales incorrectas');
      } else {
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
