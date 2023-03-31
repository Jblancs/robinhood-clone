import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { createWatchlists } from "../../store/watchlist";
import SingleWatchlist from "./SingleWatchlist";


function Watchlists({ watchlists }) {
    let [showForm, setShowForm] = useState(false)
    let [listName, setListName] = useState("")
    const dispatch = useDispatch()

    let lists = watchlists ? Object.values(watchlists) : []

    // Event Handlers -----------------------------------------------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault()

        const listInfo = {
            name: listName.toString()
        }

        let newList = await dispatch(createWatchlists(listInfo))
        setShowForm(false)
        setListName("")
    }

    const cancelHandler = (e) => {
        e.preventDefault()
        setShowForm(false)
        setListName("")
    }

    // Watchlist form display ---------------------------------------------------------------------------------
    let showWatchlist;

    if (showForm) {
        showWatchlist = (
            <div className="watchlist-form-container">
                <form className="watchlist-form" onSubmit={submitHandler}>
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
                            <button className="watchlist-cancel-btn watchlist-btns bold" type="button" onClick={cancelHandler}>Cancel</button>
                            <button className="watchlist-create-btn watchlist-btns bold">Create List</button>
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
                    <SingleWatchlist key={list.name} list={list} />
                ))}
            </div>
        </div>
    )
}

export default Watchlists
