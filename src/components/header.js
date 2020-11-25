import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
				<Link className="navbar-brand" to="/">
					Awesome
				</Link>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/laptop">
								Laptop
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/login">
								Login
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
