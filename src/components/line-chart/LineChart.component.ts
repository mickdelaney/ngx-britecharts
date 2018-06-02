import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as lineChart from 'britecharts/dist/umd/line.min';
import * as d3Selection from 'd3-selection';
import * as tooltip from 'britecharts/dist/umd/tooltip.min';
import * as colors from 'britecharts/dist/umd/colors.min';

@Component({
  selector: 'ngx-bc-linechart',
  templateUrl: './LineChart.component.html'
})

export class LineChartComponent implements OnInit {
  @Input() data: any;
  @Input() chartConfig: any;
  @Input() exportAsImageEvt: Observable<any>;

  @Output() ready: EventEmitter<boolean> = new EventEmitter<boolean>();

  private el: HTMLElement;
  public line: any;
  public chartTooltip: any;
  public tooltipContainer: any;

  constructor(elementRef: ElementRef) {
    Observable.fromEvent(window, 'resize')
      .debounceTime(250)
      .subscribe(() => {
        this.redrawChart();
      });
    this.el = elementRef.nativeElement;
  }

  ngOnInit() {
    this.drawChart();

    let that = this;
    if (this.exportAsImageEvt) {
      this.exportAsImageEvt.subscribe(data => {
        that.line.exportChart(data['filename'], data['title']);
      });
    }
  }

  private drawChart() {
    let that = this;
    this.line = lineChart();
    this.chartTooltip = tooltip();

    let lineContainer = d3Selection.select(this.el).select('.line-chart-container'),
      containerWidth = lineContainer.node() ? lineContainer.node().getBoundingClientRect().width : false;

    if (containerWidth) {
      this.line.width(containerWidth);

      for (let option in this.chartConfig['properties']) {
        if (this.line.hasOwnProperty(option) && option !== 'colorSchema') {
          this.line[option](this.chartConfig['properties'][option]);
        }
      }

      let showTooltip = false;
      if (this.chartConfig.hasOwnProperty('showTooltip') && this.chartConfig['showTooltip'] === true) {
        showTooltip = true;
        this.line.on('customMouseOver', function () {
          that.chartTooltip.show();
        });
        this.line.on('customMouseMove', function (dataPoint, topicColorMap, dataPointXPosition) {
          that.chartTooltip.update(dataPoint, topicColorMap, dataPointXPosition);
        });
        this.line.on('customMouseOut', function () {
          that.chartTooltip.hide();
        });
      }

      if (this.chartConfig.hasOwnProperty('colors')) {
        if (this.chartConfig['colors'].hasOwnProperty('colorSchema')) {
          if (colors.colorSchemas.hasOwnProperty(this.chartConfig['colors']['colorSchema'])) {
            this.line.colorSchema(colors.colorSchemas[this.chartConfig['colors']['colorSchema']]);
          }
        } else if (this.chartConfig['colors'].hasOwnProperty('customSchema')) {
          this.line.colorSchema(this.chartConfig['colors']['customSchema']);
        }

        if (this.chartConfig['colors'].hasOwnProperty('singleLineGradient')) {
          if (colors.colorGradientsHuman.hasOwnProperty(this.chartConfig['colors']['singleLineGradient'])) {
            this.line.lineGradient(colors.colorGradients[this.chartConfig['colors']['singleLineGradient']]);
          }
        } else if (this.chartConfig['colors'].hasOwnProperty('customsingleLineGradient')) {
          this.line.lineGradient(this.chartConfig['colors']['customsingleLineGradient']);
        }
      }

      lineContainer.datum(this.data).call(this.line);

      if (this.chartConfig.hasOwnProperty('click')) {
        this.line.on('customDataEntryClick', function (e, d, m) {
          that.chartConfig['click'](e, d, m);
        });
      }

      if (showTooltip) {
        for (let option in this.chartConfig['tooltip']) {
          if (this.chartTooltip.hasOwnProperty(option)) {
            this.chartTooltip[option](this.chartConfig['tooltip'][option]);
          }
        }

        this.tooltipContainer = d3Selection.select(this.el).select('.line-chart-container .metadata-group .hover-marker');
        this.tooltipContainer.datum([]).call(this.chartTooltip);
      }

      this.ready.emit(true);
    }
  }

  public redrawChart() {
    d3Selection.select(this.el).selectAll('.line-chart').remove();
    this.drawChart();
  }
}
