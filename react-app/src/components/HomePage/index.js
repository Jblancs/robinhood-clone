import React from "react";
import PortfolioGraph from "./PortfolioGraph";
import './HomePage.css'


function HomePage() {



    return (
        <div className="home-container">
            <div className="home-chart-component" >
                <PortfolioGraph />
            </div>

        </div>
    )
}

export default HomePage
