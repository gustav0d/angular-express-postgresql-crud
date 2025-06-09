import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Maybe } from '../../utils/types';

export interface Task {
  id: Maybe<number>;
  title: Maybe<string>;
  description: Maybe<string>;
  isDone: Maybe<boolean>;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http
      .get<{ tasks: Task[] }>(`${this.apiUrl}/tasks`)
      .pipe(map((res) => res.tasks));
  }

  getById(id: number): Observable<Task> {
    return this.http
      .get<{ task: Task }>(`${this.apiUrl}/tasks/${id}`)
      .pipe(map((res) => res.task));
  }

  create(task: Partial<Task>): Observable<Task> {
    return this.http
      .post<{ task: Task }>(`${this.apiUrl}/tasks`, task)
      .pipe(map((res) => res.task));
  }

  update(id: number, task: Partial<Task>): Observable<Task> {
    return this.http
      .put<{ task: Task }>(`${this.apiUrl}/${id}`, task)
      .pipe(map((res) => res.task));
  }

  toggleIsDone(id: number): Observable<Task> {
    return this.http
      .patch<{ task: Task }>(`${this.apiUrl}/tasks/${id}`, {})
      .pipe(map((res) => res.task));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
