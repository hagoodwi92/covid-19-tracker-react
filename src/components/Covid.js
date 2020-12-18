import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const options = {
  chart: {
    type: 'column'
},
title: {
    text: 'World\'s largest cities per 2017'
},
subtitle: {
    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
},
xAxis: {
    type: 'category',
    labels: {
        rotation: -45,
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
},
yAxis: {
    min: 0,
    title: {
        text: 'Population (millions)'
    }
},
legend: {
    enabled: false
},
tooltip: {
    pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
},
series: [{
    name: 'Population',
    data: [
        ['Shanghai', 24.2],
        ['Beijing', 20.8],
        ['Karachi', 14.9],
        ['Shenzhen', 13.7],
        ['Guangzhou', 13.1],
        ['Istanbul', 12.7],
        ['Mumbai', 12.4],
        ['Moscow', 12.2],
        ['São Paulo', 12.0],
        ['Delhi', 11.7],
        ['Kinshasa', 11.5],
        ['Tianjin', 11.2],
        ['Lahore', 11.1],
        ['Jakarta', 10.6],
        ['Dongguan', 10.6],
        ['Lagos', 10.6],
        ['Bengaluru', 10.3],
        ['Seoul', 9.8],
        ['Foshan', 9.3],
        ['Tokyo', 9.3]
    ],
    dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.1f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
}]
}

const Chart = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>

class Covid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      covids: [],
      states: []
    };
  }

  makeUSApiCall = () => {
    fetch(`https://api.covidtracking.com/v1/us/current.json`)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          this.setState({
            isLoaded: true,
            covids: jsonifiedResponse
          });
        })
        .catch((error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }

  componentDidMount() {
    this.makeUSApiCall()
  }

render() {
  const { error, isLoaded, covids } = this.state;
  if (error) {
    return <React.Fragment>Error: {error.message}</React.Fragment>;
  } else if (!isLoaded) {
    return <React.Fragment>Loading...</React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <h1>Covid 19 Tracker</h1>
        <ul>
        <h2>United States:</h2>
          {covids.map((covid, index) =>
            <ul key={index}>
              <h5><em>Last Updated: {covid.dateChecked}</em></h5>
              <h4>New Positive Cases: {covid.positiveIncrease}</h4>
              <h4>New Deaths: {covid.deathIncrease}</h4>
              <h4>Deaths Per Minute: {covid.deathIncrease/1440}</h4>
            </ul>
          )}
        </ul>
          <Chart/>
    </React.Fragment>


    );
  }
  
  }
}

export default Covid;