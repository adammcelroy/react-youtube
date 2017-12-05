import React from 'react';
import { shallow, mount } from 'enzyme';
import queryString from 'query-string';
import { Search, mapStateToProps } from './Search';

const initialProps = {
	videos: [],
	getVideos: (config) => {},
	location: {search: `?search_query=Query`},
};

const createShallow = props => shallow(<Search {...props} />);
const createMounted = props => mount(<Search {...props} />);

describe('<Search />', () => {
	it('should render without crashing', () => {
		const component = createShallow(initialProps);
		expect(component).toHaveLength(1);
	});

	it('should render element with class "search"', () => {
		const component = createShallow(initialProps);
		expect(component.find('.search')).toHaveLength(1);
	});

	it('should pull a search query fom the location object and perform search', () => {
		const spy = jest.spyOn(initialProps, 'getVideos');
		const component = createMounted(initialProps);
		const query = queryString.parse(component.props().location.search).search_query;

		expect(component.state().query).toBe(query);
		expect(spy).toHaveBeenCalledWith({type: 'search', query});

		spy.mockRestore();
	});

	it('should have working endless scroll', () => {
		const spy = jest.spyOn(initialProps, 'getVideos');
		const component = createMounted(initialProps);

		component.setProps({nextPageToken: 'Example token'});

		component.setState({query: 'Some query'}, () => {
			component.find('InfiniteScroll').props().loadMore(2);

			expect(spy).toHaveBeenLastCalledWith({
				type: 'search',
				query: 'Some query',
				next: 'Example token',
			});

			spy.mockRestore();
		});
	});

	it('should map state to props correctly', () => {
		const state = {
			videos: {
				search: [{}],
				current: {
					nextPageToken: 'Example token',
					totalResults: 1,
				},
			},
		};
		const thisProps = mapStateToProps(state);

		expect(thisProps.videos).toBeInstanceOf(Array);
		expect(thisProps.videos).toHaveLength(1);
		expect(thisProps.totalResults).toBe(1);
		expect(thisProps.nextPageToken).toBe('Example token');
	});
});
