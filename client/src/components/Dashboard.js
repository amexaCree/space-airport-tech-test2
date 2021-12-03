import React, { useState } from "react"
import * as SpacePortAPI from '../utils/SpacePortAPI'
import prompt from '../utils/prompt'
import DashBoardView from './DashBoardView'


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

    function checkBadInput(value) {
        const disabledBtnInfo = "The following characters are not allowed: '#','$','%','&'"
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
        checkBadInput(value)
    }

    return (
        <DashBoardView 
            result={result}
            isBtnDisabled={isBtnDisabled}
            landPadId={landPadId}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    )
    
}

export default Dashboard;