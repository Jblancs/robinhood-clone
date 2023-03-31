import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";



function WatchlistAddRemoveModal({ }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // Event Handlers -----------------------------------------------------------------------------------------
    const handleDelete = async (e) => {
        e.preventDefault();

        closeModal()
    };

    // Component JSX -----------------------------------------------------------------------------------------
    return (
        <div className="watchlist-delete-form-container">
            Hello
        </div>
    );
}

export default WatchlistAddRemoveModal;
