import React, { useState, useEffect } from 'react';
import Logo from './../img/logo.svg';
import Photo from './../components/Photo';

export default function App() {
	require('dotenv').config();
	//**************** variables ****************//
	const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
	const mainUrl = `https://api.unsplash.com/photos/`;
	const searchUrl = `https://api.unsplash.com/search/photos/`;

	//**************** functions ****************//

	return (
		<main className='app'>
			<header className='app-header'>
				<img src={Logo} className='app-logo' alt='logo' />
				<h1>ReactJS Stock Photos</h1>
			</header>
		</main>
	);
}
