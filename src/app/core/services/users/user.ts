import { Injectable } from '@angular/core';
import { userRole, User } from './model/user.model';
import { BehaviorSubject, map, Observable, of, throwError, tap } from 'rxjs';
import { LoginPayload } from './model/auth.model';
import { ApiService } from '../API/api';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser$ = new BehaviorSubject<User | null>(null);
  private readonly userEndpoint = 'users';

  public readonly currentUserLoginOn$: Observable<boolean> = this.currentUser$.asObservable().pipe(
    map(user => user !== null)
  );

  public readonly isAdmin$: Observable<boolean> = this.currentUser$.asObservable().pipe(
    map(user => user?.role === userRole.ADMIN)
  );

  constructor(private apiService: ApiService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser$.next(JSON.parse(storedUser));
    }
  }

  login(payload: LoginPayload): Observable<User> {
    return this.apiService.get<User[]>(this.userEndpoint).pipe(
      map(users => {
        const user = users.find(u => u.email === payload.email && u.password === payload.password);
        if (user) { // Lógica corregida: si el usuario se encuentra
          this.currentUser$.next(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        }
        throw new Error('Email o contraseña incorrectos.');
      })
    );
  }

  createUser(payload: User): Observable<User> {
    return this.apiService.post<User>(this.userEndpoint, payload);
  }

  updateUser(id: number, payload: Partial<User>): Observable<User> {
    return this.apiService.put<User>(`${this.userEndpoint}/${id}`, payload);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.apiService.delete<any>(`${this.userEndpoint}/${id}`).pipe(
      map(() => true));
  }

  logout(): void {
    this.currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.userEndpoint);
  }

  isLoggedIn(): boolean{
    return this.currentUser$.getValue() !== null;
  }
}
