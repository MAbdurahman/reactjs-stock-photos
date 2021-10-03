import React, { useState, useEffect } from 'react';
import Logo from './../img/logo.svg';
import { FaSearch } from 'react-icons/fa';
import Photo from './../components/Photo';

export default function App() {
	//**************** variables ****************//

	const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
	const mainUrl = `https://api.unsplash.com/photos/`;
	const searchUrl = `https://api.unsplash.com/search/photos/`;

	const [loading, setLoading] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [query, setQuery] = useState('');

	//**************** functions ****************//
	const fetchImages = async () => {
		setLoading(true);
		let url;
		url = `${mainUrl}${clientID}`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			setPhotos(data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		console.log('handle submit');
	};

	useEffect(() => {
		fetchImages();
	}, []);

	return (
		<main className='app'>
			<header className='app-header'>
				<img src={Logo} className='app-logo' alt='logo' />
				<h3>ReactJS Stock Photos</h3>
				<form className='search-form'>
					<input
						type='text'
						placeholder='search'
						value={query}
						onChange={e => setQuery(e.target.value)}
						className='form-input'
					/>
					<button
						type='submit'
						className='submit-btn'
						onClick={handleSubmit}
					>
						<FaSearch />
					</button>
				</form>
			</header>
			{/* <section className='search'></section> */}
			<section className='photos'>
				<div className='photos-center'>
					{photos.map((image, index) => {
						return <Photo key={image.id} {...image} />;
					})}
				</div>
				{loading && <h2 className='loading'>Loading...</h2>}
			</section>
		</main>
	);
}
