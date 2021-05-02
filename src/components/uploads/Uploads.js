import React, { useState } from "react";
import { storageRef, userRef,storage } from "../../utils/firebase";
import List from './List';
import  firebase  from 'firebase/app';


export default function Upload() {
	const [image, setImage] = useState(null);
	const [url, setUrl] = useState("");
	const [progress, setProgress] = useState(0);

	const handleUpload = (e) => {
		e.preventDefault();

		const user = firebase.auth().currentUser
		const uploadTask = storage.ref(`users/${user.uid}/${image.name}`).put(image);

		uploadTask.on(
			"state_changes",
			(snapshot) => {
				const inprogress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(inprogress);
				

				switch (snapshot.state) {
					case snapshot.state:
						console.log(snapshot.state);
						break;
					default:
						console.log(snapshot.state);
				}
			},
			(err) => {
				console.log(err);
			},
			() => {
				console.log(uploadTask.snapshot.ref);
				console.log(uploadTask.snapshot.ref.bucket);
				console.log(uploadTask.snapshot.ref.fullPath);

				uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
					console.log(`file available at ${downloadUrl}`);
					setUrl(downloadUrl);
				});
			}
		);
	};

	const handleChange = (event) => {
		if (event.target.files[0]) {
			const images = event.target.files[0];
			setImage(images);
		}
	};

	return (
		<>
			<form onSubmit={handleUpload}>
				<div className="form-group">
					<progress value={progress} max="100" />
					<label>File</label>
					<input className="form-control" type="file" onChange={handleChange} />
				</div>
				<button type="submit" className="btn btn-primary">
					Upload file
				</button>
			</form>
			{/* <img src={url} alt=""/> */}
			<hr/>
			<List/>

		</>
	);
}
