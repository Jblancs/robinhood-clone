import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { createWatchlists } from "../../store/watchlist";
import OpenModalButton from "../OpenModalButton";
import WatchlistEditModal from "../../WatchlistModal/WatchlistEditModal";
import WatchlistDeleteModal from "../../WatchlistModal/WatchlistDeleteModal";


function SingleWatchlist({ list }) {
    const dropdownRef = useRef();
    let [showMenu, setShowMenu] = useState(false)


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!dropdownRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    // Event Handlers ------------------------------------------------------------------------------------------------------------
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => setShowMenu(false);

    // Modal Icons ------------------------------------------------------------------------------------------------------------
    const editIcon = (<i className="fas fa-cog watchlist-drop-icon" />)
    const deleteIcon = (<i className="far fa-times-circle watchlist-drop-icon" />)

    // Component JSX ------------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className="watchlist-card flex-btwn">
                <div className="watchlist-name-div ">
                    <div className="watchlist-icon-div">
                        <img className="watchlist-icon" src="./images/lightbulb-icon.png" alt="lightbulb" />
                    </div>
                    <div className="watchlist-name">
                        {list.name}
                    </div>
                </div>
                <div className="watchlist-buttons-container">
                    <div className="watchlist-option-div">
                        <div className="watchlist-button-div">
                            <i className="fas fa-ellipsis-h watchlist-button" onClick={openMenu} />
                        </div>
                        <div ref={dropdownRef} className={showMenu ? `watchlist-drop-options` : `watchlist-drop-options hidden`}>
                            <div className="watchlist-drop-div bold">
                                <OpenModalButton
                                    buttonText="Edit list"
                                    onItemClick={closeMenu}
                                    modalComponent={<WatchlistEditModal id={list.id} name={list.name}/>}
                                    modalClass="watchlist-modal-btn bold"
                                    modalIcon={editIcon}
                                />
                            </div>
                            <div className="watchlist-drop-div bold">
                                <OpenModalButton
                                    buttonText="Delete list"
                                    onItemClick={closeMenu}
                                    modalComponent={<WatchlistDeleteModal id={list.id} name={list.name} stocks={list.stocks}/>}
                                    modalClass="watchlist-modal-btn bold"
                                    modalIcon={deleteIcon}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="watchlist-button-div">
                        <i className="fas fa-chevron-up watchlist-button" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleWatchlist
