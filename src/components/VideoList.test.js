import React from 'react';
import { shallow } from 'enzyme';
import VideoList from './VideoList';
import { formatNumber } from '../utilities';

const initialProps = {
	videos: [
		{
			channel: {
				id: 'Example channel id 1',
				name: 'Example channel name 1',
			},
			commentCount: '5',
			createdAt: '2017-12-05T18:00:03.000Z',
			description: 'Example description 1',
			dilikes: '5',
			duration: '17:28',
			id: 'Example id 1',
			likes: '5',
			thumbnail: 'https://i.ytimg.com/example1.jpg',
			title: 'Example title 1',
			views: '123456',
		},
		{
			channel: {
				id: 'Example channel id 2',
				name: 'Example channel name 2',
			},
			commentCount: '10',
			createdAt: '2017-11-05T18:00:03.000Z',
			description: 'Example description 2',
			dilikes: '10',
			duration: '16:28',
			id: 'Example id 2',
			likes: '10',
			thumbnail: 'https://i.ytimg.com/example2.jpg',
			title: 'Example title 2',
			views: '12345678',
		},
	],
	title: 'Example video list title',
	layout: 'list',
	showDescriptions: true,
};

let component, video, props;

const createShallow = props => shallow(<VideoList {...props} />);

describe('<VideoList />', () => {
	beforeEach(() => {
		component = createShallow(initialProps);
		video = component.find('.video-listing').first();
		props = initialProps.videos[0];
	});

	it('should render without crashing', () => {
		expect(component).toHaveLength(1);
	});

	it('should render element with class "video-list"', () => {
		expect(component.find('.video-list')).toHaveLength(1);
	});

	it('should render each video passed in as props', () => {
		expect(component.find('.video-listing')).toHaveLength(2);
	});

	it('should show the video list title', () => {
		expect(component.find('.video-list__title')).toHaveLength(1);
		expect(component.find('.video-list__title').text()).toBe(initialProps.title);
	});

	it('should include at least one link to the video', () => {
		const path = `/watch?v=${props.id}`;
		expect(video.find(`Link[to="${path}"]`).length).toBeGreaterThan(1);
	});

	it('should show thumbnails', () => {
		const thumbnail = video.find('img.video-listing__thumbnail');

		expect(thumbnail).toHaveLength(1);
		expect(thumbnail.props().src).toBe(props.thumbnail);
		expect(thumbnail.props().alt).toBe(props.title);
	});

	it('should show duration if provided', () => {
		let duration = video.find('.video-listing__duration');

		expect(duration).toHaveLength(1);
		expect(duration.text()).toBe(props.duration);

		component.setProps({
			videos: [{
				...initialProps.videos[0],
				duration: null,
			}, initialProps.videos[1]],
		});

		video = component.find('.video-listing').first();
		duration = video.find('.video-listing__duration');

		expect(duration).toHaveLength(0);
	});

	it('should show title', () => {
		const title = video.find('.video-listing__title');

		expect(title).toHaveLength(1);
		expect(title.props().title).toBe(props.title);
		expect(title.find('Truncate').props().children).toBe(props.title);
	});

	it('should show description only if provided', () => {
		let description = video.find('.video-listing__description');

		expect(description).toHaveLength(1);
		expect(description.find('Truncate').props().children).toBe(props.description);

		component.setProps({
			videos: [{
				...initialProps.videos[0],
				description: null,
			}, initialProps.videos[1]],
		});

		video = component.find('.video-listing').first();
		description = video.find('.video-listing__description');

		expect(description).toHaveLength(0);

		component.setProps({...initialProps, showDescriptions: false});

		expect(description).toHaveLength(0);
	});

	it('should show views stat only if provided', () => {
		let views = video.find('.video-listing__views');
		const expected = `${formatNumber(props.views, true)} views`;

		expect(views).toHaveLength(1);
		expect(views.text()).toBe(expected);

		component.setProps({
			videos: [{
				...initialProps.videos[0],
				views: null,
			}, initialProps.videos[1]],
		});

		video = component.find('.video-listing').first();
		views = video.find('.video-listing__views');

		expect(views).toHaveLength(0);
	});

	it('should show created date only if provided', () => {
		let date = video.find('.video-listing__created-date');

		expect(date).toHaveLength(1);
		expect(date.find('t').props().fromNow).toBe(true);
		expect(date.find('t').props().children).toBe(props.createdAt);

		component.setProps({
			videos: [{
				...initialProps.videos[0],
				createdAt: null,
			}, initialProps.videos[1]],
		});

		video = component.find('.video-listing').first();
		date = video.find('.video-listing__created-date');

		expect(date).toHaveLength(0);
	});

	it('should show channel info correctly', () => {
		const channel = video.find('.video-listing__channel');

		expect(channel).toHaveLength(1);
		expect(channel.props().title).toBe(props.channel.name);
		expect(channel.find('Truncate').props().children).toBe(props.channel.name);
	});
});
