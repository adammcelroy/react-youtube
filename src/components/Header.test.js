import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import SearchBar from './SearchBar';

describe('<App />', () => {
	it('should render without crashing', () => {
		shallow(<Header />);
	});

	it('should render div with class name "header"', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find('div.header')).toHaveLength(1)
	});

	it('should contain link to the homepage', () => {
		const wrapper = shallow(<Header />);
		const props = {to: '/'};
		expect(wrapper.find('Link').find(props)).toHaveLength(1)
	});

	it('should render SearchBar component', () => {
		const wrapper = shallow(<Header />);
		expect(wrapper.find(SearchBar)).toHaveLength(1);
	});

	it('should pass SearchBar component prop of autofocus=true', () => {
		const wrapper = shallow(<Header />);
		const props = {autofocus: true};
		expect(wrapper.find(SearchBar).find(props)).toHaveLength(1);
	});
});
