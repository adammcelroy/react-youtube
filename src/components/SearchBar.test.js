import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import queryString from 'query-string';
import { SearchBar } from './SearchBar';

let component;

const initialProps = {
	autofocus: true,
	location: {
		search: `?search_query=Example`,
	},
};

const createShallow = props => shallow(<SearchBar {...props} />);
const createMount = props => mount(<SearchBar {...props} />);

describe('<SearchBar />', () => {
	beforeEach(() => {
		component = createShallow(initialProps);
	});

	it('should render without crashing', () => {
		expect(component).toHaveLength(1);
	});

	it('should render element with class "search-bar"', () => {
		expect(component.find('.search-bar')).toHaveLength(1);
	});

	it('should have expected propTypes', () => {
		expect(SearchBar.propTypes).toMatchObject({
			autofocus: PropTypes.bool,
		});
	});

	it('should have expected defaultProps', () => {
		expect(SearchBar.defaultProps).toMatchObject({
			autofocus: false,
		});
	});

	it('should have an element with type "search"', () => {
		expect(component.find('[type="search"]')).toHaveLength(1);
	});

	it('should pull a search query fom the location object and populate input', () => {
		component = createMount(initialProps);

		const query = queryString.parse(component.props().location.search).search_query;

		expect(component.state().query).toBe(query);
		expect(component.find('[type="search"]').props().value).toBe(query);
	});

	it('should update state and call getSearchSuggestions on input value change', () => {
		component = createMount(initialProps);

		const newQuery = 'New query';
		const spy = jest.spyOn(SearchBar.prototype, 'getSearchSuggestions');

		component.find('[type="search"]').simulate('change', {target: {value: newQuery}});

		expect(component.state().query).toBe(newQuery);
		expect(spy).toHaveBeenCalledWith(newQuery);

		spy.mockReset();
		spy.mockRestore();
	});

	it('should show suggestions on input focus', () => {
		component = createMount(initialProps);

		expect(component.state().showSuggestions).toBe(false);

		component.find('[type="search"]').simulate('focus');

		expect(component.state().showSuggestions).toBe(true);
	});

	it('should hide and clear suggestions on input blur after short delay', () => {
		jest.useFakeTimers();

		component = createMount(initialProps);

		component.setState({
			suggestions: ['Some suggestion'],
			showSuggestions: true,
		});

		component.find('[type="search"]').simulate('blur');

		setTimeout(() => {
			expect(component.state().showSuggestions).toBe(false);
			expect(component.state().suggestions).toHaveLength(0);
		}, 300);

		jest.runAllTimers();
	});
});
