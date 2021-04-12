import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorService } from './doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DoctorMenuComponent } from './doctor-menu/doctor-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Routes, RouterModule } from '@angular/router';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';

const appRoutes: Routes = [ {
  path: '',  //default component to display
  component: DoctorComponent
}, {
  path: 'addDoctor',  //when students added 
  component: DoctorComponent
},{
  path: 'editDoctor/:_id', //when students edited 
  component: DoctorComponent
}, {
  path: 'ListDoctors',  //when students listed
  component: ListDoctorsComponent 
  
}
];
@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    DoctorMenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes)
    
   
    
  ],
  providers: [DoctorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
