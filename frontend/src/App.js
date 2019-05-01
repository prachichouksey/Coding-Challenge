import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import * as d3 from "d3";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.drawLineChart = this.drawLineChart.bind(this);
  }
  componentDidMount() {
    axios.get("http://localhost:5000/api/graph").then(res => {
      this.setState({ data: res.data });
      console.log(res.data);
    });
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.drawLineChart}>Show US GDP Graph</button>
        <svg id="lineChart" />
      </div>
    );
  }
  drawLineChart = () => {
    let data = this.state.data.filter(el => {
      return el.value != null;
    });
    const svgWidth = 1000,
      svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const svg = d3
      .select("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .range([height, 0]);
    const x = d3
      .scalePoint()
      .domain(data.map(d => d.date))
      .range([0, width]);
    const itemsLine = d3
      .line()
      .x(d => x(d.date))
      .y(d => y(d.value));
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-50)");
    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -180)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("GDP value");
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", itemsLine);
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("height", 100)
      .attr("width", 100);
    legend
      .append("rect")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", "red");
    legend
      .append("text")
      .attr("x", width - 50)
      .attr("y", 35)
      .text("GDP Value of US in 60 years");
  };
}

export default App;
