import React, { useState, useEffect } from "react";
import { userRef } from "../../utils/firebase";

export default function List() {
	const [image, setimage] = useState([]);

	const makeArr = () => {
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
	useEffect(() => {
		makeArr();
	}, []);

	return (
		<>
			{image
				? image.map((item, index) => (
						<div>
							{console.log(item.name)}
							{item.name}
							{item.link}
							{JSON.stringify(item)}
						</div>
				  ))
				: null}
		</>
	);
}
