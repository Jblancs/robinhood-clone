import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addStockToList, createWatchlists, fetchWatchlists, removeStockFromList } from "../../store/watchlist";

function WatchlistAddRemoveModal({ ticker }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let [showForm, setShowForm] = useState(false)
    let [listName, setListName] = useState("")
    let [error, setError] = useState(false)
    let [disableBtn, setDisableBtn] = useState(false)
    let [disableSaveChanges, setDisableSaveChanges] = useState(false)
    const watchlists = useSelector(state => state.watchlists.watchlists)

    useEffect(() => {
        dispatch(fetchWatchlists())
    }, [dispatch])


    useEffect(() => {
        if (listName.length > 64) {
            setError(true)
            setDisableBtn(true)
        } else {
            setError(false)
            setDisableBtn(false)
        }
    }, [listName])

    // sort lists in descending by id and create default state obj -------------------------------------------
    let lists = watchlists ? Object.values(watchlists) : []
    let defaultObj = {}

    if (lists.length) {
        lists.sort((a, b) => {
            return b.id - a.id
        })

        for (let i = 0; i < lists.length; i++) {
            defaultObj[lists[i].id] = lists[i].stocks.includes(ticker)
        }
    }

    // Check if any changes in watchlists ---------------------------------------------------------------------
    const [updateObj, setUpdateObj] = useState(defaultObj)

    useEffect(() => {
        if (JSON.stringify(defaultObj) === JSON.stringify(updateObj)) {
            setDisableSaveChanges(true)
        } else {
            setDisableSaveChanges(false)
        }
    }, [updateObj])

    // Event Handlers -----------------------------------------------------------------------------------------
    // Create List Handlers -----------------------------------------------------------------------------------
    const submitFormHandler = async (e) => {
        e.preventDefault()

        if (listName.length < 1) {
            setError(true)
            setDisableBtn(true)
            return
        }

        const listInfo = {
            name: listName
        }

        await dispatch(createWatchlists(listInfo))
        setListName("")
        setShowForm(false)
    }

    const cancelFormHandler = (e) => {
        e.preventDefault()
        setShowForm(false)
        setListName("")
    }

    const onChangeFormHandler = (e) => {
        setListName(e.target.value.toString())
    }

    // Update List Handlers -----------------------------------------------------------------------------------
    const checkedHandler = (id) => {
        return updateObj[id]
    }

    const boxOnChangeHandler = (e) => {
        updateObj[e.target.name] = !updateObj[e.target.name]
        setUpdateObj({ ...updateObj })
    }

    const saveChanges = async (e) => {
        e.preventDefault()

        let addArray = []
        let deleteArray = []

        for (let listId in updateObj) {
            let updateInfo = {}
            if (defaultObj[listId] !== updateObj[listId]) {
                updateInfo.watchlistId = listId
                updateInfo.ticker = ticker

                if (updateObj[listId]) {
                    addArray.push(updateInfo)
                } else {
                    deleteArray.push(updateInfo)
                }
            }
        }

        await dispatch(addStockToList(addArray))
        await dispatch(removeStockFromList(deleteArray))

        closeModal()
    }

    // Watchlist form display ---------------------------------------------------------------------------------
    let showWatchlist;

    if (showForm) {
        showWatchlist = (
            <div className="watchlist-form-container">
                <form className="watchlist-form" onSubmit={submitFormHandler}>
                    <div className="watchlist-add-form-div">
                        <div className="watchlist-icon-div">
                            <img className="watchlist-add-to-icon form-icon" src="../images/lightbulb-icon.png" alt="lightbulb" />
                        </div>
                        <div className="watchlist-input-div">
                            <input className="watchlist-add-input"
                                onChange={onChangeFormHandler}
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
                            <button className="watchlist-cancel-btn watchlist-btns bold" type="button" onClick={cancelFormHandler}>Cancel</button>
                            <button className="watchlist-create-btn watchlist-btns bold" disabled={disableBtn}>Create List</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    // Watchlist list display --------------------------------------------------------------------------------
    let watchlistDisplay;
    if (lists.length) {
        watchlistDisplay = (
            <>
                {
                    lists.map(list => (
                        <div key={list.id} className="watch-modal-card-div">
                            <div className="watch-modal-checkbox-div">
                                <input
                                    type="checkbox"
                                    name={`${list.id}`}
                                    id={`${list.id}`}
                                    onChange={boxOnChangeHandler}
                                    className="watch-modal-checkbox"
                                    checked={checkedHandler(list.id)}
                                />
                            </div>
                            <label htmlFor={`${list.id}`} className="watch-modal-label">
                                <div className="watch-modal-img-div">
                                    <img className="watch-modal-display-icon" src="../images/lightbulb-icon.png" alt="lightbulb" />
                                </div>
                                <div className="watch-modal-box-label-div">
                                    <div className="watch-modal-box-label-name bold">
                                        {list.name}
                                    </div>
                                    <div className="watch-modal-box-label-items">
                                        {list.stocks.length} item(s)
                                    </div>
                                </div>
                            </label>
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
                {watchlistDisplay}
            </div>
            <div>
                <button className={!disableSaveChanges ? "watchlist-save-changes bold" : "watchlist-save-changes disable bold"} onClick={saveChanges} disabled={disableSaveChanges}>Save Changes</button>
            </div>
        </div>
    );
}

export default WatchlistAddRemoveModal;
