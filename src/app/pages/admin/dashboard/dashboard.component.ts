import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import {
  ArcElement,
  Tooltip,
  LinearScale,
  LineController, // For line chart controller
  Legend,
  Title,
  PieController,
  PointElement,
  LineElement,
  CategoryScale
} from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
Chart.register(ArcElement,CategoryScale,PointElement,LineElement,Title, LinearScale,LineController,Tooltip, Legend, Title, PieController);


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit, OnInit{

  date11: string[] = [];
  totalAmount11: number[] = [];

  subName: string[] = [];
  totalCourse: number[] = [];

  date1: string[] = [];
  total1: number[] = [];



  constructor(@Inject(PLATFORM_ID) private platformId: Object,private dashbordService:DashboardService) {}

  ngOnInit(): void {
  this.getCourseAmountTotalSales()
  this.getCourseSoldPerDay()
  this.getCoursesTotalSales()
  }
  getCoursesTotalSales()
  {
     this.dashbordService.getCoursesTotalSales().subscribe((data: any[])=>{
      this.subName = data.map(item => item._id);
      this.totalCourse = data.map(item => item.total_sale);
     })
  }

  getCourseAmountTotalSales()
  {
    this.dashbordService.getCourseAmountTotalSales().subscribe((res:any[])=>{
      this.date11=res.map(item=>item._id);
      this.totalAmount11=res.map(item=>item.total_sales_amount)
    })
  }

  getCourseSoldPerDay()
  {
    this.dashbordService.getCourseSoldPerDay().subscribe((res:any[])=>{
      this.date1=res.map(item=>item._id);
      this.total1=res.map(item=>item.number_of_courses_sold);
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.graphOne();
      this.graphTwo();
      this.graphThree();
    }
  }

  async graphOne() {
    const Plotly = (await import('plotly.js-dist-min')) as unknown as typeof import('plotly.js');

    const data: Partial<Plotly.PlotData>[] = [{
      x: this.date11,
      y: this.totalAmount11,
      type: 'bar'
    }];

    const layout = {};

    const config = {
      displayModeBar: false
    };

    Plotly.newPlot('myPlot', data, layout, config);
  }

  graphTwo() {
    const barColors = this.subName.map(() => this.getRandomColor());

    new Chart('myPieChart', {
      type: 'pie',
      data: {
        labels: this.subName,
        datasets: [{
          backgroundColor: barColors,
          data: this.totalCourse
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: ''
          }
        }
      }
    });
  }

  graphThree() {
    const maxYValues = Math.max(...this.total1) + 2;

    new Chart('myChart', {
      type: 'line',
      data: {
        labels: this.date1,
        datasets: [{
          fill: false,
          tension: 0,
          backgroundColor: 'rgba(0,0,255,1.0)',
          borderColor: 'rgba(0,0,255,0.1)',
          data: this.total1
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            min: 0,
            max: maxYValues
          }
        }
      }
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
