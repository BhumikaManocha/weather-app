import React from 'react';
import Header from './components/Header';
import InputCity from './containers/InputCity'

export default class App extends React.Component{
  state={
    temperature : '',
    error : '',
    isBusy : false
  }

  getTemperature = (city) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=59293c2b902435b0602bc67e592f4dd3';
    this.setState({
      isBusy : true
    })
    fetch(url).then(response=>{
      return response.json();
    }).then(data=>{
      const kelvin = data.main.temp;
      const celcius = kelvin - 273.15;
      this.setState({
        temperature : celcius,
        tempK : kelvin,
        isBusy : false
      })
    }).catch(error=>{
      this.setState({
        error : error.message(),
        isBusy : false
      });
    })
  }

  render(){
    let data = null;
    if(this.state.isBusy && !this.state.error)
      data = <p>Loading..</p>
    else if(this.state.error)
      data = <p>Something Went Wrong : {this.state.error}</p>
    else if(this.state.temperature !== '')
     data = <p>Temperature in Celcius : {this.state.temperature}°C.  <br/> Temperature in Kelvin : {this.state.tempK}K. </p>
    
    return(
      <React.Fragment>
        <Header /> <br/>
        <InputCity getTemperature={this.getTemperature} /> <br/>
        {data}
      </React.Fragment>
    );
  }
}

