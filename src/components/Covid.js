import React from 'react';

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
          {covids.map((covid, index) =>
            <li key={index}>
              <h2>United States:</h2>
              <h5><em>Last Updated: {covid.dateChecked}</em></h5>
              <h4>New Positive Cases: {covid.positiveIncrease}</h4>
              <h4>New Deaths: {covid.deathIncrease}</h4>
            </li>
          )}
        </ul>
    </React.Fragment>
    );
  }
  
  }
}

export default Covid;