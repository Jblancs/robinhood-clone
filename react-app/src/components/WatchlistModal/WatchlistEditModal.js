import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateWatchlistsName } from "../../store/watchlist";
import "./WatchlistModal.css"

function WatchlistEditModal({ id, name }) {
    const dispatch = useDispatch();
    let [listName, setListName] = useState(name)
    let [error, setError] = useState(false)
    let [disableBtn, setDisableBtn] = useState(false)
    const { closeModal } = useModal();

    // Error handler useEffect --------------------------------------------------------------------------------
    useEffect(() => {
        if (listName.length > 64 || listName.length < 1) {
            setError(true)
            setDisableBtn(true)
        } else {
            setError(false)
            setDisableBtn(false)
        }
    }, [listName])

    // Event Handlers -----------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const listInfo = {
            name: listName
        }

        let newList = await dispatch(updateWatchlistsName(listInfo, id))
        closeModal()
    };


    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className="watchlist-edit-form-container-div">
            <div className="watchlist-edit-form-container">
                <h2 className="watchlist-edit-form-header">
                    Edit List
                </h2>
                <form className="watchlist-edit-form" onSubmit={handleSubmit}>
                    <div className="watchlist-edit-form-div">
                        <div className="watchlist-edit-icon-div">
                            <img className="watchlist-edit-icon form-edit-icon" src="./images/lightbulb-icon.png" alt="lightbulb" />
                        </div>
                        <div className="watchlist-edit-input-div">
                            <input className="watchlist-edit-input"
                                onChange={(e) => setListName(e.target.value.toString())}
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
                    <div className="watchlist-edit-form-btn-div">
                        <div className="watchlist-edit-form-buttons">
                            <button className="watchlist-edit-btn watchlist-edit-btns bold" disabled={disableBtn}>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WatchlistEditModal;
