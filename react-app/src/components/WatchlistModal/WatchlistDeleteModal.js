import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteWatchlists } from "../../store/watchlist";
import "./WatchlistModal.css"

function WatchlistDeleteModal({ id, name, stocks }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const numStocks = stocks.length

    // Event Handlers -----------------------------------------------------------------------------------------
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteWatchlists(id))
        closeModal()
    };


    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className="watchlist-delete-form-container">
            <h3 className="watchlist-delete-form-header">
                Are you sure you want to delete {`"${name}"`}?
                <i className="fas fa-times" onClick={() => closeModal()}/>
            </h3>
            <div className="watchlist-delete-text">
                {`If you delete this list and its ${numStocks} items, it'll be gone forever!`}
            </div>
            <div className="watchlist-delete-btn-div">
                <button className="watchlist-delete-btn bold" onClick={handleDelete}>Delete {name}</button>
            </div>
        </div>
    );
}

export default WatchlistDeleteModal;
