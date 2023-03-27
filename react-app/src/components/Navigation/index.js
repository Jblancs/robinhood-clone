import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-container'>
			<div className='nav-logo-search-container'>
				<div className='nav-logo navhover'>
					<NavLink exact to="/" style={{ textDecoration: "none" }}>
						<img className="nav-logo-image" src='/images/robinhood-emblem.png' alt="logo" style={{ color: "black" }} />
					</NavLink>
				</div>
				<div className='nav-search'>
					<i className="fas fa-search" />
					<input className="nav-search-bar" type="search" placeholder='Search feature coming soon' readOnly />
				</div>
			</div>
			<div className='nav-button-container'>
				<div className='nav-investing bold navhover'>
					<NavLink exact to="/" style={{ textDecoration: "none", color: "black" }}>Investing</NavLink>
				</div>
				<div className='nav-notif bold navhover'>
					<div className='nav-investing bold navhover'>Notifications</div>
				</div>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
