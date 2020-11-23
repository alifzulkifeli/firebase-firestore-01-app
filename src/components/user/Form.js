import React, { useState } from "react";

export default function Form() {
	const [register, setRegister] = useState(true);
	const [user, setUser] = useState({ email: "", password: "" });

	handleForm = (e) => {
		e.preventDefault();
		if (register) {
			console.log(register);
		} else {
			console.log(register);
		}
	};

	changeHandler = (e) => {
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
					{this.state.register ? "Register" : "Sign in"}
				</button>
			</form>
		</>
	);
}
