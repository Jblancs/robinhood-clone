import React from "react";
import { NavLink } from "react-router-dom";


function Watchlists({ watchlists }) {

    let lists = watchlists ? Object.values(watchlists) : []


    return (
        <div>
            <div className="list-header watchlist-header">
                <div className="list-header-text bold">
                    Lists
                </div>
                <div className="add-list-icon">
                    <i className="fas fa-plus" />
                </div>
            </div>
            <div className="watch-list">
                {lists.map(list => (
                    <div key={list.name} className="watchlist-card flex-btwn">
                        <div className="watchlist-name-div ">
                            <div className="watchlist-icon-div">
                                <img className="watchlist-icon" src="./images/lightbulb-icon.png" alt="lightbulb" />
                            </div>
                            <div className="watchlist-name">
                                {list.name}
                            </div>
                        </div>
                        <div className="watchlist-buttons-container">
                            <div className="watchlist-button-div">
                                <i className="fas fa-ellipsis-h watchlist-button" />
                            </div>
                            <div className="watchlist-button-div">
                                <i className="fas fa-chevron-up watchlist-button" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Watchlists
