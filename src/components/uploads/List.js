import React, { useState, useEffect } from "react";
import { userRef } from "../../utils/firebase";

export default function List() {
	const [image, setimage] = useState([]);
	const [test, settest] = useState(false);

	const getAll = () => {
		userRef.listAll().then((data) => {
			let imagesArray = [];
			data.items.forEach((element) => {
				element.getDownloadURL().then((url) => {
					imagesArray.push({
						name: element.name,
						link: url,
					});
					console.log(imagesArray);
					setimage(imagesArray);
				});
			});
		});
	};

	const handleDelete = (name) =>
		userRef.child(name).delete(() => {
			console.log("deleted");
			getAll();
		});

	useEffect(() => {
		getAll();
	}, []);

	return (
		<>
			<button onClick={() => settest(!test)}>test</button>
			{image
				? image.map((item, index) => (
						<div>
							<div key={index}>
								{console.log(item.name)}
								{item.name}
								{item.link}
								{JSON.stringify(item)}
							</div>
							<div onClick={() => handleDelete(item.name)}>Delete</div>
						</div>
				  ))
				: null}
		</>
	);
}
