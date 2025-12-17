import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Inscription } from './model/inscriptionInterface';
import { MOCK_INSCRIPTIONS } from './data/inscription.mock';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private inscriptions$ = new BehaviorSubject<Inscription[]>([]);
  constructor() {
    this.inscriptions$.next(MOCK_INSCRIPTIONS);
  }
  getInscriptions(){
    return this.inscriptions$.asObservable();
  }
  createInscription(payload: Omit<Inscription, 'id' | 'inscriptionDate'>): Observable<Inscription> {
    const inscriptions = this.inscriptions$.getValue();
    const newId = inscriptions.length > 0 ? Math.max(...inscriptions.map(i => i.id)) + 1 : 1;
    const newInscription: Inscription = { ...payload, id: newId, inscriptionDate: new Date() };
    this.inscriptions$.next([...inscriptions, newInscription]);
    return of(newInscription);
  }
  deleteInscriptionByCourseAndStudentId(courseId: number, studentId: number): Observable<any> {
    const inscriptions = this.inscriptions$.getValue();
    const filteredInscriptions = inscriptions.filter(i => !(i.courseId === courseId && i.studentId === studentId));
    this.inscriptions$.next(filteredInscriptions);
    return of(null);
  }
}
