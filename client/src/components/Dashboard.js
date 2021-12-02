import React, { Component } from "react"
import rocket from '../assets/rocket.svg';
import * as SpacePortAPI from '../utils/SpacePortAPI'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            result: "",
            landPadId: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    displayLoading() {
        this.setState({result: "Loading..."})
    }

    displayResult(data) {
        const resultJSON = JSON.stringify(data, null, 4)
        // console.log(resultJSON)
        this.setState({result: resultJSON})
    }

    handleClick(event) {
        this.displayLoading()
        SpacePortAPI.GetCapsules().then((capsules) => {
            this.displayResult(capsules)
        })
        .catch(err => {
            console.log(err.message)
            this.displayResult(`Error: ${err.message}`)
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const id = this.state.landPadId
        this.displayLoading()
        SpacePortAPI.GetLandPad(id).then((landpad) => {
            this.displayResult(landpad)
        })
        .catch(err => {
            console.log(err.message)
            this.displayResult(`Error: ${err.message}`)
        })
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
    }
    
    render() {
        return (
            <div className="dashboard">

                <div className="dashboard-contents">

                    <div className="display">
                        <pre>{this.state.result}</pre>
                    </div>

                    <div className="controls">
                        <button 
                            className="capsule-btn"
                            onClick={this.handleClick}
                        >Capsules</button>

                        <img 
                            src={rocket} 
                            className="rocket-logo" 
                            alt="rocket" 
                        />

                        <form 
                            className="landpad-form" 
                            onSubmit={this.handleSubmit}
                        >    
                            <input 
                                type="text" 
                                placeholder="Enter Id..."
                                name="landPadId"
                                size="15" 
                                value={this.state.landPadId} 
                                onChange={this.handleChange}
                            />

                            <button>Landing Pad</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;