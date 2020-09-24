import React from 'react';

export default class InputCity extends React.Component {
    state={
        city : ''
    }
    handleChange = event => {
    let city = event.target.value;
    this.setState({
        city: city
    });
    
    }
    clickevent = event => {
        console.log(this.state.city)
        if(this.state.city.length <= 0)
        {
            this.props.addMessage('Please enter a valid city.');
            return;
        }
        if (Number(this.state.city)) {
            this.props.addMessage("Your city cannot be a number.");
                return;

        }
        this.props.getTemperature(this.state.city); 

    }
    render(){
        return(
            <div>
                <input type="text"
                placeholder="City Name"
                value={this.state.city}     
                onChange={this.handleChange} />
                <button onClick={this.clickevent}>Get Temperature</button>
            </div>
        );
    }
}