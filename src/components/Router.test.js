import React from 'react';
import { shallow } from 'enzyme';
import { Route, Redirect } from 'react-router-dom';
import Router from './Router';
import Home from './Home';
import Search from './Search';
import Video from './Video';

let component;

describe('<Router />', () => {
	beforeEach(() => {
		component = shallow(<Router />);
	});

	it('should render without crashing', () => {
		expect(component.length).toBe(1);
	});

	it('should match all routes to components', () => {
		const paths = component.find(Route).reduce((paths, route) => {
			paths[route.props().path] = route.props().component;
			return paths;
		}, {});

		expect(paths['/']).toBe(Home);
		expect(paths['/results']).toBe(Search);
		expect(paths['/watch']).toBe(Video);
	});

	it('should use strict and exact matches only', () => {
		const routes = component.find(Route);
		let usesStrictExact = true;

		routes.forEach((route) => {
			if (!route.props().strict || !route.props().exact) {
				usesStrictExact = false;
			}
		});

		expect(usesStrictExact).toBe(true);
	});

	it('should redirect unmatched requests to the homepage', () => {
		const redirect = component.find(Redirect);

		expect(redirect.length).toBe(1);
		expect(redirect.props().to).toBe('/');
	});
});
