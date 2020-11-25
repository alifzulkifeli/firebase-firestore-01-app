import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Home from "./components/index";
import Header from "./components/header";
import Footer from "./components/footer";
import Laptop from "./components/Laptop";
import Login from "./components/user/Login";

const Routes = () => (
	<BrowserRouter>
		<Header />
		<main role="main" className="container">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/laptop" component={Laptop} />
				<Route exact path="/login" component={Login} />
			</Switch>
		</main>
	</BrowserRouter>
);

export default Routes;
