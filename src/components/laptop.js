import React, { useEffect, useState } from "react";
import { loopdata } from "../utils/tools";
import { laptopCollection, subCollection } from "../utils/firebase";
import Form from "./Form";

export default function Laptop() {
	const [laptop, setLaptop] = useState(null);

	const getAllLaptop = () => {
		laptopCollection
			// .where('storage','>',128)
			// .where('storage','<',2048)
			.orderBy("storage")
			.limit(10)
			// .startAt()
			// .endAt()
			.get()

			.then((snapshot) => {
				if (snapshot.exist) {
					const laptopdata = loopdata(snapshot);
					setLaptop(laptopdata);
					console.log(laptopdata);
				}
			});
	};

	useEffect(() => {
		getAllLaptop();

		setTimeout(() => {
			laptopCollection.doc("7wLBXKbrlRCBB8rUQ2gA").update({
				storage: 340,
			});
		}, 3000);
		//GET doc by id
		//  laptopCollection.doc('OgTvvOf77y7FSzk2j5k0').get().then(snapshot => {
		//    console.table(snapshot.data());
		//  })
	}, []);

	return (
		<div>
			<Form />
			{laptop && laptop[0].id}
			{laptop && JSON.stringify(laptop[0])}
		</div>
	);
}

laptopCollection.onSnapshot((querySnapshot) => {
	console.log(querySnapshot.docChanges());
});
// ssdCollection.get().then(
//   snapshot => {
//     console.log(snapshot.data());
//   }
// )

// subCollection.get().then(
//   snapshot => {
//     const admin = loopdata(snapshot)
//     console.log(admin);
//   }
// )
