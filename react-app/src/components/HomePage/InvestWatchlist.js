import React from "react";

function InvestWatchlist({ investments }) {
    let investmentsList = Object.values(investments)

    return (
        <div className="inv-watch-div">
            <div className="inv-watch-container">
                <div className="inv-container">
                    <div className="list-header">
                        <div className="list-header-text bold">
                            Stock
                        </div>
                    </div>
                    <div className="inv-list">
                        {investmentsList.map(inv => (
                            <div key={inv.ticker} className="inv-card">
                                <div className="inv-tick-share">
                                    <div className="stock-ticker bold">
                                        {inv.ticker}
                                    </div>
                                    <div>
                                        {inv.shares} Share(s)
                                    </div>
                                </div>
                                <div className="inv-chart-pic">
                                    <img className="graph-img-placeholder" src='/images/graph-image.png' alt="graph" />
                                </div>
                                <div className="inv-price-change">
                                    <div>
                                        {Number(inv.price_per_share).toFixed(2)}
                                    </div>
                                    <div>
                                        +5.21%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="watch-container">
                    <div className="list-header">
                        <div className="list-header-text bold">
                            Lists
                        </div>
                        <div className="add-list-icon bold">
                            +
                        </div>
                    </div>
                    <div className="watch-list">
                        Map Watchlists
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvestWatchlist
