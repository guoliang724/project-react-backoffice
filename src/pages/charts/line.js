import React, { useRef, useEffect, useState } from "react";
import { Card, Button } from "antd";
import * as echarts from "echarts";
function Line() {
  const chartRef = useRef();
  const [sales, setSales] = useState([5, 20, 36, 10, 10, 20]);
  const [inventories, setInventories] = useState([7, 10, 26, 50, 20, 18]);
  let myChart = null;
  function update() {
    setSales(sales.map((item) => item + 1));
    setInventories(inventories.map((item) => item - 1));
    myChart.setOption({
      series: [
        {
          name: "Sales",
          type: "line",
          data: sales,
        },
        {
          name: "Inventory",
          type: "line",
          data: inventories,
        },
      ],
    });
  }
  function initChart() {
    //initial options
    const options = {
      title: {
        text: "Line Chart Demo - React Hooks",
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
          type: "line",
          data: sales,
        },
        {
          name: "Inventory",
          type: "line",
          data: inventories,
        },
      ],
    };
    //decide if one dom instance has already been exsit.
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      myChart = chart;
    } else {
      myChart = echarts.init(chartRef.current);
    }
    myChart.setOption(options);
  }

  useEffect(() => {
    initChart();
  });

  return (
    <div>
      <Card>
        <Button type="primary" onClick={update}>
          Update
        </Button>
      </Card>
      <Card title="Line Chart Display">
        <div style={{ width: "800px", height: "400px" }} ref={chartRef} />
      </Card>
    </div>
  );
}

export default Line;
