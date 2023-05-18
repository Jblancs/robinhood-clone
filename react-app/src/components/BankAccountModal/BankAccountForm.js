import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

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

    // component JSX ----------------------------------------------------------------------------------
    return (
        <div className="bank-modal-container">
            <div className="bank-modal-div">
                <div className="bank-modal-header">
                    <h3 className="bank-modal-header-text">
                        Link Bank Account
                        <i className="fas fa-times" onClick={() => closeModal()} />
                    </h3>
                </div>
                <div className="bank-modal-title">
                    Enter your account information
                </div>
                <div className="bank-form-div">
                    <form>
                        <div className="bank-form-type-label">
                            Account Type
                        </div>
                        <select className="bank-form-type-select">
                            <option value="Checking">
                                Checking
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default BankAccountForm
