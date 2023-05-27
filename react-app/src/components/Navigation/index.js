import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchComponent from '../SearchComponent/SearchComponent';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);


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
						<SearchComponent type="nav" />
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
