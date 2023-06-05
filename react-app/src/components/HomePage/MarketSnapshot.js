import React from "react";
import { addCommas, getPercentChange} from "../../Utils";

function MarketSnapshot({ priceSP500, priceNasdaq, priceBTC }) {

    // Percent change display -------------------------------------------------------------------------------
    let sp500Percent;
    let sp500Display;

    if (priceSP500 != "error") {
        sp500Percent = getPercentChange(priceSP500)
        sp500Display = (
            <div className={sp500Percent > 0 ? "snapshot-percent positive" : "snapshot-percent negative"}>
                {sp500Percent > 0 ? <i className="fas fa-caret-up" /> : <i className="fas fa-caret-down" />}{sp500Percent}%
            </div>
        )
    }

    let ndaqPercent;
    let ndaqDisplay;

    if (priceNasdaq != "error") {
        ndaqPercent = getPercentChange(priceNasdaq)
        ndaqDisplay = (
            <div className={ndaqPercent > 0 ? "snapshot-percent positive" : "snapshot-percent negative"}>
                {ndaqPercent > 0 ? <i className="fas fa-caret-up" /> : <i className="fas fa-caret-down" />}{ndaqPercent}%
            </div>
        )
    }

    let btcPercent;
    let btcDisplay;

    if (priceBTC != "error") {
        btcPercent = getPercentChange(priceBTC)
        btcDisplay = (
            <div className={btcPercent > 0 ? "snapshot-percent positive" : "snapshot-percent negative"}>
                {btcPercent > 0 ? <i className="fas fa-caret-up" /> : <i className="fas fa-caret-down" />}{btcPercent}%
            </div>
        )
    }

    // Component JSX ------------------------------------------------------------------------------------------
    return (
        <div className="market-snapshot-container">
            <div className="market-snapshot-div">
                <div className="snapshot-ticker bold">
                    SPY
                </div>
                <div className="snapshot-close">
                    ${priceSP500 != "error" ? addCommas(Number(priceSP500.c).toFixed(2)) : "-"}
                </div>
                {sp500Display}
            </div>
            <div className="market-snapshot-div">
                <div className="snapshot-ticker bold">
                    NDAQ
                </div>
                <div className="snapshot-close">
                    ${priceNasdaq != "error" ? addCommas(Number(priceNasdaq.c).toFixed(2)) : "-"}
                </div>
                {ndaqDisplay}
            </div>
            <div className="market-snapshot-div btc-div">
                <div className="snapshot-ticker bold">
                    BTC
                </div>
                <div className="snapshot-close">
                    ${priceBTC != "error" ? addCommas(Number(priceBTC.c).toFixed(2)) : "-"}
                </div>
                {btcDisplay}
            </div>
        </div>
    )
}

export default MarketSnapshot
