import React, { useState } from "react";
import { addCommas } from "../../Utils";
import OpenModalButton from "../OpenModalButton";
import TransferForm from "../Transfers/TransferForm";
import BankAccountForm from "../BankAccountModal/BankAccountForm";
import "./BuyingPower.css"

function BuyingPower({ portfolio, bank }) {
    const [showDetail, setShowDetail] = useState(false)

    const addPad20ClassName = (className) => {
        if(!showDetail){
            return className
        } else {
            return `${className} pad-20`
        }
    }

    // Event Handlers --------------------------------------------------------------------------------------
    const onClickHandler = () => {
        setShowDetail(!showDetail)
    }

    // Deposit Button --------------------------------------------------------------------------------------
    let depositButton;
    if (bank.error) {
        depositButton = (
            <>
                <OpenModalButton
                    buttonText="Add New Bank Account"
                    modalClass="buy-detail-button bold"
                    modalComponent={<BankAccountForm bank={bank} />}
                />
            </>
        )

    } else {
        depositButton = (
            <>
                <OpenModalButton
                    buttonText="Deposit funds"
                    modalClass="buy-detail-button bold"
                    modalComponent={<TransferForm bank={bank} portfolio={portfolio} />}
                />
            </>
        )
    }

    // Component JSX ----------------------------------------------------------------------------------------
    return (
        <div className={!showDetail ? "buy-power-container" : "buy-power-container show-buy-detail"} onClick={onClickHandler}>
            <div className="buy-power-div bold">
                <div className={addPad20ClassName("buy-power-text")}>
                    Buying Power
                </div>
                <div className={addPad20ClassName("buy-power-amt")}>
                    ${addCommas(Number(portfolio.buying_power).toFixed(2))}
                </div>
            </div>
            <div className="buy-detail-container">
                <div className="buy-detail-div">
                    <div className="buy-detail-info-div brokerage-cash-div">
                        <div className="buy-detail-info-text pad-20">
                            Brokerage Cash
                        </div>
                        <div className="buy-detail-info-amount pad-20">
                            ${addCommas(Number(portfolio.buying_power).toFixed(2))}
                        </div>
                    </div>
                    <div className="buy-detail-info-div">
                        <div className="buy-detail-info-text pad-20">
                            Buying Power
                        </div>
                        <div className="buy-detail-info-amount pad-20">
                            ${addCommas(Number(portfolio.buying_power).toFixed(2))}
                        </div>
                    </div>
                    <div className="buy-detail-button-div">
                        {depositButton}
                    </div>
                </div>
                <div className="buy-power-description">
                    Buying power represents the total value of assets you can purchase.
                </div>
            </div>
        </div>
    )
}

export default BuyingPower
