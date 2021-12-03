import React from "react"
import rocket from '../assets/rocket.svg';

function DashBoardView(props) {
    return (
        <div className="dashboard">
            <div className="dashboard-contents">
                <div className="display">
                    <pre>{props.result}</pre>
                </div>

                <div className="controls">
                    <div className="controls-container">
                        <div className="capsule-btn-wrap">
                            <div className="content">
                                <button 
                                    className="capsule-btn"
                                    onClick={props.handleClick}
                                >Capsules</button>
                                </div>
                            </div>
                            <div className="rocket-logo-wrap">
                                <img 
                                    src={rocket} 
                                    className="rocket-logo" 
                                    alt="rocket" 
                                    onClick={props.handleClick} 
                                />
                            </div>
                            <form 
                                className="landpad-form"
                                onSubmit={props.handleSubmit}
                            >     
                            <input 
                                type="text" 
                                placeholder="text"
                                name="landPadId"
                                size="15" 
                                value={props.landPadId} 
                                onChange={props.handleChange}
                            />
                            <button 
                                disabled={props.isBtnDisabled}
                            >Landing Pad</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardView;