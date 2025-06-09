import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-create-edit',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './createEditTask.component.html',
})
export class CreateEditTaskComponent {
  form: FormGroup;
  loading = false;
  error: string | null = null;
  isEdit = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(255)]],
      dueDate: [null],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.taskId = +id;
        this.loading = true;
        this.form.disable();
        this.taskService.getById(this.taskId).subscribe({
          next: (task) => {
            this.form.patchValue({
              title: task.title,
              description: task.description,
              dueDate: task.dueDate
                ? new Date(task.dueDate).toISOString()
                : null,
            });
            this.loading = false;
            this.form.enable();
          },
          error: (err) => {
            this.error = err;
            this.loading = false;
          },
        });
      }
    });
  }

  submit() {
    this.error = null;
    if (this.form.invalid) return;
    this.loading = true;
    this.form.disable();
    const data = this.form.value;
    if (data.dueDate) {
      data.dueDate = new Date(data.dueDate).toISOString();
    }
    if (this.isEdit && this.taskId) {
      this.taskService.update(this.taskId, data).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
          this.form.enable();
        },
      });
    } else {
      this.taskService.create(data).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
          this.form.enable();
        },
      });
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
