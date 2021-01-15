import React, { Component } from "react";
import { Card, Calendar, Timeline } from "antd";
import "./index.css";
export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Card title="Home Page" className="card1">
          <Calendar fullscreen={false}></Calendar>
        </Card>
        <Card className="card2">
          <Timeline>
            <Timeline.Item>Create a proposal 2020-12-01</Timeline.Item>
            <Timeline.Item>Built a backend sever 2020-12-28</Timeline.Item>
            <Timeline.Item>Done with the frontend 2021-01-13</Timeline.Item>
            <Timeline.Item>Solve network problems 2020-01-15</Timeline.Item>
            <Timeline.Item>Technical testing 2012--01--16</Timeline.Item>
            <Timeline.Item>Deploye 2020-01-20</Timeline.Item>
          </Timeline>
        </Card>
      </div>
    );
  }
}
