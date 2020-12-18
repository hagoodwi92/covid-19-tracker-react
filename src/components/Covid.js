import React from 'react';

class Covid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      covids: [],
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
    console.log(covids[0].date)
    return (
      
      <React.Fragment>
        <h1>Covid 19 Tracker</h1>
        <ul>
        <h2>United States:</h2>
          {covids.map((covid, index) =>
            <ul key={index}>
              <h5><em>Last Updated: {covid.dateChecked} = dateChecked</em></h5>
              <h4>New Positive Cases: {covid.positiveIncrease}</h4>
              <h4>New Deaths: {covid.deathIncrease}</h4>
              <h4>Deaths Per Minute: {covid.deathIncrease/1440}</h4>
            </ul>
          )}
        </ul>
          
    </React.Fragment>
    );
  }
  
  }
}

export default Covid;