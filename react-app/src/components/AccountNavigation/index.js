import React, { useState } from 'react';
import { useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom";
import "./AccountNav.css"

function AccountNavigation() {
    const history = useHistory()

    const user = useSelector(state => state.session.user)

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
                    <NavLink className='account-nav-link navhover' to="/account/transfers">Transfers</NavLink>
                    <NavLink className='account-nav-link navhover' to="/account/recurring">Recurring</NavLink>
                    <NavLink className='account-nav-link navhover' to="/account/history">History</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AccountNavigation
