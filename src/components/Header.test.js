import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import SearchBar from './SearchBar';

let component;

describe('<Header />', () => {
	beforeEach(() => {
		component = shallow(<Header />);
	});

	it('should render without crashing', () => {
		expect(component.length).toBe(1);
	});

	it('should render element with class "header"', () => {
		expect(component.find('.header').length).toBe(1)
	});

	it('should contain link to the homepage', () => {
		const props = {to: '/'};
		expect(component.find('Link').find(props).length).toBe(1)
	});

	it('should render SearchBar component', () => {
		expect(component.find(SearchBar).length).toBe(1);
	});

	it('should pass SearchBar component prop of autofocus=true', () => {
		const props = {autofocus: true};
		expect(component.find(SearchBar).find(props).length).toBe(1);
	});
});
