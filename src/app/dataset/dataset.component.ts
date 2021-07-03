import { Component, OnInit } from '@angular/core';
import {AcquisitionService, DataDTO} from '../api';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  data: DataDTO[];
  constructor(private acquisitionService: AcquisitionService) { }

  ngOnInit(): void {
    this.acquisitionService.getData().subscribe((response: DataDTO[]) => {
      this.data = response;
    });
  }

}
