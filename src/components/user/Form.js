import React, { useState } from "react";
import firebase, { usersCollection } from "../../utils/firebase";

export default function Form() {
	const [register, setRegister] = useState(false);
	const [user, setUser] = useState({ email: "", password: "" });

	const handleForm = (e) => {
		e.preventDefault();

		const { email, password } = user;
		if (register) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((res) => {
					storeUserToDB(res);
					res.user.sendEmailVerification().then(console.log("mail sent"));
				})
				.catch((err) => console.log(err));
		} else {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	};

	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("user log out");
			});
	};

	const handleAsk = () => {
		let getUser = firebase.auth().currentUser;
		if (getUser) {
			getUser.getIdTokenResult().then((res) => {
				console.log(res);
			});
		}
	};

	const googleWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((res) => {
				storeUserToDB(res);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const UpdateProfile = () => {
		let getUser = firebase.auth().currentUser;
		getUser
			.updateProfile({
				displayName: "steve",
				photoURL: "https://image.jpg",
			})
			.then(() => {
				console.log(getUser);
			});
	};

	const storeUserToDB = (data) => {
		usersCollection
			.doc(data.user.uid)
			.set({
				email: data.user.email,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const UpdateEmail = () => {
		let getUser = firebase.auth().currentUser;
		let credential = firebase.auth.EmailAuthProvider.credential(
			"new@gmail.com",
			"test123"
		);
		if (getUser) {
			getUser.reauthenticateWithCredential(credential).then((res) => {
				getUser.updateEmail("aliff@gmail.com");
			});
		}
	};

	const changeHandler = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		setUser({ ...user, [name]: value });
	};

	return (
		<>
			<form onSubmit={handleForm}>
				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						name="email"
						onChange={changeHandler}
					></input>
				</div>

				<div className="form-group">
					<label>Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						onChange={changeHandler}
					></input>
				</div>

				<button type="submit" className="btn btn-primary">
					{register ? "Register" : "Sign in"}
				</button>
			</form>
			<hr />
			<button onClick={handleLogout}>Logout</button>
			<hr />
			<button onClick={handleAsk}>Ask user</button>
			<hr />
			<button onClick={UpdateEmail}>Handle Update Email</button>
			<hr />
			<button onClick={UpdateProfile}>Handle Update Profile</button>
			<hr />
			<button onClick={googleWithGoogle}>Sign In with google</button>
		</>
	);
}
