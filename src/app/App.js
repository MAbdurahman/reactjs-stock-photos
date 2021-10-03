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
	const [page, setPage] = useState(1);

	//**************** functions ****************//
	const fetchImages = async () => {
		setLoading(true);
		const urlPage = `&page=${page}`;
		const perPage = `&per_page=12`;
		const urlQuery = `&query=${query}`;
		let url;

		if (query) {
			url = `${searchUrl}${clientID}${urlPage}${perPage}${urlQuery}`;
		} else {
			url = `${mainUrl}${clientID}${urlPage}${perPage}`;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();

			setPhotos(oldPhotos => {
				if (query && page === 1) {
					return data.results;

				} else if (query) {
					return [...oldPhotos, ...data.results];

				} else {
					return [...oldPhotos, ...data];
				}

			});
			setLoading(false);

		} catch (error) {
			setLoading(false);
			console.log(error);

		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		setPage(1);
		fetchImages();
	};

	useEffect(() => {
		fetchImages();
		// eslint-disable-next-line
	}, [page]);

	useEffect(() => {
		const event = window.addEventListener('scroll', () => {
			if (
				(!loading && window.innerHeight + window.scrollY) >=
				document.body.scrollHeight
			) {
				setPage(oldPage => {
					return oldPage + 1;
				});
			}
		});

		return () => window.removeEventListener('scroll', event);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
