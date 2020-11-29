import React, { useState } from "react";
import firebase from "../../utils/firebase";

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
				.then((res) => console.log(res))
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
			getUser.getIdToken().then((res) => {
				console.log(res);
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
		</>
	);
}
