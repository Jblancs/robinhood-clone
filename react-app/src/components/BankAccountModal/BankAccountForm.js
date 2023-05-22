import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BankAccountForm.css"
import { createBankAccount, updateBankAccount } from "../../store/bankAccount";

function BankAccountForm() {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [accountType, setAccountType] = useState("")
    const [bankName, setBankName] = useState("")
    const [accountNum, setAccountNum] = useState("")
    const [errors, setErrors] = useState([])

    // event handlers ----------------------------------------------------------------------------------
    const selectTypeHandler = (e) => {
        setAccountType(e.target.value)
    }

    const selectBankHandler = (e) => {
        setBankName(e.target.value)
    }

    const accountNumHandler = (e) => {
        setAccountNum(e.target.value)
    }

    // onSubmit handler ---------------------------------------------------------------------------------
    const onSubmitHandler = async (e) => {
        e.preventDefault()

        let bankAccountData = {
            bank: bankName,
            account_type: accountType,
            account_number: accountNum
        }

        // frontend error handling
        let errorObj = []

        if (accountNum.length < 10 || accountNum.length > 12) {
            errorObj.push("Length should be 10-12 digits")
        }

        if (!Number.isInteger(Number(accountNum))) {
            errorObj.push("Must contain numbers only")
        }

        if (errorObj.length) {
            setErrors(errorObj)
            return
        }

        // Dispatch POST request which will check if account exists. If it doesn't, create a new account.
        let response = await dispatch(createBankAccount(bankAccountData))

        // Otherwise show error if linked account already exists
        if(response.errors){
            for(let i=0; i < response.errors.length; i++){
                errorObj.push(response.errors[i])
                setErrors(errorObj)
                return
            }

        // Or re-link a previously unlinked account (value of link key is account id)
        }else if(response.link){
            await dispatch(updateBankAccount(response.link))
            setErrors([])
            setBankName("")
            setAccountNum("")
            setAccountType("")
            closeModal()

        }else{
            setErrors([])
            setBankName("")
            setAccountNum("")
            setAccountType("")
            closeModal()
        }

    }

    // If errors on submit ------------------------------------------------------------------------------
    let errorDisplay;
    if (errors.length) {
        errorDisplay = (
            <div className="acct-error-container">
                <div className="acct-error-display">
                    <div className="acct-error-title-div bold">
                        <span className="acct-info-icon acct-error-icon bold">!</span>
                        Invalid Account Number
                    </div>
                    {errors.map(message => (
                        <div key={message} className="acct-error-message-div">&#8226; {message}</div>
                    ))}
                </div>
            </div>
        )
    }

    // component JSX ------------------------------------------------------------------------------------
    return (
        <div className="bank-modal-container">
            <div className="bank-modal-div">
                <h3 className="bank-modal-header">
                    <div className="bank-modal-header-text">
                        Link Bank Account
                    </div>
                    <i className="fas fa-times" onClick={() => closeModal()} />
                </h3>
                <div className="bank-modal-title">
                    Enter your account information
                </div>
                <div className="bank-form-div">
                    <form onSubmit={onSubmitHandler}>
                        <div className="bank-form-label">
                            Account Type
                        </div>
                        <select className="bank-form-field acct-type-select" required onChange={selectTypeHandler}>
                            <option value="" hidden>
                                Select Account Type
                            </option>
                            <option value="Checking">
                                Checking
                            </option>
                            <option value="Saving">
                                Saving
                            </option>
                        </select>
                        <div className="bank-form-label">
                            Bank Name
                        </div>
                        <select className="bank-form-field acct-bank-select" required onChange={selectBankHandler}>
                            <option value="" hidden>
                                Select Bank
                            </option>
                            <option value="Wells Fargo">
                                Wells Fargo
                            </option>
                            <option value="Chase">
                                Chase
                            </option>
                            <option value="Capital One">
                                Capital One
                            </option>
                            <option value="Bank of America">
                                Bank of America
                            </option>
                            <option value="TD Bank">
                                TD Bank
                            </option>
                            <option value="Citigroup">
                                Citigroup
                            </option>
                        </select>
                        <div className="bank-form-label">
                            Account Number
                        </div>
                        <input
                            className="bank-form-field acct-num-input"
                            type="text"
                            value={accountNum}
                            onChange={accountNumHandler}
                            required
                        />
                        {errorDisplay}
                        <div className="link-account-button-div">
                            <button className="link-account-button bold">
                                <i className="fas fa-lock" />
                                Link Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BankAccountForm
