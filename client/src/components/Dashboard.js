import React, { Component } from "react"
import rocket from '../assets/rocket.svg';

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            result: "",
            landingPadId: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClick() {
        fetch("http://localhost:4000/capsules")
        .then(response => {
            const data = response.json() 
            console.log(data)
            this.setState({result: JSON.stringify(data)})
        })
        .catch((error) => {
            this.setState({result: error})
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        // if (!!this.state.landingPadId) {}
        fetch("http://localhost:4000/capsules", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.state.landingPadId})
        })
        .then(response => {
            const data = response.json() 
            console.log(data)
            this.setState({result: JSON.stringify(data)})
        })
        .catch((error) => {
            this.setState({result: error})
        })
    }
    
    render() {
        return (
            <div className="dashboard">
                <div className="display">{this.state.result}</div>
                <div className="controls">
                    <button onClick={this.handleClick}>Capsule</button>
                    <img src={rocket} className="rocket-logo" alt="rocket" />
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="landPad" placeholder="Enter Landing Pad ID"/>
                        <button>Landing Pad</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Dashboard;