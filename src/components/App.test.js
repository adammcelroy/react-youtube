import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from './Header';

let component;

describe('<App />', () => {
	beforeEach(() => {
		component = shallow(<App />);
	});

	it('should render without crashing', () => {
		expect(component.length).toBe(1);
	});

	it('should render element with class "app"', () => {
		expect(component.find('.app').length).toBe(1)
	});

	it('should render Header component', () => {
		expect(component.find(Header).length).toBe(1);
	});

	it('should render children', () => {
		const component = shallow(<App><div className="child" /></App>);
		expect(component.find('div.child').length).toBe(1);
	});
});
