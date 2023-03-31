import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";

function WatchlistEditModal() {
    const dispatch = useDispatch();
    let [listName, setListName] = useState("")
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data = await dispatch(login(email, password));
        closeModal()
    };


    return (
        <>
            <div className="watchlist-form-container">
                <form className="watchlist-form" onSubmit={handleSubmit}>
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
                        <div className="watchlist-form-buttons">
                            <button className="watchlist-create-btn watchlist-btns bold">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default WatchlistEditModal;
