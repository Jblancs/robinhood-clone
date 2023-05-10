import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom";
import "./AccountNav.css"

function AccountNavigation() {
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const [selected, setSelected] = useState()

    if (!user) {
        history.push("/login")
    }

    return (
        <div className='account-nav-container'>
            <div className='account-nav-div'>
                <div className='account-username'>
                    {user.username}
                </div>
                <div className='account-nav-link-div'>
                    <NavLink className={selected === "Transfers" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/transfers" onClick={() => setSelected("Transfers")}>Transfers</NavLink>
                    <NavLink className={selected === "Recurring" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/recurring" onClick={() => setSelected("Recurring")}>Recurring</NavLink>
                    <NavLink className={selected === "History" ? 'account-nav-link navhover selected-link' : 'account-nav-link navhover'} to="/account/history" onClick={() => setSelected("History")}>History</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AccountNavigation
