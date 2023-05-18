import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./BankAccountForm.css"

function BankAccountForm() {
    const { closeModal } = useModal();
    const dispatch = useDispatch()

    const [accountType, setAccountType] = useState("")
    const [bank, setBank] = useState("")
    const [accountNum, setAccountNum] = useState("")

    // event handlers ----------------------------------------------------------------------------------
    const selectTypeHandler = (e) => {
        setAccountType(e.target.value)
    }

    const selectBankHandler = (e) => {
        setBank(e.target.value)
    }

    const accountNumHandler = (e) => {
        setAccountNum(e.target.value)
    }

    // onSubmit handler ---------------------------------------------------------------------------------
    const onSubmitHandler = (e) => {
        e.preventDefault()
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
                    <form>
                        <div className="bank-form-label">
                            Account Type
                        </div>
                        <select className="bank-form-field acct-type-select" onChange={selectTypeHandler}>
                            <option value="" disabled selected hidden>
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
                        <select className="bank-form-field acct-bank-select" onChange={selectBankHandler}>
                            <option value="" disabled selected hidden>
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
                            minLength="10"
                            maxLength="12"
                            required
                        />
                        <div className="link-account-button-div">
                            <button className="review-button bold" type="submit">
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
