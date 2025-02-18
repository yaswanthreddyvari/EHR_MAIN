import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Table, TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { NgClass, NgFor } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DrawerModule } from 'primeng/drawer';
import { DropdownModule } from 'primeng/dropdown';
import { PatientService } from '../../../services/patient.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-patients',
  imports: [FormsModule, DropdownModule,ButtonModule, SelectButtonModule, RadioButtonModule, ListboxModule, FloatLabelModule, DatePickerModule, CheckboxModule, AvatarModule, CardModule, TableModule, AvatarGroupModule, MenuModule, ToastModule, InputTextModule, MultiSelectModule, FormsModule, SelectModule, TagModule,IconFieldModule, InputIconModule, DrawerModule, ReactiveFormsModule],
  templateUrl: './view-patients.component.html',
  standalone: true,
  styleUrl: './view-patients.component.scss'
})
// export class ViewPatientsComponent {

//   patients: any[] = [
//     {
//       first_name: 'John',
//       last_name: 'Doe',
//       email: 'john.doe@example.com',
//       mobile_phone: '1234567890',
//       state: 'California',
//       status: true,
//     },
//     {
//       first_name: 'Jane',
//       last_name: 'Smith',
//       email: 'jane.smith@example.com',
//       mobile_phone: '0987654321',
//       state: 'Texas',
//       status: false,
//     },
//     {
//       first_name: 'Alice',
//       last_name: 'Johnson',
//       email: 'alice.johnson@example.com',
//       mobile_phone: '1122334455',
//       state: 'New York',
//       status: true,
//     },
//     {
//       first_name: 'Bob',
//       last_name: 'Brown',
//       email: 'bob.brown@example.com',
//       mobile_phone: '5566778899',
//       state: 'Florida',
//       status: false,
//     },
//     {
//       first_name: 'Charlie',
//       last_name: 'Davis',
//       email: 'charlie.davis@example.com',
//       mobile_phone: '9988776655',
//       state: 'California',
//       status: true,
//     },
//   ];

//   constructor() {}
//   selectedStatus: boolean | null = null;
//   statusOptions = [
//     { label: 'All', value: null },
//     { label: 'Active', value: true },
//     { label: 'Inactive', value: false },
//   ];
//   ngOnInit(): void {}

//   onGlobalSearch(event: Event, dt: Table) {const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
//       dt.filterGlobal(inputElement.value, 'contains');}

//       onStatusFilterChange(event: any, table: Table): void {
//         table.filter(this.selectedStatus, 'status', 'equals');
//       }
// }


export class ViewPatientsComponent implements OnInit {
  [x: string]: any;

  patients: any[] = [];
  selectedStatus: boolean | null = null;
  statusOptions = [
    { label: 'All', value: null },
    { label: 'Active', value: true },
    { label: 'Inactive', value: false },
  ];

  constructor(private patientService: PatientService, private router: Router) {} // Inject the PatientService

  ngOnInit(): void {
    this.fetchPatients();
  }

  fetchPatients(): void {
    this.patientService.getPatients().subscribe(
      (data: any) => {
        console.log("Patients fetched:", data);
        this.patients = data.data.patients; // Assign the fetched data to the patients array
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  onGlobalSearch(event: Event, dt: Table) {
    const inputElement = event.target as HTMLInputElement; // Cast to HTMLInputElement
    dt.filterGlobal(inputElement.value, 'contains');
  }

  onStatusFilterChange(event: any, table: Table): void {
    table.filter(this.selectedStatus, 'status', 'equals');
    this.fetchPatients();
  }

  editPatient(patientId: string): void {
    this.router.navigate(['/dashboard/edit-patient', patientId]);
  }

   // Delete a patient
   deletePatient(id: string) {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe({
        next: () => {
          alert('Patient deleted successfully.');
          this.fetchPatients(); // Refresh the table
        },
        error: (error: any) => {
          console.error('Error deleting patient:', error);
          alert('Failed to delete patient. Please try again.');
        }
      });
    }
  }
  
}