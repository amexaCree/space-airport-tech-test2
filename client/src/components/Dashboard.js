import React, { Component } from "react"
import rocket from '../assets/rocket.svg';
import * as SpacePortAPI from '../utils/SpacePortAPI'
import prompt from '../utils/prompt'

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

    componentDidMount(){
        this.displayPrompt()
    }

    displayPrompt() {
        this.setState({result: prompt})
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
        const { className } = event.target
        
        if (className === "rocket-logo") {
            return this.displayPrompt()
        }

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
                        <div className="controls-container">
                            <div className="capsule-btn-wrap">
                                <div className="content">
                                    <button 
                                        className="capsule-btn"
                                        onClick={this.handleClick}
                                    >Capsules</button>
                                </div>
                            </div>
                            <div className="rocket-logo-wrap">
                                <img 
                                    src={rocket} 
                                    className="rocket-logo" 
                                    alt="rocket" 
                                    onClick={this.handleClick}
                                />
                            </div>
                            <form 
                                className="landpad-form" 
                                onSubmit={this.handleSubmit}
                            >    
                                <input 
                                    type="text" 
                                    placeholder="text"
                                    name="landPadId"
                                    size="15" 
                                    value={this.state.landPadId} 
                                    onChange={this.handleChange}
                                />
                                <button 
                                    disabled={this.state.isBtnDisabled}
                                >Landing Pad</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;