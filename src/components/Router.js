import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import App from './App';
import Home from './Home';
import Search from './Search';
import Video from './Video';

export default () => {
	return (
		<Router>
			<App>
				<Switch>
					<Route exact strict path="/" component={Home} />
					<Route exact strict path="/results" component={Search} />
					<Route exact strict path="/watch" component={Video} />
					<Redirect to="/" />
				</Switch>
			</App>
		</Router>
	);
};
