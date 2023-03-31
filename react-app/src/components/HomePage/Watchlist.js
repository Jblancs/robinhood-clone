import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


function Watchlists({ watchlists }) {
    let [showForm, setShowForm] = useState(false)
    let [listName, setListName] = useState()
    let lists = watchlists ? Object.values(watchlists) : []

    // Event Handlers -----------------------------------------------------------------------------------------


    // Watchlist form display ---------------------------------------------------------------------------------
    let showWatchlist;

    if (showForm) {
        showWatchlist = (
            <div className="watchlist-form-container">
                <form className="watchlist-form">
                    <div className="watchlist-form-div">
                        <div className="watchlist-icon-div">
                            <img className="watchlist-icon form-icon" src="./images/lightbulb-icon.png" alt="lightbulb" />
                        </div>
                        <div className="watchlist-input-div">
                            <input className="watchlist-input"
                                onChange={(e) => setListName(e.target.value)}
                                placeholder="List Name"
                                type="text"
                                name="name"
                                value={listName} />
                        </div>
                    </div>
                    <div className="watchlist-form-btn-div">
                        <div className="watchlist-form-btn-space"></div>
                        <div className="watchlist-form-buttons">
                            <button className="watchlist-cancel-btn watchlist-btns" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                            <button className="watchlist-create-btn watchlist-btns">Create List</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    // Component JSX ------------------------------------------------------------------------------------------
    return (
        <div>
            <div className="list-header watchlist-header">
                <div className="list-header-text bold">
                    Lists
                </div>
                <div className="add-list-icon" onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus" />
                </div>
            </div>
            <div className="watch-list">
                {showWatchlist}
                {lists.map(list => (
                    <div key={list.name} className="watchlist-card flex-btwn">
                        <div className="watchlist-name-div ">
                            <div className="watchlist-icon-div">
                                <img className="watchlist-icon" src="./images/lightbulb-icon.png" alt="lightbulb" />
                            </div>
                            <div className="watchlist-name">
                                {list.name}
                            </div>
                        </div>
                        <div className="watchlist-buttons-container">
                            <div className="watchlist-button-div">
                                <i className="fas fa-ellipsis-h watchlist-button" />
                            </div>
                            <div className="watchlist-button-div">
                                <i className="fas fa-chevron-up watchlist-button" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Watchlists
