import React from "react";
import { NavLink } from "react-router-dom";


function Watchlists({ watchlists }) {

    return (
        <div>
            <div className="list-header watchlist-header">
                <div className="list-header-text bold">
                    Lists
                </div>
                <div className="add-list-icon bold">
                    <i className="fas fa-plus" />
                </div>
            </div>
            <div className="watch-list">
                Map Watchlists
            </div>
        </div>
    )
}

export default Watchlists
