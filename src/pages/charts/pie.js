import React, { Component } from "react";
import { Card } from "antd";
import * as echarts from "echarts";

export default class Pie extends Component {
  refPie = React.createRef();
  pieChart = null; //instance of echarts

  //initial bar chart
  initChart = () => {
    let option = {
      backgroundColor: "#2c343c",

      title: {
        text: "Visit Sources",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc",
        },
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },

      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1],
        },
      },
      series: [
        {
          name: "visit sources",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "Directly" },
            { value: 310, name: "Email Promotion" },
            { value: 274, name: "Advertisment" },
            { value: 235, name: "Video Advertisment" },
            { value: 400, name: "Search Engine" },
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            smooth: 0.2,
            length: 10,
            length2: 20,
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function (idx) {
            return Math.random() * 200;
          },
        },
      ],
    };

    this.pieChart = echarts.init(this.refPie.current);
    this.pieChart.setOption(option, true);
  };

  //initial in the beganing
  componentDidMount = () => {
    this.initChart();
  };

  render() {
    return (
      <div>
        <Card title="Pie Chart Display">
          <div
            id="piechart"
            ref={this.refPie}
            style={{ width: "800px", height: "400px" }}
          ></div>
        </Card>
      </div>
    );
  }
}
