import React from 'react';
import Logo from './../img/logo.svg';

export default function App() {
  return (
		<main className='app'>
			<header className='app-header'>
				<img src={Logo} className='app-logo' alt='logo' />
				<h1>ReactJS Stock Photos</h1>
			</header>
		</main>
  );
}
