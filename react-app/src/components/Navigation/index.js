import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { stocksSearch } from './SearchObject';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
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

	return (
		<div className='nav-container'>
			{sessionUser ? (
				<>
					<div className='nav-logo-search-container'>
						<div className='nav-logo navhover'>
							<NavLink exact to="/" style={{ textDecoration: "none" }}>
								<img className="nav-logo-image" src='/images/robinhood-emblem.png' alt="logo" style={{ color: "black" }} />
							</NavLink>
						</div>
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
						<div className='nav-button-container'>
							<div className={sessionUser ? 'nav-investing bold navhover' : 'nav-investing bold navhover not-allowed'}>
								<NavLink exact to="/" style={{ textDecoration: "none", color: "black" }}>Investing</NavLink>
							</div>
							<div className='nav-notif bold navhover'>
								<div className='nav-investing bold' onClick={() => window.open("https://github.com/Jblancs")}>
									Github
								</div>
							</div>
							<div className='nav-notif bold navhover'>
								<div className='nav-investing bold' onClick={() => window.open("https://www.linkedin.com/in/jordan-blancaflor/")}>
									LinkedIn
								</div>
							</div>
							{isLoaded && (
								<div>
									<ProfileButton user={sessionUser} />
								</div>
							)}
						</div>
					</div>
				</>
			) : ""}
		</div>
	);
}

export default Navigation;
