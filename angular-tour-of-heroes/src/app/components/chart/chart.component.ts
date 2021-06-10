import { Component, OnInit } from '@angular/core';
import { SKINTYPE } from '../../data/skin-type';
import { SKINS } from '../../data/mock-skins';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  data: any;
  options: any;
  dataChart: any;

  constructor() {
    this.handleData();
    this.data = {
      labels: this.dataChart.labels,
      datasets: [
        {
          data: this.dataChart.data,
          backgroundColor: this.dataChart['colors'],
          hoverBackgroundColor: this.dataChart['hoverColors']
        }]
    };
    this.options = {
      title: {
        display: true,
        text: 'Total Skin Types',
        fontSize: 25
      },
      legend: {
        position: 'bottom',
        align:'center',
        labels: {
          fontSize: 15,
          padding: 20
        }
      }
    };
   }

  ngOnInit(): void {
  }

  handleData() {
    var newData = {};
    newData['labels'] = [];
    newData['data'] = [];
    newData['colors'] = [];
    newData['hoverColors'] = [];
    for (let i = 0; i < SKINTYPE.length; i++) {
      newData['labels'][i] = SKINTYPE[i].label;
      newData['colors'][i] = SKINTYPE[i].color;
      newData['hoverColors'][i] = SKINTYPE[i].hoverColor;
      const result = SKINS.filter(val => val.type == SKINTYPE[i].label);
      newData['data'][i] = result.length;
    }
    this.dataChart = newData;
    // console.log(newData);
  }
}
