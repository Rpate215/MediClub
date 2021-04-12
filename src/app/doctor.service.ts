import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DoctorService {
  get(id: any) {
    throw new Error('Method not implemented.');
  }
 

    constructor(private http:HttpClient) {}

   //Uses http.get() to request data based on student id 
   getDoctors(thisId: string) {
    return this.http.get('http://localhost:8000/patients/'+ thisId);
    }


    //Uses http.post() to post data 
addDoctors(firstName: string, lastName: string, gender: string, specialty: string, education: string, emailid: string, contactno: string, bio: string, hospitalname: string, street: string, city: string, state: string, zipcode: string, availabletime: string, website: string) {
    this.http.post('http://localhost:8000/doctors',{ firstName, lastName, gender, specialty, education, emailid, contactno, bio, hospitalname, street, city, state, zipcode, availabletime, website })
        .subscribe((responseData) => {
            console.log(responseData);
        }); 
           
    }
    updateDoctors(doctorsid: string, firstName: string, lastName: string, gender: string, specialty: string, education: string, emailid: string, contactno: string, bio: string, hospitalname: string, street: string, city: string, state: string, zipcode: string, availabletime: string, website: string) {
        //request path http://localhost:8000/students/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/doctors/" + 
        doctorsid,{ firstName, lastName, gender, specialty, education, emailid, contactno, bio, hospitalname, street, city, state, zipcode, availabletime, website })
        .subscribe(() => {
            console.log('Updated: ' + doctorsid);
        });
    }

   


    deleteDoctors(doctorsid: string) {
        this.http.delete("http://localhost:8000/doctors/" + doctorsid)
            .subscribe(() => {
                console.log('Deleted: ' + doctorsid);
            });
            location.reload();
    } 
}