import React from 'react';
import Header from './components/Header';
import InputCity from './containers/InputCity'

export default class App extends React.Component{
  state={
    temperature : '',
    error : '',
    isBusy : false,
  }

  createMessage = (value)=>{
    this.setState({error: value})
  }

  getTemperature = (city) => {
    this.setState({
      temperature : '',
      error : '',
      isBusy : false,
    })
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=59293c2b902435b0602bc67e592f4dd3';
    this.setState({
      isBusy : true
    })
    fetch(url).then(response=>{
      return response.json();
    }).then(data=>{
      const kelvin = (data.main.temp).toFixed(2);
      const celcius = (kelvin - 273.15).toFixed(2);
      this.setState({
        temperature : celcius,
        tempK : kelvin,
        isBusy : false
      })
    }).catch(error=>{
      this.setState({
        error : "Please enter a valid city!",
        isBusy : false
      });
    })
  }

  render(){
    let data = null;
    if(this.state.isBusy && !this.state.error)
      data = <p>Loading..</p>
    else if(this.state.error)
      data = <p>{this.state.error}</p>
    else if(this.state.temperature !== '')
     data = <p>Temperature in Celcius : {this.state.temperature}°C.  <br/> Temperature in Kelvin : {this.state.tempK}K. </p>
    
    return(
      <React.Fragment>
        <Header /> <br/>
        <InputCity getTemperature={this.getTemperature} addMessage={this.createMessage} /> <br/>
        {data}
      </React.Fragment>
    );
  }
}

