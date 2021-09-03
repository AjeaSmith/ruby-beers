import React, { useState, useEffect } from 'react';
import { Table, message, Popconfirm } from 'antd';
import AddBeerModal from './AddBeerModal';

const Beers = () => {
	const [beers, setBeers] = useState([]);
	const columns = [
		{
			title: 'Brand',
			dataIndex: 'brand',
			key: 'brand',
		},
		{
			title: 'Style',
			dataIndex: 'style',
			key: 'style',
		},
		{
			title: 'Country',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: '',
			key: 'action',
			render: (_text, record) => (
				<Popconfirm
					title="Are you sure to delete this beer?"
					onConfirm={() => deleteBeer(record.id)}
					okText="Yes"
					cancelText="No"
				>
					<a href="#" type="danger">
						Delete{' '}
					</a>
				</Popconfirm>
			),
		},
	];
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
			message.error(error.message);
		}
	};
	const reloadBeers = () => {
		setBeers([]);
		loadBeers();
	};
	const deleteBeer = (id) => {
		const url = `api/v1/beers/${id}`;
		try {
			fetch(url, { method: 'delete' }).then((data) => {
				if (data.ok) {
					reloadBeers();
					return data.json();
				}
				throw new Error('Network error.');
			});
		} catch (error) {
			message.error(error.message);
		}
	};
	useEffect(() => {
		loadBeers();
	}, []);
	return (
		<>
			<Table
				className="table-striped-rows"
				dataSource={beers}
				columns={columns}
				pagination={{ pageSize: 5 }}
			/>
			<AddBeerModal reloadBeers={reloadBeers} />
		</>
	);
};

export default Beers;
