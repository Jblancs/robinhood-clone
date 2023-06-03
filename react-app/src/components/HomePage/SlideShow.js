import React, { useEffect, useState } from "react";
import "./SlideShow.css"

function SlideShow() {
    const [slide, setSlide] = useState(0)
    const [disableLeft, setDisableLeft] = useState("")
    const [disableRight, setDisableRight] = useState("")

    // slide show information ------------------------------------------------------------------------------------
    let slideShowArray = [
        {
            image: "/images/portfolio-icon.png",
            title: "Welcome to my clone of the website Robinhood!",
            body: 'To find out what features have been implemented, see the next couple slides or feel free to browse around and test on your own.',
            footer: "- Jordan Blancaflor",
        },
        {
            image: "/images/watchlist-icon.png",
            title: "Feature 1: Watchlists",
            body: 'Create custom watchlists on the homepage by clicking on the "+" icon next to Lists on the right side bar. Add/remove stocks from the watchlist at the "/:<ticker>" page',
            footer: "",
        },
        {
            image: "/images/buy-sell-icon.png",
            title: "Feature 2: Buy/Sell Stocks",
            body: 'Buy and sell stocks by navigating to the single stock page "/:<ticker>" using the search bar.',
            footer: "",
        },
        {
            image: "/images/payment-icon.png",
            title: "Feature 3: Bank Accounts and Deposit/Withdraw money",
            body: 'Add a bank account or deposit money by clicking buying power on the home page "/". You can also navigate to "/account/transfers" using the account button in the NavBar.',
            footer: "",
        },
        {
            image: "/images/recurring-slide-icon.png",
            title: "Feature 4: Recurring Investments",
            body: 'Set up a recurring investment by navigating to "/account/recurring" using the account button in the NavBar',
            footer: "",
        }
    ]

    useEffect(() => {
        setDisableLeft(false)
        setDisableRight(false)
        if(slide === 0) setDisableLeft(true)
        if(slide === (slideShowArray.length - 1)) setDisableRight(true)
    })

    // event handler ------------------------------------------------------------------------------------------
    const onClickNextSlide = (side) => {
        if(side === "left") setSlide(slide - 1)
        if(side === "right") setSlide(slide + 1)
    }

    // component JSX ------------------------------------------------------------------------------------------
    return (
        <div className="slideshow-container">
            <div className="slide-card">
                <div className="slide-icon-div">
                    <img className="slide-icon" src={slideShowArray[slide].image} alt="slide icon" />
                </div>
                <div className="slide-card-text-div">
                    <div className="slide-card-body-div">
                        <div className="slide-card-text-title bold">
                            {slideShowArray[slide].title}
                        </div>
                        <div className="slide-card-text-body">
                            {slideShowArray[slide].body}
                        </div>
                    </div>
                    <div className="slide-card-text-footer bold">
                        {slideShowArray[slide].footer}
                    </div>
                </div>
            </div>
            <div className="slideshow-button-container">
                <div className="slideshow-button-div">
                    <button className={!disableLeft ? "slideshow-button" : "slideshow-disable-button"} onClick={() => onClickNextSlide("left")} disabled={disableLeft}>
                        <i className="fas fa-less-than" />
                    </button>
                    <div className="slideshow-page">
                        {slide + 1} of {slideShowArray.length}
                    </div>
                    <button className={!disableRight ? "slideshow-button" : "slideshow-disable-button"} onClick={() => onClickNextSlide("right")} disabled={disableRight}>
                        <i className="fas fa-greater-than" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SlideShow
