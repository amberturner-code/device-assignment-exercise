import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Device } from './models/device.model';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private devicesUrl = 'https://localhost:5000/api/devices';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.devicesUrl).pipe(
      tap(_ => this.log(`retrieved devices from server`)),
      catchError(this.handleError<Device[]>('getDevices', []))
    );
  }

  setDeviceStatus(device: Device): Observable<any> {
    return this.http.put(this.devicesUrl + '/' + device.id, device, this.httpOptions).pipe(
      tap(_ => this.log(`updated device id=${device.id}`)),
      catchError(this.handleError<any>('setDeviceStatus'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {      
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`DeviceService: ${message}`);
  }
}
