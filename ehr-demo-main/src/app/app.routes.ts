import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewPatientsComponent } from './components/view-patients/view-patients.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';


export const routes: Routes = [
    {path :'',component: LoginComponent},
    {path :'register',component: RegistrationComponent},
    {path :'login',component: LoginComponent},
    // {path: 'edit-patient/:id', component:PatientFormComponent},

   // {path :'dashboard',component: DashboardComponent},
    {
        path: 'dashboard',
        component:DashboardComponent, // this is the component with the <router-outlet> in the template
        children: [
          {
            path: 'viewPatients', // child route path
            component: ViewPatientsComponent, // child route component that the router renders
          },
          {
            path: 'patientForm',
            component: PatientFormComponent, // another child route component that the router renders
          },

          {
            path: 'edit-patient/:id',
            component: PatientFormComponent,
          },
        ],
      },
  /*  {path:'viewPatients',component :ViewPatientsComponent},
    {path :'patientForm',component:PatientFormComponent},
    {path: 'edit-patient/:id', component:EditPatientComponent}*/
];
