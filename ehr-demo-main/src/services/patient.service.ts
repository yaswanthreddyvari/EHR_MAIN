import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:5000/api/patients'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Create a new patient
  createPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, patient);
  }

  getPatients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  updatePatient(id: string, patientData: any): Observable<any>{
    return this.http.put('${this.apiUrl}/${id}',patientData);
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get('${this.apiUrl}/${id}');
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}