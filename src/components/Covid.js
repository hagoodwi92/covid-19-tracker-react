import React from 'react';

class Covid extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      covids: []
    };
  }

  makeApiCall = () => {
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
    this.makeApiCall()
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
              <h3>United States New Positive Cases Today: {covid.positiveIncrease}</h3>
              {/* <p>{headline.abstract}</p> */}
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
  
  }
}

export default Covid;