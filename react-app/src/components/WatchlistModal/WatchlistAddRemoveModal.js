import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createWatchlists } from "../../store/watchlist";



function WatchlistAddRemoveModal({ ticker, watchlists }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let [showForm, setShowForm] = useState(false)
    let [listName, setListName] = useState("")
    let [error, setError] = useState(false)
    let [disableBtn, setDisableBtn] = useState(false)

    let lists = watchlists ? Object.values(watchlists) : []

    if (lists.length) {
        lists.sort((a, b) => {
            return b.id - a.id
        })
    }

    console.log(lists)

    useEffect(() => {
        if (listName.length > 64) {
            setError(true)
            setDisableBtn(true)
        } else {
            setError(false)
            setDisableBtn(false)
        }
    }, [listName])

    // Event Handlers -----------------------------------------------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault()

        if (listName.length < 1) {
            setError(true)
            setDisableBtn(true)
            return
        }

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
                    <div className="watchlist-add-form-div">
                        <div className="watchlist-icon-div">
                            <img className="watchlist-add-to-icon form-icon" src="../images/lightbulb-icon.png" alt="lightbulb" />
                        </div>
                        <div className="watchlist-input-div">
                            <input className="watchlist-add-input"
                                onChange={onChangeHandler}
                                placeholder="List Name"
                                type="text"
                                name="name"
                                value={listName} />
                            <div className={error ? "watchlist-input-error-div" : "hidden"}>
                                <span className="watchlist-info-icon bold">i</span>
                                <div className="watchlist-info-text">
                                    Your list name must be between 1 and 64 characters.
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

    // Watchlist list display --------------------------------------------------------------------------------
    let watchlistDisplay;
    console.log(lists)
    if (lists.length) {
        watchlistDisplay = (
            <>
                {
                    lists.map(list => (
                        <div key={list.id} className="watch-modal-card-div">
                            <input
                                type="checkbox"
                                name={list.id}
                            />
                            <div className="watch-modal-img-div">
                                <img className="watch-modal-display-icon" src="../images/lightbulb-icon.png" alt="lightbulb" />
                            </div>
                        </div>
                    ))
                }
            </>
        )
    }

    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className="watch-add-stock-container">
            <h2 className="watch-add-stock-header">
                {`Add ${ticker} to Your Lists`}
                <i className="fas fa-times" onClick={() => closeModal()} />
            </h2>
            <div className="watch-create-form-div">
                <div className="watch-add-to-watchlist-div" onClick={() => setShowForm(true)}>
                    <i className="fas fa-plus watch-add-list-icon" />
                    <div className="watch-add-list-text">
                        Create New List
                    </div>
                </div>
                {showWatchlist}
            </div>
            <div className="watchlist-modal-display-div">
                test
            </div>
            <div>
                <button className="watchlist-save-changes bold" disabled={disableBtn}>Save Changes</button>
            </div>
        </div>
    );
}

export default WatchlistAddRemoveModal;
