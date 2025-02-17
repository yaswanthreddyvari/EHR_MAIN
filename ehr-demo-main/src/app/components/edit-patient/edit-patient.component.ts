import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss'],
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, DropdownModule]
  
})
export class EditPatientComponent implements OnInit {
  patientForm: FormGroup;
  patientId!: string;

  statusOptions = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_phone: ['', Validators.required],
      state: ['', Validators.required],
      status: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.fetchPatientDetails();
  }

  fetchPatientDetails(): void {
    this.patientService.getPatientById(this.patientId).subscribe(
      (data: any) => {
        this.patientForm.patchValue(data.data.patient);
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      this.patientService.updatePatient(this.patientId, this.patientForm.value).subscribe(
        (data: any) => {
          console.log('Patient updated successfully:', data);
          this.router.navigate(['/view-patients']);
        },
        (error) => {
          console.error('Error updating patient:', error);
        }
      );
    }
  }
}