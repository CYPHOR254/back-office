import { Component, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexNonAxisChartSeries,
} from "ng-apexcharts";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  barChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
    title: ApexTitleSubtitle;
    colors: any[];
  };

  donutChartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    fill: ApexFill;
    colors: any[];
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
  };

  public schoolAnalyticsData: any = {};
  public userAnalyticsData: any = {};

  constructor(private _httpService: HttpServService) {
    this.barChartOptions = {
      series: [
        {
          data: [
            [1, 36, 87, 67],
            [7, 36, 87, 67],
            [5, 36, 87, 67],
            [4, 36, 87, 67],
            [3, 36, 87, 67],
          ],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      yaxis: {
        title: {
          text: "Number of Schools",
        },
      },
      xaxis: {
        categories: [],
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: "Schools Statuses (Daily)",
      },
      colors: ["#BE9650", "#9DBE50", "#25AAE2", "#4154F1", "#F1592A"],
    };

    this.donutChartOptions = {
      series: [],
      chart: {
        type: "donut",
        height: 450,
      },
      labels: [],

      fill: {
        opacity: 1,
      },
      colors: ["#BE9650", "#9DBE50", "#25AAE2", "#4154F1", "#F1592A"],
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "16px",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true,
                label: "Total Count",
                formatter: (w) =>
                  `${w.globals.seriesTotals.reduce(
                    (a: any, b: any) => a + b,
                    0
                  )}`,
              },
            },
          },
        },
      },
    };
  }

  ngOnInit() {
    this.schoolAnalytics();
    this.userAnalytics();
    this.getSchoolsDailyCounts();
    console.log("loaded dashboard");
  }

  schoolAnalytics() {
    const model = null;
    this._httpService
      .postReq(
        "portal/api/v1/dashboard/get/global/school/statuses/indicator/counts",
        model
      )
      .subscribe((response: any) => {
        console.log(response);

        if (response["status"] === 0) {
          this.schoolAnalyticsData = response["data"];
          console.log(this.schoolAnalyticsData, "THIS IS TESTING");
        }
      });
  }

  userAnalytics() {
    const model = null;
    this._httpService
      .postReq(
        "portal/api/v1/dashboard/get/agents/partners/summary/counts",
        model
      )
      .subscribe((response: any) => {
        console.log(response);

        if (response["status"] === 0) {
          this.userAnalyticsData = response["data"];
          console.log(this.userAnalyticsData, "THIS IS TESTING");
        }
      });
  }

  getSchoolsDailyCounts() {
    const model = null;
    this._httpService
      .postReq(
        "portal/api/v1/dashboard/get/global/school/statuses/indicator/daily/StatusCounts",
        model
      )
      .subscribe(
        (response: any) => {
          if (response["status"] === 0) {
            const dailyCounts = response["data"].dailyCounts;
            

            const dates = Object.keys(dailyCounts).reverse();
            const statuses = [
              "PENDING",
              "APPROVED",
              "SUBMITTED",
              "CLARIFICATION",
              "REJECTED",
            ];

            const barSeries = statuses.map((status) => ({
              name: status,
              data: dates.map((date) => dailyCounts[date][status] || 0),
            }));

            this.barChartOptions.series = barSeries;

            this.barChartOptions.xaxis.categories = dates;

            const totalCounts = statuses.map((status) =>
              dates.reduce(
                (acc, date) => acc + (dailyCounts[date][status] || 0),
                0
              )
            );

            this.donutChartOptions.series = totalCounts;
            this.donutChartOptions.labels = statuses.map(
              (status, index) => `${status} - ${totalCounts[index]}`
            );

            const totalCount = totalCounts.reduce(
              (acc, count) => acc + count,
              0
            );
          }
        },
        (error: any) => {
          console.error("Error fetching daily counts: ", error);
        }
      );
  }
}
