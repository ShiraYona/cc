import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donor } from '../models/donor.model';
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DonorsService {
port:number=44387;
  constructor(private httpClient: HttpClient) { }
  private reloadDonorsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadDonors$: Observable<boolean> = this.reloadDonorsSubject.asObservable();

  getDonors():Observable<Donor[]>{
    debugger
    let url = `https://localhost:${this.port}/api/Gift/GetDonors`
    return this.httpClient.get<Donor[]>(url);
  }

  getDonorById(id: number): Observable<Donor> {
    let url = `https://localhost:${this.port}/api/Gift/GetDonor/${id}` ;
    return this.httpClient.get<Donor>(url);
  }

  saveDonor(donor: Donor) :Observable<boolean>{
    let url = `https://localhost:${this.port}/api/Gift/UpdateDonor`;
    return this.httpClient.put<boolean>(url, donor);
  }

  addDonor(donor: Donor): Observable<number> {
    let url = `https://localhost:${this.port}/api/Gift/AddDonor`;
    return this.httpClient.post<number>(url, donor);

  }

  deleteDonor(id: number): Observable<boolean> {
    let url = `https://localhost:${this.port}/api/Gift/DeleteDonor${id}`;
    return this.httpClient.delete<boolean>(url);

  }
  setReloadDonor(){
    let flag = this.reloadDonorsSubject.value;
    this.reloadDonorsSubject.next(!flag);
  }

}
