import React, { useState } from 'react';
import { stocksSearch } from './SearchObject';
import { useHistory } from 'react-router-dom';
import "./SearchComponent.css"

function SearchComponent({type}) {
    const history = useHistory()
    const [value, setValue] = useState('')

    const onChangeHandler = (e) => {
        setValue(e.target.value)
    }

    const onClickhHandler = (company, ticker) => {
        history.push(`/stocks/${ticker}`)
        setValue("")
    }


    const filterData = (data) => {
        const filteredData = data.filter(item => {
            const searchInfo = value.toLowerCase()
            const companyName = item.company.toLowerCase()
            return searchInfo && companyName.startsWith(searchInfo) && companyName !== searchInfo
        })

        const resultList = filteredData.slice(0, 6)
        return resultList
    }

    // Event Handlers -------------------------------------------------------------------------------------
    let formDisplay;

    // Component JSX --------------------------------------------------------------------------------------
    return (
        <div className='nav-search-container'>
            <div className='nav-search'>
                <div className='nav-search-bar-div'>
                    <i className="fas fa-search" />
                    <input className="nav-search-bar" type="text" onChange={onChangeHandler} value={value} placeholder='Search' />
                </div>
                <div className={value ? 'search-dropdown' : "hidden"}>
                    {filterData(stocksSearch).map(item => (
                        <div key={item.company} className='search-results' onClick={() => onClickhHandler(item.company, item.ticker)}>
                            <div className='search-ticker'>{item.ticker}</div>
                            <div className='search-divider'></div>
                            <div>{item.company}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchComponent
