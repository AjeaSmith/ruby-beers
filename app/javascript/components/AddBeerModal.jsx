import React, { useState, useRef } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';

const { Option } = Select;
const AddBeerModal = ({ reloadBeers }) => {
	const [isVisible, setIsVisible] = useState(false);
	const formRef = useRef(null);
	const showModal = () => {
		setIsVisible(true);
	};

	const handleCancel = () => {
		setIsVisible(false);
	};
	const addBeer = async (values) => {
		const url = 'api/v1/beers/create';
		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
			.then((data) => {
				if (data.ok) {
					handleCancel();

					return data.json();
				}
				throw new Error('Network error.');
			})
			.then(() => {
				reloadBeers();
			})
			.catch((err) => console.error('Error: ' + err));
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Create New +
			</Button>
			<Modal
				title="Add New Beer ..."
				visible={isVisible}
				onCancel={handleCancel}
				footer={null}
			>
				<Form ref={formRef} layout="vertical" onFinish={addBeer}>
					<Form.Item
						name="brand"
						label="Brand"
						rules={[
							{
								required: true,
								message: 'Please add your beer brand!',
							},
						]}
					>
						<Input placeholder="Input your beer brand" />
					</Form.Item>

					<Form.Item
						name="style"
						label="Style"
						rules={[
							{
								required: true,
								message: 'Please add your beer style!',
							},
						]}
					>
						<Input placeholder="Input your beer style" />
					</Form.Item>

					<Form.Item
						name="country"
						label="Country"
						rules={[
							{
								required: true,
								message: 'Please add the country of the beer!',
							},
						]}
					>
						<Select
							showSearch
							placeholder="Select your beer country"
							optionFilterProp="children"
							style={{ width: '100%' }}
						>
							<Option value="Finland">Finland</Option>
							<Option value="Germany">Germany</Option>
							<Option value="Netherlands">Netherlands</Option>
							<Option value="UK">UK</Option>
							<Option value="USA">USA</Option>
							<Option value="Other">Other</Option>
						</Select>
					</Form.Item>

					<Form.Item
						name="quantity"
						label="Quantity"
						rules={[
							{ required: true, message: 'Please input the quantity!' },
						]}
					>
						<Input
							type="number"
							placeholder="How many beers you desire?"
						/>
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default AddBeerModal;
