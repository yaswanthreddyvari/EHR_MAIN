import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { DrawerModule } from 'primeng/drawer';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { PatientService } from '../../../services/patient.service';
@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
  imports: [InputSwitchModule,DropdownModule,RouterModule,ButtonModule, SelectButtonModule, RadioButtonModule, ListboxModule, NgIf,NgFor, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule,IconFieldModule, InputIconModule, DrawerModule,ReactiveFormsModule],
  standalone: true,
  providers: [MessageService],
})
export class PatientFormComponent implements OnInit {
  
 
  patient: any = {
    first_name: '',
    last_name: '',
    email: '',
    mobile_phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zipcode: '',
    country: 'US',
    notes: '',
    dob: '',
    gender: '',
    allowShare: false,
    status: true,
  };
submitted: any;
f: any;
  patientId!: string;
  isEditMode = false;
  onStatusChange(event: any) {console.log('Status changed:', this.patient.status ? 'Active' : 'Inactive');}

  cities = [
    { name: 'New York' },
    { name: 'Los Angeles' },
    { name: 'Chicago' },
  ];

  states = [
    { name: 'California' },
    { name: 'Texas' },
    { name: 'Florida' },
  ];

  countries = [
    { name: 'United States' },
    { name: 'Canada' },
    { name: 'United Kingdom' },
  ];

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.patientId = params.get('id')!; // Get the patient ID from the route
      if (this.patientId) {
        this.isEditMode = true; // Set the form to edit mode
        this.loadPatientDetails(this.patientId); // Load the patient's details
      }
    });
  }
  loadPatientDetails(patientId: string): void {
    this.patientService.getPatientById(patientId).subscribe(
  (response : any)=>{
    if(response && response.data){
      this.patient = {
        ...response.data, // Spread the patient data
        city: { name: response.data.city }, // Convert city string to object
        state: { name: response.data.state }, // Convert state string to object
        country: { name: response.data.country }, // Convert country string to object
        dob: new Date(response.data.dob), // Convert string to Date object
        status: Boolean(response.data.status),
      };
    }else{
      console.error("Patient not Found");
    }
  },
  (error: any)=>{
         console.error("Error fetching patient data :",error);
  }
  );
  }

  onSubmit(): void {
    const payload = {
      ...this.patient,
      city: this.patient.city.name,
      state: this.patient.state.name,
      country: this.patient.country.name,
      status: this.patient.status,
    };
  
    if (this.isEditMode && this.patientId) {
      // Update existing patient
      this.patientService.updatePatient(this.patientId, payload).subscribe({
        next: (response) => {
          console.log('Patient updated successfully', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Patient updated successfully!',
          });
          this.router.navigate(['/dashboard/viewPatients']); // Navigate back to the patient list
        },
        error: (error) => {
          console.error('Error updating patient', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update patient. Please try again.',
          });
        },
      });
    } else {
      // Create new patient
      this.patientService.createPatient(payload).subscribe({
        next: (response) => {
          console.log('Patient created successfully', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Patient created successfully!',
          });
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating patient', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create patient. Please try again.',
          });
        },
      });
    }
  }
  
  resetForm(): void {
    this.patient = {
      first_name: '',
      last_name: '',
      email: '',
      mobile_phone: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'US',
      notes: '',
      dob: '',
      gender: '',
      allowShare: false,
      status: true,
    };
  }
}