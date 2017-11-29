import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Header from './Header';

describe('<App />', () => {
	it('should render without crashing', () => {
		shallow(<App />);
	});

	it('should render div with class name "app"', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find('div.app')).toHaveLength(1)
	});

	it('should render Header component', () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find(Header)).toHaveLength(1);
	});

	it('should render children', () => {
		const wrapper = shallow(<App><div className="child" /></App>);
		expect(wrapper.find('div.child')).toHaveLength(1);
	});
});
