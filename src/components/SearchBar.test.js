import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import queryString from 'query-string';
import { SearchBar } from './SearchBar';

const initialProps = {
	autofocus: true,
	history: [],
	location: {search: `?search_query=Example+query`},
};

const createShallow = props => shallow(<SearchBar {...props} />);
const createMounted = props => mount(<SearchBar {...props} />);

describe('<SearchBar />', () => {
	it('should render without crashing', () => {
		const component = createShallow(initialProps);
		expect(component).toHaveLength(1);
	});

	it('should render element with class "search-bar"', () => {
		const component = createShallow(initialProps);
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
		const component = createShallow(initialProps);
		expect(component.find('input')).toHaveLength(1);
	});

	it('should pass the autofocus prop into the input element', () => {
		const component = createShallow(initialProps);
		expect(component.find('input').props().autoFocus).toBe(initialProps.autofocus);
	});

	it('should have a working selectiveEncode function', () => {
		const input = 'Testing & ? = encoding';
		const expected = 'Testing+%26+%3F+%3D+encoding';
		const output = SearchBar.prototype.selectiveEncode(input);

		expect(output).toBe(expected);
	});

	it('should pull a search query fom the location object and populate input', () => {
		const component = createMounted(initialProps);

		const query = queryString.parse(component.props().location.search).search_query;

		expect(component.state().query).toBe(query);
		expect(component.find('input').props().value).toBe(query);
	});

	it('should update state and call getSearchSuggestions on input value change', () => {
		const component = createMounted(initialProps);

		const newQuery = 'New query';
		const spy = jest.spyOn(SearchBar.prototype, 'getSearchSuggestions');

		component.find('input').simulate('change', {target: {value: newQuery}});

		expect(component.state().query).toBe(newQuery);
		expect(spy).toHaveBeenCalledWith(newQuery);

		spy.mockRestore();
	});

	it('should show suggestions on input focus', () => {
		const component = createMounted(initialProps);

		expect(component.state().showSuggestions).toBe(false);

		component.find('input').simulate('focus');

		expect(component.state().showSuggestions).toBe(true);
	});

	it('should hide and clear suggestions on input blur after short delay', () => {
		jest.useFakeTimers();

		const component = createMounted(initialProps);

		component.setState({
			suggestions: ['Some suggestion'],
			showSuggestions: true,
		});

		component.find('input').simulate('blur');

		setTimeout(() => {
			expect(component.state().showSuggestions).toBe(false);
			expect(component.state().suggestions).toHaveLength(0);
		}, 300);

		jest.runAllTimers();
	});

	it('should make search on form submit', () => {
		const component = createMounted(initialProps);

		const event = {preventDefault(){}};
		const spySearch = jest.spyOn(SearchBar.prototype, 'search');
		const spyPreventDefault = jest.spyOn(event, 'preventDefault');

		component.find('form').prop('onSubmit')(event);

		expect(spyPreventDefault).toHaveBeenCalled();
		expect(spySearch).toHaveBeenCalledWith('Example query');

		spySearch.mockRestore();
		spyPreventDefault.mockRestore();
	});

	it('should fetch suggestions from the API and update state on return', async () => {
		const component = createShallow(initialProps);

		const suggestions = await component.instance().getSearchSuggestions('Query');

		expect(suggestions.length).toBeGreaterThan(0);
		expect(component.state().suggestions).toEqual(suggestions);
	});

	it('should show suggestions area to the user when criteria met', () => {
		const component = createMounted(initialProps);

		component.setState({showSuggestions: false, suggestions: []});
		expect(component.find('.search-bar__suggestions')).toHaveLength(0);

		component.setState({showSuggestions: true, suggestions: []});
		expect(component.find('.search-bar__suggestions')).toHaveLength(0);

		component.setState({showSuggestions: false, suggestions: ['Suggestion 1', 'Suggestion 2']});
		expect(component.find('.search-bar__suggestions')).toHaveLength(0);

		component.setState({showSuggestions: true, suggestions: ['Suggestion 1', 'Suggestion 2']});
		expect(component.find('.search-bar__suggestions')).toHaveLength(1);
	});

	it('should search for suggestion when clicked and set state', () => {
		const component = createMounted(initialProps);
		const spy = jest.spyOn(SearchBar.prototype, 'search');

		component.setState({
			query: 'Suggestion',
			showSuggestions: true,
			suggestions: ['Suggestion 1', 'Suggestion 2'],
		});

		const suggestion = component.find('.search-bar__suggestion').first();

		suggestion.simulate('click');

		expect(component.state().query).toBe(suggestion.text());
		expect(spy).toHaveBeenCalled();
	});

	it('should show each suggestion to the user', () => {
		const component = createMounted(initialProps);

		component.setState({
			showSuggestions: true,
			suggestions: ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'],
		});

		expect(component.find('.search-bar__suggestion')).toHaveLength(3);
	});

	it('should navigate to the search page on search', () => {
		const component = createMounted(initialProps);

		component.setProps({...initialProps, history: []});

		component.instance().search('Query');

		expect(component.props().history[0]).toEqual({
			pathname: '/results',
			search: '?search_query=Query'
		});
	});
});
