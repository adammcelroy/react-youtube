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
		expect(component).toHaveLength(1);
	});

	it('should render element with class "app"', () => {
		expect(component.find('.app')).toHaveLength(1)
	});

	it('should render Header component', () => {
		expect(component.find(Header)).toHaveLength(1);
	});

	it('should render children', () => {
		const component = shallow(<App><div className="child" /></App>);
		expect(component.find('div.child')).toHaveLength(1);
	});
});
