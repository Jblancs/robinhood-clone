import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { createWatchlists } from "../../store/watchlist";
import OpenModalButton from "../OpenModalButton";
import WatchlistEditModal from "../WatchlistModal/WatchlistEditModal";
import WatchlistDeleteModal from "../WatchlistModal/WatchlistDeleteModal";
import InvestmentCard from "./InvestmentCard";


function SingleWatchlist({ list }) {
    const dropdownRef = useRef();
    let [showMenu, setShowMenu] = useState(false)
    let [showStocks, setShowStocks] = useState(false)
    let [rotate, setRotate] = useState(false)

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

    const onClickWatch = () => {
        setShowStocks(!showStocks)
        setRotate(!rotate)
    }

    const closeMenu = () => setShowMenu(false);
    // Modal Icons ------------------------------------------------------------------------------------------------------------
    const editIcon = (<i className="fas fa-cog watchlist-drop-icon" />)
    const deleteIcon = (<i className="far fa-times-circle watchlist-drop-icon" />)

    // Stocks Display ------------------------------------------------------------------------------------------------------------
    let stockDisplay;
    let stockList = list.stocks

    if(stockList.length) {
        stockDisplay = (
            stockList.map(ticker => (
                <NavLink key={`${ticker}${list.id}`} to={`/stocks/${ticker}`} style={{ textDecoration: 'none', color: "black" }}>
                <InvestmentCard inv={null} ticker={ticker} />
                </NavLink>
            ))
        )
    }

    // Component JSX ------------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className="watchlist-card flex-btwn" onClick={onClickWatch}>
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
                        <i className={!rotate ? "fas fa-chevron-up watchlist-button" : "fas fa-chevron-up watchlist-button icon-rotate" } />
                    </div>
                </div>
            </div>
            {showStocks ? stockDisplay : ""}
        </>
    )
}

export default SingleWatchlist
