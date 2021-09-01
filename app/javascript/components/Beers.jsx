import React, { useState, useEffect } from 'react';

const Beers = () => {
	const [beers, setBeers] = useState([]);
	useEffect(() => {
		const loadBeers = async () => {
			try {
				// API routes within routes.rb file
				const url = '/api/v1/beers/index';

				const response = await fetch(url);
				const result = await response.json();
				result.forEach((beer) => {
					const beerObj = {
						key: beer.id,
						id: beer.id,
						brand: beer.brand,
						style: beer.style,
						country: beer.country,
						quantity: beer.quantity,
					};
					setBeers((prevState) => [...prevState, beerObj]);
				});
			} catch (error) {
				console.error(error.message);
			}
		};
		loadBeers();
	}, []);

	return <div>hello world</div>;
};

export default Beers;
