import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public chart: any;
 

  ngOnInit(): void {
    this.createChart();
  }


  createChart(){
    this.chart = new Chart("MyChart", {
      type: 'bar',
      data: {
        labels: ['2022-07-27', '2022-07-28', '2022-07-29','2023-06-30',
								 '2023-07-01', '2023-07-02', '2023-07-03','2023-07-04', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: '#303942'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: ' #1e8c10ee'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }
}