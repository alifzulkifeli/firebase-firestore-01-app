import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Home from './components/index';
import Header from './components/header';
import Footer from './components/footer';
import laptop from './components/laptop';


const Routes = () => (
    <BrowserRouter>
        <Header/>
        <main role="main" className="container">
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/laptop" component={laptop}/>
            </Switch>
        </main>
    </BrowserRouter>
)

export default Routes;