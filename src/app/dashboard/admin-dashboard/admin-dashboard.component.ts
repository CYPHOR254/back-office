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
  ApexLegend,
} from "ng-apexcharts";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  barChartOptionsDaily: {
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
  barChartOptionsCurrentMonth: {
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

  donutChartOptionsStatus: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    fill: ApexFill;
    colors: any[];
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
  };
  donutChartOptionsUsers: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    fill: ApexFill;
    colors: any[];
    title: ApexTitleSubtitle;
    plotOptions: ApexPlotOptions;
    legend: ApexLegend;
  };
  barChartOptionsMonthly: {
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

  public schoolAnalyticsData: any = {};
  public userAnalyticsData: any = {};

  constructor(private _httpService: HttpServService) {
    this.barChartOptionsDaily = {
      series: [
     
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

    this.barChartOptionsCurrentMonth = {
      series: [
     
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
    this.barChartOptionsMonthly = {
      series: [
     
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
        text: "Schools Statuses (Monthly)",
      },
      colors: ["#BE9650", "#9DBE50", "#25AAE2", "#4154F1", "#F1592A"],
    };
    this.donutChartOptionsStatus = {
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
        text: "Total School Status Count",
       
        style: {
          fontSize: "14px",
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
    
    this.donutChartOptionsUsers = {
      series: [],
      chart: {
        type: "donut",
        height: 475,
      },
      labels: [],
      fill: {
        opacity: 1,
      },
      colors: ["#BE9650", "#9DBE50", "#25AAE2", "#4154F1", "#F1592A"],
      title: {
        text: "Total Users Count",
      
        style: {
          fontSize: "14px",
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px', 
              },
              value: {
                show: true,
                fontSize: '14px', 
              },
              total: {
                show: true,
                label: "Total Count",
                fontSize: '14px',
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
      legend: {
        fontSize: '9px', 
      },
      }
    this.barChartOptionsCurrentMonth = {
      series: [],
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
        text: "Schools Statuses (Current Month)",
      },
      colors: ["#BE9650", "#9DBE50", "#25AAE2", "#4154F1", "#F1592A"],
    };


    }
    

  ngOnInit() {
    // this.schoolAnalytics();
    // this.userAnalytics();
    this.getSchoolsDailyCounts();
    this.getSchoolCurrentMonthCounts();
    this.getSchoolsmonthlyCounts()
  
    console.log("loaded dashboard");
  }

  // schoolAnalytics() {
  //   const model = null;
  //   this._httpService
  //     .postReq(
  //       "portal/api/v1/dashboard/get/global/school/statuses/indicator/counts",
  //       model
  //     )
  //     .subscribe((response: any) => {
  //       console.log(response);

  //       if (response["status"] === 0) {
  //         this.schoolAnalyticsData = response["data"];
  //         console.log(this.schoolAnalyticsData, "THIS IS TESTING");
  //       }
  //     });
  // }



  // userAnalytics() {
  //   const model = null;
  //   this._httpService
  //     .postReq(
  //       "portal/api/v1/dashboard/get/agents/partners/summary/counts",
  //       model
  //     )
  //     .subscribe((response: any) => {
  //       console.log(response);

  //       if (response["status"] === 0) {
  //         const userData = response["data"];
  //         this.userAnalyticsData = userData;

  //         // Data for the donut chart
  //         const seriesData = [
  //           userData.SYSTEMUSERSPARTNERS,
  //           userData.ALLSYSTEMUSERS,
  //           userData.AGENTS,
  //           userData.SYSTEMUSERSAGENTS,
  //           userData.PARTNERS,
  //         ];

  //         const labels = [
  //           `SYSTEMUSERSPARTNERS - ${userData.SYSTEMUSERSPARTNERS}`,
  //           `ALLSYSTEMUSERS - ${userData.ALLSYSTEMUSERS}`,
  //           `AGENTS - ${userData.AGENTS}`,
  //           `SYSTEMUSERSAGENTS - ${userData.SYSTEMUSERSAGENTS}`,
  //           `PARTNERS - ${userData.PARTNERS}`,
  //         ];

  //         // Update donut chart options for users
  //         this.donutChartOptionsUsers = {
  //           ...this.donutChartOptionsUsers,
  //           series: seriesData,
  //           labels: labels,
  //         };
  //       }
  //     });
  // }
  
  

// Function to get the last 7 days' dates
getLast10DaysDates() {
  const dates = [];
  const now = new Date();
  for (let i = 7; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      dates.push(date.toISOString().split('T')[0]); // Get date in YYYY-MM-DD format
  }
  return dates;
}

// Filter dailyCounts to only include dates within the last 10 days
filterDataForLast10Days(dailyCounts: { hasOwnProperty: (arg0: any) => any; }) {
  const last10DaysDates = this.getLast10DaysDates();
  return last10DaysDates.filter(date => dailyCounts.hasOwnProperty(date));
}

getSchoolsDailyCounts() {
  const model = null;
  this._httpService.postReq(
      "portal/api/v1/dashboard/get/global/school/statuses/indicator/daily/StatusCounts",
      model
  ).subscribe(
      (response: any) => {
          if (response["status"] === 0) {
              const dailyCounts = response["data"].dailyCounts;

              // Get dates for the last 10 days
              const last10DaysDates = this.filterDataForLast10Days(dailyCounts);
              
              const statuses = [
                  "PENDING",
                  "APPROVED",
                  "SUBMITTED",
                  "CLARIFICATION",
                  "REJECTED",
              ];

              const barSeries = statuses.map((status) => ({
                  name: status,
                  data: last10DaysDates.map((date) => dailyCounts[date][status] || 0),
              }));

              this.barChartOptionsDaily = {
                  ...this.barChartOptionsDaily,
                  series: barSeries,
                  xaxis: {
                      categories: last10DaysDates,
                      title: {
                          text: 'Date'
                      }
                  },
                  yaxis: {
                      title: {
                          text: 'Counts'
                      }
                  }
              };

              const totalCounts = statuses.map((status) =>
                  last10DaysDates.reduce((acc, date) => acc + (dailyCounts[date][status] || 0), 0)
              );

              this.donutChartOptionsStatus = {
                  ...this.donutChartOptionsStatus,
                  series: totalCounts,
                  labels: statuses.map(
                      (status, index) => `${status} - ${totalCounts[index]}`
                  )
              };

              const totalCount = totalCounts.reduce((acc, count) => acc + count, 0);
          }
      },
      (error: any) => {
          console.error("Error fetching daily counts:", error);
      }
  );
}

getSchoolsmonthlyCounts() {
  const model = null;
  this._httpService.postReq(
    "portal/api/v1/dashboard/get/global/school/statuses/indicator/monthly/StatusCounts",
    model
  ).subscribe(
    (response: any) => {
      if (response["status"] === 0) {
        const monthlyCounts = response["data"].monthlyCounts;
        let months = Object.keys(monthlyCounts);

        const statuses = [
          "PENDING",
          "APPROVED",
          "SUBMITTED",
          "CLARIFICATION",
          "REJECTED",
        ];

        const barSeries = statuses.map((status) => ({
          name: status,
          data: months.map((month) => monthlyCounts[month][status] || 0),
        }));

        this.barChartOptionsMonthly = {
          ...this.barChartOptionsMonthly,
          series: barSeries,
          xaxis: {
            categories: months.map(month => {
              // Convert month string to month index (0 for January, 1 for February, etc.)
              const date = new Date(month + '-01');
              return date.toLocaleString('default', { month: 'long' });
            }),
            title: {
              text: 'Months'
            }
          },
          yaxis: {
            title: {
              text: 'Counts'
            }
          }
        };
      }
    },
    (error: any) => {
      console.error("Error fetching monthly counts: ", error);
    }
  );
}



  
  getSchoolCurrentMonthCounts() {
    const model = null;
    this._httpService.postReq(
      "portal/api/v1/dashboard/get/global/school/statuses/indicator/currentmonthly/StatusCounts",
      model
    ).subscribe(
      (response: any) => {
        if (response["status"] === 0) {
          const monthlyCounts = response["data"].monthlyCounts;
          const currentMonth = Object.keys(monthlyCounts)[0]; 
  
          const statuses = [
            "PENDING",
            "APPROVED",
            "SUBMITTED",
            "CLARIFICATION",
            "REJECTED",
          ];
  
          const barSeries = statuses.map((status) => ({
            name: status,
            data: [monthlyCounts[currentMonth][status] || 0], 
          }));
  
          this.barChartOptionsCurrentMonth = {
            ...this.barChartOptionsCurrentMonth,
            series: barSeries,
            xaxis: {
              categories: [currentMonth],
              title: {
                text: 'Month'
              }
            },
            yaxis: {
              title: {
                text: 'Counts'
              }
            }
          };
        }
      },
      (error: any) => {
        console.error("Error fetching monthly counts: ", error);
      }
    );
  
}}
