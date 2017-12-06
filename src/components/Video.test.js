import React from 'react';
import { shallow, mount } from 'enzyme';
import queryString from 'query-string';
import { Video, mapStateToProps } from './Video';
import { formatNumber } from '../utilities';

const initialProps = {
	location: {search: `?v=id`},
	video: {
		channel: {
			id: 'Example channel id',
			name: 'Example channel name',
		},
		createdAt: '2017-12-05T18:00:03.000Z',
		description: 'Example description 1',
		dilikes: '5',
		duration: '17:28',
		id: 'id',
		likes: '5',
		thumbnail: 'https://i.ytimg.com/example1.jpg',
		title: 'Example title 1',
		views: '123456',
		comments: [{}, {}],
		commentCount: 2,
		related: [{}, {}],
	},
	channel: {
		id: 'Example channel id',
		name: 'Example channel name',
		description: 'Example channel description',
		createdAt: '2017-11-05T18:00:03.000Z',
		country: 'Example channel country',
		viewCount: '123456',
		videoCount: '123',
		commentCount: '1234',
		subscriberCount: '12345',
		avatar: 'https://i.ytimg.com/avatar1.jpg',
	},
	getVideo: () => new Promise(resolve => resolve()),
	getVideos: () => new Promise(resolve => resolve()),
	getChannel: () => new Promise(resolve => resolve()),
	getComments: () => new Promise(resolve => resolve()),
};

let component;

const createShallow = props => shallow(<Video {...props} />);
const createMounted = props => mount(<Video {...props} />);

describe('<Video />', () => {
	beforeEach(() => {
		component = createShallow(initialProps);
	});

	it('should render without crashing', () => {
		expect(component.length).toBe(1);
	});

	it('should render element with class "video"', () => {
		expect(component.find('.video').length).toBe(1);
	});

	it('should pull a video id fom the location object set state', () => {
		component = createMounted({
			...initialProps,
			video: {
				...initialProps.video,
				comments: null,
				related: null,
			},
		});

		const id = queryString.parse(component.props().location.search).v;

		expect(component.state().id).toBe(id);
	});

	it('should run all necessary actions to get data', () => {
		const spyGetVideo = jest.spyOn(initialProps, 'getVideo');
		const spyGetVideos = jest.spyOn(initialProps, 'getVideos');
		const spyGetComments = jest.spyOn(initialProps, 'getComments');
		const spyGetChannel = jest.spyOn(initialProps, 'getChannel');

		component = createMounted({
			...initialProps,
			video: {
				...initialProps.video,
				comments: null,
				related: null,
			},
		});

		expect(spyGetVideo).toHaveBeenCalledWith(initialProps.video.id);

		spyGetVideo().then(() => {
			expect(spyGetVideos).toHaveBeenCalledWith({
				type: 'related',
				videoId: initialProps.video.id,
			});
			expect(spyGetComments).toHaveBeenCalledWith(initialProps.video.id);
			expect(spyGetChannel).toHaveBeenCalledWith(initialProps.video.channel.id);
		});

		spyGetVideo.mockRestore();
		spyGetVideos.mockRestore();
		spyGetComments.mockRestore();
		spyGetChannel.mockRestore();
	});

	it('should render the VideoPlayer component', () => {
		expect(component.find('VideoPlayer').length).toBe(1);
	});

	it('should pass the VideoPlayer component the video id', () => {
		expect(component.find('VideoPlayer').props().id).toBe(initialProps.video.id);
	});

	it('should show title', () => {
		const title = component.find('.video__title');

		expect(title.length).toBe(1);
		expect(title.text()).toBe(initialProps.video.title);
	});

	it('should show description only if provided', () => {
		let description = component.find('.video__description');

		expect(description.length).toBe(1);
		expect(description.find('Truncate').props().children).toBe(initialProps.video.description);

		component.setProps({video: {...initialProps.video, description: null}});

		description = component.find('.video__description');

		expect(description.length).toBe(0);
	});

	it('should show views stat only if provided', () => {
		let views = component.find('.video__views');
		const expected = `${formatNumber(initialProps.video.views)} views`;

		expect(views.length).toBe(1);
		expect(views.text()).toBe(expected);
	});

	it('should show created date', () => {
		let date = component.find('.video__created-date');

		expect(date.length).toBe(1);
		expect(date.find('t').props().children).toBe(initialProps.video.createdAt);
	});

	it('should show channel info correctly', () => {
		const channel = component.find('.video__channel');
		const channelName = channel.find('.video__channel__name');
		const channelAvatar = channel.find('img.video__channel__avatar');

		expect(channel.length).toBe(1);
		expect(channelName.length).toBe(1);
		expect(channelAvatar.length).toBe(1);
		expect(channelName.text()).toBe(initialProps.channel.name);
		expect(channelAvatar.props().src).toBe(initialProps.channel.avatar);
		expect(channelAvatar.props().alt).toBe(initialProps.channel.name);
	});

	it('should render the Comments component if necessary', () => {
		expect(component.find('Comments').length).toBe(1);

		component.setProps({video: {...initialProps.video, comments: []}});
		expect(component.find('Comments').length).toBe(0);

		component.setProps({video: {...initialProps.video, comments: null}});
		expect(component.find('Comments').length).toBe(0);
	});

	it('should pass the Comments component the comments and count', () => {
		expect(component.find('Comments').props().comments).toEqual(initialProps.video.comments);
		expect(component.find('Comments').props().totalCount).toBe(initialProps.video.commentCount);
	});

	it('should render the Comments component if necessary', () => {
		expect(component.find('VideoList').length).toBe(1);

		component.setProps({video: {...initialProps.video, related: []}});
		expect(component.find('VideoList').length).toBe(0);

		component.setProps({video: {...initialProps.video, related: null}});
		expect(component.find('VideoList').length).toBe(0);
	});

	it('should pass the VideoList component the videos and correct layout', () => {
		expect(component.find('VideoList').props().videos).toEqual(initialProps.video.related);
		expect(component.find('VideoList').props().layout).toBe('sidebar');
	});

	it('should map state to props correctly', () => {
		const state = {video: {}, channel: {}};
		const thisProps = mapStateToProps(state);

		expect(thisProps.video).toEqual({});
		expect(thisProps.channel).toEqual({});
	});
});
