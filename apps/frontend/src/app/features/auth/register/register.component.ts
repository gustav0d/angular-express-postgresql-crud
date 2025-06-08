import { Component } from '@angular/core';
import { RouterLink, RouterModule, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch },
    );
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { notMatching: true };
  }

  submit() {
    this.error = this.success = null;
    if (this.form.invalid) return;
    this.loading = true;
    const { name, email, password } = this.form.value;
    this.auth.register({ name, email, password }).subscribe({
      next: (res) => {
        this.success = res.message;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1200);
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }
}
