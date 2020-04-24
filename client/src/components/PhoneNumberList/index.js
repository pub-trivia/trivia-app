import React, { useState } from "react";
// import ReactDOM from "react-dom";

import "./phoneNumberList.css";

const PhoneNumberList = (props) => {
    //   constructor() {
    //     super();
    //     this.state = {
    //       name: "",
    //       shareholders: [{ name: "" }]
    //     };
    //   }

    //   const [phoneList, setPhoneList ] = useState

    //   handleNameChange = evt => {
    //     this.setState({ name: evt.target.value });
    //   };

    //   handleShareholderNameChange = idx => evt => {
    //     const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
    //       if (idx !== sidx) return shareholder;
    //       return { ...shareholder, name: evt.target.value };
    //     });

    //     this.setState({ shareholders: newShareholders });
    //   };

    //   handleSubmit = evt => {
    //     const { name, shareholders } = this.state;
    //     alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
    //   };

    //   handleAddShareholder = () => {
    //     this.setState({
    //       shareholders: this.state.shareholders.concat([{ name: "" }])
    //     });
    //   };

    //   handleRemoveShareholder = idx => () => {
    //     this.setState({
    //       shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    //     });
    //   };

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