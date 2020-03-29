import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';

const dataSource = `${process.env.PUBLIC_URL}/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

interface Data {
  date: Date;
  value: number;
}

function App() {
  const [data, setData] = useState<Data[]>();
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

  return !data
    ? <span>Loading</span>
    : (
      <>
        <header className="App-header">
          <h1>racoon - Corona Dashboard</h1>
          <table>
            <thead>
            <tr>
              <th>Date</th>
              <th>Deaths</th>
            </tr>
            </thead>
            <tbody>
            {data!.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{row.date.toISOString()}</td>
                <td>{row.value}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </header>
      </>
    );
}

export default App;
