import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskService, Task } from '../../../services/task.service';
import { CreateEditTaskComponent } from '../create/createEditTask.component';

@Component({
  selector: 'app-tasks-list',
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './listTasks.component.html',
})
export class ListTasksComponent {
  tasks: Task[] = [];
  loading = true;
  error: string | null = null;
  loadingToggleId: number | null = null;
  deletingId: number | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAll().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      },
    });
  }

  toggleIsDone(task: Task) {
    if (typeof task.id !== 'number' || this.loadingToggleId !== null) return;
    this.loadingToggleId = task.id;
    this.taskService.toggleIsDone(task.id as number).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === task.id);
        if (idx > -1) this.tasks[idx] = updated;
        this.loadingToggleId = null;
      },
      error: (err) => {
        this.error = err;
        this.loadingToggleId = null;
      },
    });
  }

  deleteTask(task: Task) {
    if (typeof task.id !== 'number' || this.deletingId !== null) return;
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.deletingId = task.id;
    this.taskService.delete(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
        this.deletingId = null;
      },
      error: (err) => {
        this.error = err;
        this.deletingId = null;
      },
    });
  }
}
