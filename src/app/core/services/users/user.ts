import { Injectable } from '@angular/core';
import { userRole, User } from './model/user.model';
import { userMock } from './data/user.mock';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { LoginPayload } from './model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = userMock;
  private currentUser$ = new BehaviorSubject<User | null>(null);

  public readonly currentUserLoginOn$: Observable<boolean> = this.currentUser$.asObservable().pipe(
    map(user => user !== null)
  );

  public readonly isAdmin$: Observable<boolean> = this.currentUser$.asObservable().pipe(
    map(user => user?.role === userRole.ADMIN)
  );

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser$.next(JSON.parse(storedUser));
    }
  }

  login(payload: LoginPayload): Observable<User> {
    const user = this.users.find(u => u.email === payload.email && u.password === payload.password);
    if (user) {
      this.currentUser$.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of(user);
    }
    return throwError(() => new Error('Email o contraseña incorrectos.'));
  }

  createUser(payload: User): Observable<User> {
    const newUser = { ...payload, id: this.generateUniqueId() };
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(id: number, payload: Partial<User>): Observable<User> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...payload };
      return of(this.users[index]);
    }
    return throwError(() => new Error('Usuario no encontrado.'));
  }

  deleteUser(id: number): Observable<boolean> {
    const userExists = this.users.some(u => u.id === id);
    if (!userExists) return of(false);
    this.users = this.users.filter(u => u.id !== id);
    return of(true);
  }

  logout(): void {
    this.currentUser$.next(null);
    localStorage.removeItem('currentUser');
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  isLoggedIn(): boolean{
    return this.currentUser$.getValue() !== null;
  }

  private generateUniqueId(): number {
    return this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
  }
}
