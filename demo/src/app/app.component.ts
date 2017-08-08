import { Component, ViewChild } from '@angular/core';
import { LegendChartComponent, BarChartComponent } from '@colap-dev/ngx-britecharts/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';
  private firstBarChartData = [{ "name": "A", "id": 0, "value": 0.08167, "quantity": 0.08167 }, { "name": "B", "id": 1, "value": 0.01492, "quantity": 0.01492 }, { "name": "C", "id": 2, "value": 0.02782, "quantity": 0.02782 }, { "name": "D", "id": 3, "value": 0.04253, "quantity": 0.04253 }, { "name": "E", "id": 4, "value": 0.12702, "quantity": 0.12702 }, { "name": "F", "id": 5, "value": 0.02288, "quantity": 0.02288 }, { "name": "G", "id": 6, "value": 0.02015, "quantity": 0.02015 }, { "name": "H", "id": 7, "value": 0.06094, "quantity": 0.06094 }, { "name": "I", "id": 8, "value": 0.06966, "quantity": 0.06966 }, { "name": "J", "id": 9, "value": 0.00153, "quantity": 0.00153 }, { "name": "K", "id": 10, "value": 0.00772, "quantity": 0.00772 }, { "name": "L", "id": 11, "value": 0.04025, "quantity": 0.04025 }, { "name": "M", "id": 12, "value": 0.02406, "quantity": 0.02406 }, { "name": "N", "id": 13, "value": 0.06749, "quantity": 0.06749 }, { "name": "O", "id": 14, "value": 0.07507, "quantity": 0.07507 }, { "name": "P", "id": 15, "value": 0.01929, "quantity": 0.01929 }, { "name": "Q", "id": 16, "value": 0.00095, "quantity": 0.00095 }, { "name": "R", "id": 17, "value": 0.05987, "quantity": 0.05987 }, { "name": "S", "id": 18, "value": 0.06327, "quantity": 0.06327 }, { "name": "T", "id": 25, "value": 0.09056, "quantity": 0.09056 }, { "name": "U", "id": 19, "value": 0.02758, "quantity": 0.02758 }, { "name": "V", "id": 20, "value": 0.00978, "quantity": 0.00978 }, { "name": "W", "id": 21, "value": 0.0236, "quantity": 0.0236 }, { "name": "X", "id": 22, "value": 0.0015, "quantity": 0.0015 }, { "name": "Y", "id": 23, "value": 0.01974, "quantity": 0.01974 }, { "name": "Z", "id": 24, "value": 0.00074, "quantity": 0.00074 }];
  private firstBarChartConfig = {
    properties: {
      height: 500,
      usePercentage: true,
      isAnimated: true,
      isHorizontal: false,
      percentageAxisToMaxRatio: 1.3,
      numberFormat: '%'
    },
    colors: {
      customSchema: ["#17becf ", "#bcbd22 ", "#7f7f7f ", "#e377c2 ", "#8c564b ", "#9467bd ", "#d62728 ", "#2ca02c ", "#ff7f0e ", "#1f77b4 "],
    },
    click: this.onBarChartClick,
    showTooltip: false // Dont set to true if you are going to use custom mouse events.
  };

  @ViewChild('barChart') barChart: BarChartComponent;
  @ViewChild('legendChart') legendChart: LegendChartComponent;

  private onBarChartClick($ev) {
    console.log($ev);
  }

  ngAfterViewInit() {
    let that = this;
    this.barChart.bar.on('customMouseOver', function() {
      that.barChart.tooltip.show();
    });
    this.barChart.bar.on('customMouseMove', function(data, pos, size) {
      that.barChart.tooltip.update(data, pos, size);
      // We are about to send a pull request to britecharts in order to make
      // this more efficient.
      for (let d of that.firstBarChartData) {
        if (d["name"] == data["name"]) {
          that.legendChart.legend.highlight(d["id"]);
          break;
        }
      }
    })
    this.barChart.bar.on('customMouseOut', function() {
      that.barChart.tooltip.hide();
      that.legendChart.legend.clearHighlight();
    });
  }

  private groupedBarChartData = [
    {
      "stack": "shiny",
      "name": "Direct1",
      "views": 3,
      "date": "2011-01-05"
    },
    {
      "stack": "shiny",
      "name": "Direct2",
      "views": 10,
      "date": "2011-01-06"
    },
    {
      "stack": "shiny",
      "name": "Direct3",
      "views": 16,
      "date": "2011-01-07"
    },
    {
      "stack": "shiny",
      "name": "Direct4",
      "views": 23,
      "date": "2011-01-08"
    },
    {
      "stack": "radiant",
      "name": "Eventbrite1",
      "views": 23,
      "date": "2011-01-05"
    },
    {
      "stack": "radiant",
      "name": "Eventbrite2",
      "views": 16,
      "date": "2011-01-06"
    },
    {
      "stack": "radiant",
      "name": "Eventbrite3",
      "views": 10,
      "date": "2011-01-07"
    },
    {
      "stack": "radiant",
      "name": "Eventbrite4",
      "views": 4,
      "date": "2011-01-08"
    },
    {
      "stack": "luminous",
      "name": "Email1",
      "views": 10,
      "date": "2011-01-05"
    },
    {
      "stack": "luminous",
      "name": "Email2",
      "views": 20,
      "date": "2011-01-06"
    },
    {
      "stack": "luminous",
      "name": "Email3",
      "views": 26,
      "date": "2011-01-07"
    },
    {
      "stack": "luminous",
      "name": "Email4",
      "views": 33,
      "date": "2011-01-08"
    }
  ];
  private gorupedBarChartConfig = {
    properties: {
      height: 500,
      tooltipThreshold: 600,
      grid: 'horizontal',
      isAnimated: true,
      groupLabel: 'stack',
      nameLabel: 'date',
      valueLabel: 'views'
    },
    colors: {
      customSchema: ["#17becf ", "#bcbd22 ", "#7f7f7f ", "#e377c2 ", "#8c564b ", "#9467bd ", "#d62728 ", "#2ca02c ", "#ff7f0e ", "#1f77b4 "],
    },
    click: this.onBarChartClick,
    showTooltip: true // Dont set to true if you are going to use custom mouse events.
  };
}