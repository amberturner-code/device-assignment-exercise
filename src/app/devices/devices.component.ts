import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';
import { MessageService } from '../message.service';
import { Device } from '../models/device.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'status', 'actions'];  
  selectedDevice: Device | undefined;
  devices: Device[] = [];  

  constructor(private service: DeviceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getDevices();
  }

  onSelect(device: Device): void {
    this.selectedDevice = device;
    this.messageService.add(`Selected device id=${device.id}`);
  }

  getDevices(): void {
    this.service.getDevices()
        .subscribe(devices => this.devices = devices);
  }

  setStatus(device: Device) {    
    this.service.setDeviceStatus(device).subscribe(response => {});
  }

}
