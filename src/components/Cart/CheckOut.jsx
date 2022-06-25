import React, { useRef, useState } from 'react'
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === "";
const isNotTenDigits = value => value.trim().length !== 10

function CheckOut(props) {

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        address: true,
        mobile: true,
    })

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const mobileInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredMobile = mobileInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAddressIsValid = !isEmpty(enteredAddress);
        const enteredMobileIsValid = !isNotTenDigits(enteredMobile);

        const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredMobileIsValid;

        setFormInputValidity({
            name: enteredNameIsValid,
            address: enteredAddressIsValid,
            mobile: enteredMobileIsValid,
        })

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            mobile: enteredMobile,
        })
    }

    const nameControlClasses = `${classes.control} ${formInputValidity.name ? '' : classes.invalid}`
    const addressControlClasses = `${classes.control} ${formInputValidity.address ? '' : classes.invalid}`
    const mobileControlClasses = `${classes.control} ${formInputValidity.mobile ? '' : classes.invalid}`

    return (
        
        <form className={classes.form} onSubmit={confirmHandler}>
            <h4 className={classes.head}>Please enter below details to Confirm your Order!</h4>
            <div className={nameControlClasses}>
                <label htmlFor="name"> Name </label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputValidity.name && <p> Please enter a valid name </p>}
            </div>

            <div className={addressControlClasses}>
                <label htmlFor="address"> Address </label>
                <input type="text" id="address" ref={addressInputRef}/>
                {!formInputValidity.address && <p> Please enter a valid address </p>}
            </div>

            <div className={mobileControlClasses}>
                <label htmlFor="mobile"> Mobile Number </label>
                <input type="text" id="mobile" ref={mobileInputRef}/>
                {!formInputValidity.mobile && <p> Please enter a valid mobile number(10 digits) </p>}
            </div>
            <div className={classes.actions}>
                <button onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOut
