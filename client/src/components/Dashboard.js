import React, { useState } from "react"
import rocket from '../assets/rocket.svg';
import * as SpacePortAPI from '../utils/SpacePortAPI'
import prompt from '../utils/prompt'


function Dashboard() {
    const [ result, setResult ] = useState(prompt)
    const [ landPadId, setLandPadId ] = useState("")
    const [ isBtnDisabled, setBtnDisabled ] = useState(false)

    function displayLoading() {
        setResult("Loading...")
    }

    function displayResult(data) {
        const resultJSON = JSON.stringify(data, null, 4)
        setResult(resultJSON)
    }

    function checkIdInput(value) {
        const disabledBtnInfo = "The following characters not allowed: '#','$','%','&'"
        if( /[#|$|%|&]/.test(value) ) {
            setBtnDisabled(true)
            setResult(disabledBtnInfo)
        }
        else {
            setBtnDisabled(false)
            if ( result === disabledBtnInfo ) {
                setResult(prompt)
            }
        }
    }

    function handleClick(event) {
        const { className } = event.target
        
        if (className === "rocket-logo") {
            return setResult(prompt)
        }

        displayLoading()
        SpacePortAPI.GetCapsules().then(displayResult)
        .catch(err => {
            console.log(err.message)
            displayResult(`Error: ${err.message}`)
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        displayLoading()
        SpacePortAPI.GetLandPad(landPadId).then(displayResult)
        .catch(err => {
            console.log(err.message)
            displayResult(`Error: ${err.message}`)
        })
    }

    function handleChange(event) {
        const {value} = event.target
        setLandPadId(value)
        checkIdInput(value)
    }

    return (
        <div className="dashboard">
            <div className="dashboard-contents">
                <div className="display">
                    <pre>{result}</pre>
                </div>

                <div className="controls">
                    <div className="controls-container">
                        <div className="capsule-btn-wrap">
                            <div className="content">
                                <button 
                                    className="capsule-btn"
                                    onClick={handleClick}
                                >Capsules</button>
                                </div>
                            </div>
                            <div className="rocket-logo-wrap">
                                <img 
                                    src={rocket} 
                                    className="rocket-logo" 
                                    alt="rocket" 
                                    onClick={handleClick} 
                                />
                            </div>
                            <form 
                                className="landpad-form"
                                onSubmit={handleSubmit}
                            >     
                            <input 
                                type="text" 
                                placeholder="text"
                                name="landPadId"
                                size="15" 
                                value={landPadId} 
                                onChange={handleChange}
                            />
                            <button 
                                disabled={isBtnDisabled}
                            >Landing Pad</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Dashboard;