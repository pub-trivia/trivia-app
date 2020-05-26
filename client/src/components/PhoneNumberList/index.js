import React from "react";
// import ReactDOM from "react-dom";

import "./phoneNumberList.css";

const PhoneNumberList = (props) => {

    return (
        <>
            <h6>Text Game Code to Players</h6>

            {props.phoneList.map((number, idx) => (
                <div className="pnum" key={idx}>
                    <input
                        type="text"
                        placeholder={`Player #${idx + 1} number`}
                        value={number.cellNum}
                        onChange={props.handleChangeNumber(idx)}
                    />
                    <button
                        type="button"
                        onClick={props.handleRemoveNumber(idx)}
                        className="small"
                    >
                        -
            </button>
                </div>
            ))}
            <button
                type="button"
                onClick={props.handleAddNumber}
                className="addnum"
            >
                Add Number
        </button>
        </>
    );
}


export default PhoneNumberList; 