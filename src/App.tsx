import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

const dataSource = `${process.env.PUBLIC_URL}/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

interface Data {
  date: Date;
  value: number;
}

function App() {
  const [data, setData] = useState<Data[]>();
  const graphContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    d3.csv(dataSource)
      .then(csvRows => {
        let timeFmt = d3.timeParse("%m/%d/%Y");
        let row = csvRows.find(row => row['Country/Region'] === 'Germany')!;
        setData(
          Object.entries(row).map((key, value) =>
            ({
              date: timeFmt(key[0]),
              value: parseInt(key[1]!)
            } as Data))
            .filter(value => value.date != null)
        );
      })
  }, []);

  useEffect(() => {
    if (!graphContainer.current) {
      return;
    }

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(graphContainer.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleTime()
      .domain(d3.extent(data!, datum => datum.date) as [Date, Date])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data!, d => d.value) as number])
      .range([height, 0]);

    const line = d3.line<Data>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("path")
      .datum(data!)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data, graphContainer]);

  return !data
    ? <span>Loading</span>
    : (
      <>
        <header className="App-header">
          <h1>racoon - Corona Dashboard</h1>
        </header>
        <main>
          <div ref={graphContainer}/>
        </main>
      </>
    );
}

export default App;
