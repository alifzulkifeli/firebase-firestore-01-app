import React, { useState, useEffect } from "react";
import { userRef } from "../../utils/firebase";

export default function List() {
	const [image, setimage] = useState([]);

	useEffect(() => {
		userRef.listAll().then((data) => {
			let imagesArray = [];
			data.items.forEach((element) => {
				element.getDownloadURL().then((url) => {
					imagesArray.push({
						name: element.name,
						link: url,
					});
					setimage(imagesArray);
					console.log(imagesArray);
				});
			});
		});
	}, []);

	return (
		<>
			{image
				? image.map((item) => (
						<div>
							{console.log(item)}
							{item.name}
							{item.link}
						</div>
				  ))
				: null}
		</>
	);
}
