import React, {useEffect, useRef, useState} from 'react';
import {Dropdown} from 'semantic-ui-react';
import * as d3 from 'd3';
import {DSVRowArray, DSVRowString} from 'd3';

const dataSource = `${process.env.PUBLIC_URL}/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

interface Record {
  date: Date;
  value: number;
}

interface Countries {
  [key: string]: Record[]
}

/**
 * Converts a row from the CSV into an array of {@link Record}s.
 *
 * A row has a few columns of meta information and one column per day.
 */
function csvRowToRecords(row: DSVRowString): { countryName: string, records: Record[] } {
  const parseTime = d3.timeParse("%m/%d/%Y");

  return {
    countryName: row['Country/Region']!,
    records: Object.entries(row)
      .map(key =>
        ({
          date: parseTime(key[0]),
          value: parseInt(key[1] as string)
        } as Record))
      .filter(it => it.date != null)
  };
}

/**
 * Converts a CSV into an object which holds time series {@link Record}s for each country.
 *
 * Some countries are split across multiple rows. These are summed together.
 */
function csvToCountries(rows: DSVRowArray): Countries {
  const countries = rows
    .map(row => csvRowToRecords(row))
    .reduce((accumulator, it) => {
      // group by by country name because some countries are split across multiple rows
      accumulator[it.countryName] = !accumulator[it.countryName]
        ? it.records // new country --> insert it
        : accumulator[it.countryName] // existing country --> add the values to the existing records.
          .map((day, index) => ({...day, value: day.value + it.records[index].value}));
      return accumulator;
    }, {} as Countries);

  // Filter out records with value == 0
  Object.entries(countries)
    .forEach((entry: [string, Record[]]) => countries[entry[0]] = entry[1].filter(record => record.value !== 0));

  return countries;
}

function App() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(['Germany', 'Italy', 'US']);
  const [countries, setCountries] = useState<Countries>();
  const graphContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    d3.csv(dataSource)
      .then((csvRows: DSVRowArray) => setCountries(csvToCountries(csvRows)))
  }, []);

  useEffect(() => {
    if (!graphContainer.current || !countries) {
      return;
    }

    const maximumValue =
      d3.max(
        selectedCountries
          .map(selectedCountry => countries[selectedCountry])
          .map((csvRowToRecords: Record[]) => d3.max(csvRowToRecords.map(value => value.value))!)
      )!;

    const minimumDate =
      d3.min(
        selectedCountries
          .map(selectedCountry => countries[selectedCountry])
          .map((csvRowToRecords: Record[]) => d3.min(csvRowToRecords.map(value => value.date))!)
      )!;

    const maximumDate =
      d3.max(
        selectedCountries
          .map(selectedCountry => countries[selectedCountry])
          .map((csvRowToRecords: Record[]) => d3.max(csvRowToRecords.map(value => value.date))!)
      )!;

    const margin = {top: 10, right: 30, bottom: 30, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(graphContainer.current)
      .selectAll("*")
      .remove();

    const svg = d3.select(graphContainer.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime()
      .domain([minimumDate, maximumDate])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([1, maximumValue])
      .range([height, 0]);

    const line = d3.line<Record>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .call(d3.axisLeft(y));

    selectedCountries.forEach(selectedCountry => {
      svg.append("path")
        .datum(countries[selectedCountry])
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    })
  }, [selectedCountries, countries, graphContainer]);

  return !countries
    ? <span>Loading</span>
    : (
      <>
        <header className="App-header">
          <h1>racoon - Corona Dashboard</h1>
        </header>
        <main>
          <Dropdown
            placeholder='Countries'
            clearable
            fluid
            multiple
            search
            selection
            options={Object.keys(countries).map(value => ({key: value, text: value, value: value}))}
            value={selectedCountries}
            onChange={(event, dropdownProps) => setSelectedCountries(dropdownProps.value as string[])}
          />
          <div ref={graphContainer}/>
        </main>
      </>
    );
}

export default App;
