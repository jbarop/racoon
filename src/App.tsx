import React, {useEffect, useState} from 'react';
import Papa from 'papaparse';

const dataSource = `${process.env.PUBLIC_URL}/COVID-19/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv`;

function App() {
  const [data, setData] = useState<string[][]>();
  useEffect(() => {
    fetch(dataSource)
      .then(response => response.text())
      .then(text => setData(Papa.parse(text).data))
      .catch(reason => console.error(reason));
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
              {data[0].map(headline => (
                <th key={headline}>{headline}</th>
              ))}
            </tr>
            </thead>
            <tbody>
            {data?.slice(1).map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((col, colIndex) => (
                  <td key={`row-${rowIndex}-col-${colIndex}`}>{col}</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </header>
      </>
    );
}

export default App;
