import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Home from "./components/index";
import Header from "./components/header";
// import Footer from "./components/footer";
import Login from "./components/user/Login";
import Upload from "./components/uploads/Uploads";
import Laptop from './components/laptop';

const Routes = () => (
	<BrowserRouter>
		<Header />
		<main role="main" className="container">
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/laptop" component={Laptop} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/upload" component={Upload} />
			</Switch>
		</main>
	</BrowserRouter>
);

export default Routes;
