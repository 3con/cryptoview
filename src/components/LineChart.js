import React, { Component } from 'react';
import { max, extent } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear, scaleTime } from 'd3-scale';
import { area } from 'd3-shape';
import { timeFormat } from 'd3-time-format';
import { axisBottom, axisLeft } from 'd3-axis';

class LineChart extends Component {

  constructor(props) {
    super(props);
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount() {
    this.createLineChart();
  }

  componentDidUpdate() {
    this.createLineChart();
  }

  createLineChart() {

    const svg = select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const formatTime = timeFormat("%B, %d, %Y");

    const x = scaleTime()
     .rangeRound([0, width]);

    const y = scaleLinear()
     .rangeRound([height, 0]);

    const lineArea = area()
     .x(d => x(d.x))
     .y1( d => y(d.y));

    //TODO: Figure out how to convert the x values (UTC epoch - date)

    x.domain(extent(this.props.data, d => d.x ));
    y.domain([0, max(this.props.data, d => d.y )]);

    lineArea.y0(y(0));

    g.append("path")
      .datum(this.props.data)
      .attr("fill", "#3498db")
      .attr("d", lineArea);

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x));

    g.append("g")
      .call(axisLeft(y))
      .append("text")
      .attr("fill", "steelblue")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

  }

  render() {
    return (
      <div>
        <svg width={960} height={500}/>
      </div>
    );
  }
}

export default LineChart;
