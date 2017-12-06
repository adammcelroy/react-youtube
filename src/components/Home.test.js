import React from 'react';
import { shallow } from 'enzyme';
import { Home, mapStateToProps } from './Home';
import VideoList from './VideoList';

let component, props;

const createShallow = () => {
	props = {
		videos: [],
		getVideos: () => {},
	};
	component = shallow(<Home {...props} />);
};

describe('<Home />', () => {
	beforeEach(createShallow);

	it('should render without crashing', () => {
		expect(component.length).toBe(1);
	});

	it('should render element with class "home"', () => {
		expect(component.find('.home').length).toBe(1);
	});

	it('should render VideoList component', () => {
		expect(component.find(VideoList).length).toBe(1);
	});

	it('should pass VideoList component prop of videos', () => {
		const thisProps = {videos: props.videos};
		expect(component.find(VideoList).find(thisProps).length).toBe(1);
	});

	it('should map state to props correctly', () => {
		const state = {
			videos: {
				popular: [],
			},
		};
		const thisProps = mapStateToProps(state);
		expect(thisProps.videos).toBeInstanceOf(Array);
		expect(thisProps.videos.length).toBe(0);
	});

	it('should call getVideos on mount', () => {
		const spy = jest.fn();
		component = shallow(<Home {...props} getVideos={spy} />);
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});

	it('should call setPageTitle on mount', () => {
		const spy = jest.spyOn(Home.prototype, 'setPageTitle');
		component = createShallow();
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});
});
