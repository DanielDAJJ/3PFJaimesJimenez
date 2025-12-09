import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly APIUrl= "https://6932f5d1e5a9e342d271726b.mockapi.io/api/v1/";

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred.';

    if(error.error instanceof ErrorEvent){
      errorMessage = `Error: ${error.error.message}`;
    }
    else if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection.';
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(()=> new Error(errorMessage));
  }
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.APIUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.APIUrl}/${endpoint}`, data).pipe(catchError(this.handleError));
  }
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.APIUrl}/${endpoint}`, data).pipe(catchError(this.handleError));
  }
  delete<T>(endpoint: string): Observable<T>{
    return this.http.delete<T>(`${this.APIUrl}/${endpoint}`).pipe(catchError(this.handleError));
  }
}


