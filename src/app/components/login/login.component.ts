import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {emailPattern, minLengthPassword} from "../../shared/constants/constants";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  show: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(minLengthPassword)]),
  });

  get username() {
    return this.loginForm.get('username')?.value?.trim();
  }

  get password() {
    return this.loginForm.get('password')?.value?.trim();
  }

  constructor(public authService: AuthService) {
  }

  async signIn(): Promise<void> {
    if (this.username && this.password) {
      const username = this.username as string;
      const password = this.password as string;

      await this.authService.signIn(username.trim(), password.trim());
    }
  }

  toggleVisibility(): void {
    this.show = !this.show;
  }

  setData(user: string): void {
    switch (user) {
      case 'admin':
        this.loginForm.patchValue({
          username: 'admin@mail.ru',
          password: 'admin',
        });
        break;
      case 'users':
        this.loginForm.patchValue({
          username: 'users@mail.ru',
          password: 'users',
        });
        break;
    }
  }
}
