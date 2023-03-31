import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { createWatchlists } from "../../store/watchlist";
import SingleWatchlist from "./SingleWatchlist";


function Watchlists({ watchlists }) {
    let [showForm, setShowForm] = useState(false)
    let [listName, setListName] = useState("")
    let [error, setError] = useState(false)
    let [disableBtn, setDisableBtn] = useState(false)
    const dispatch = useDispatch()

    let lists = watchlists ? Object.values(watchlists) : []

    useEffect(() => {
        if (listName.length > 64) {
            setError(true)
            setDisableBtn(true)
        } else {
            setError(false)
            setDisableBtn(false)
        }
    },[listName])

    // Event Handlers -----------------------------------------------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault()

        const listInfo = {
            name: listName
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

    const onChangeHandler = (e) => {
        setListName(e.target.value.toString())
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
                                onChange={onChangeHandler}
                                placeholder="List Name"
                                type="text"
                                name="name"
                                value={listName} />
                            <div className={error ? "watchlist-input-error-div" : "hidden"}>
                                <span className="watchlist-info-icon bold">i</span>
                                <div className="watchlist-info-text">
                                    Your list name must be less than 64 characters.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="watchlist-form-btn-div">
                        <div className="watchlist-form-btn-space"></div>
                        <div className="watchlist-form-buttons">
                            <button className="watchlist-cancel-btn watchlist-btns bold" type="button" onClick={cancelHandler}>Cancel</button>
                            <button className="watchlist-create-btn watchlist-btns bold" disabled={disableBtn}>Create List</button>
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
                    <SingleWatchlist key={list.id} list={list} />
                ))}
            </div>
        </div>
    )
}

export default Watchlists
