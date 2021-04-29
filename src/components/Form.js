import React, { useState } from "react";
import { laptopCollection, firebaseTimestamp } from "../utils/firebase";

export default function Form() {
	const [data, setData] = useState({});

	const handleForm = (e) => {
		e.preventDefault();

		//UPDATE

		laptopCollection.doc("7wLBXKbrlRCBB8rUQ2gA").update({
			key: "value",
		});

		//ADD to db
		laptopCollection
			.add({
				...data,
				storage: parseInt(data.storage),
				createdAt: firebaseTimestamp(),
			})
			.then((data) => {
				console.log(data);
			})
			.catch((e) => {
				console.log(e);
			});

		// laptopCollection.doc('name of id you wanna set').set({
		//   ...data,
		//   storage: parseInt(data.storage),
		//   createdAt: firebaseTimestamp()
		// })
	};

	const changeHandler = (e) => {
		const nam = e.target.name;
		const val = e.target.value;
		setData({ ...data, [nam]: val });
		console.log(data);

		// let name = e.target.name;
		// let value = e.target.value;
		// console.log(value);
		// setData({[name]: value})
		// console.log(data);
	};

	return (
		<>
			<form onSubmit={handleForm}>
				<div className="form-group">
					<label>Brand</label>
					<input
						type="text"
						className="form-control"
						name="brand"
						onChange={changeHandler}
					></input>
				</div>

				<div className="form-group">
					<label>Color</label>
					<input
						type="text"
						className="form-control"
						name="color"
						onChange={changeHandler}
					></input>
				</div>

				<div className="form-group">
					<label>Storage</label>
					<input
						type="text"
						className="form-control"
						name="storage"
						onChange={changeHandler}
					></input>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				
			</form>
			<hr />
		</>
	);
}
