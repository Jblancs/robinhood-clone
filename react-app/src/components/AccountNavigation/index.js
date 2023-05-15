import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom";
import { useAccountNavSelect } from '../../context/AccountNav';
import "./AccountNav.css"

function AccountNavigation() {
    const history = useHistory()

    const {selectedNav, setSelectedNav} = useAccountNavSelect()
    const user = useSelector(state => state.session.user)

    if (!user) {
        history.push("/login")
    }

    return (
        <div className='account-nav-container'>
            <div className='account-nav-div'>
                <div className='account-username'>
                    {user?.username}
                </div>
                <div className='account-nav-link-div'>
                    <NavLink className={selectedNav === "transfers" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/transfers" onClick={() => setSelectedNav("transfers")}>Transfers</NavLink>
                    <NavLink className={selectedNav === "recurring" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/recurring" onClick={() => setSelectedNav("recurring")}>Recurring</NavLink>
                    <NavLink className={selectedNav === "history" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/history" onClick={() => setSelectedNav("history")}>History</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AccountNavigation
