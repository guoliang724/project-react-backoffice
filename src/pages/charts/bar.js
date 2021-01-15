import React, { Component } from "react";
import { Card, Button, message } from "antd";
import * as echarts from "echarts";

export default class Bar extends Component {
  refBar = React.createRef();
  barChart = null; //instance of echarts
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    inventories: [7, 10, 26, 50, 20, 18],
  };
  //update bar chart
  update = () => {
    this.setState(
      {
        sales: this.state.sales.map((item) => item + 1),
        inventories: this.state.inventories.map((item) => item - 1),
      },
      () => {
        this.dataChange();
      }
    );
  };
  //initial bar chart
  initChart = () => {
    let option = {
      title: {
        text: "ECharts Demo",
      },
      tooltip: {},
      legend: {
        data: ["Sales", "Inventory"],
      },
      xAxis: {
        data: [
          "Computers",
          "Cell Phones",
          "Car&Vehicle",
          "Televisions",
          "Office Electrics",
          "Portable Audio",
        ],
      },
      yAxis: {},
      series: [
        {
          name: "Sales",
          type: "bar",
          data: this.state.sales,
        },
        {
          name: "Inventory",
          type: "bar",
          data: this.state.inventories,
        },
      ],
    };

    this.barChart = echarts.init(this.refBar.current);
    this.barChart.setOption(option, true);
  };
  //change data in chart
  dataChange = () => {
    if (this.barChart) {
      this.barChart.setOption({
        series: [
          {
            name: "Sales",
            type: "bar",
            data: this.state.sales,
          },
          {
            name: "Inventory",
            type: "bar",
            data: this.state.inventories,
          },
        ],
      });
    } else {
      message.warn("Chart Dose not exist!");
    }
  };
  //initial in the beganing
  componentDidMount = () => {
    this.initChart();
  };

  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>
            Reset
          </Button>
        </Card>
        <Card title="Bar Chart Display">
          <div
            ref={this.refBar}
            style={{ width: "800px", height: "400px" }}
          ></div>
        </Card>
      </div>
    );
  }
}
