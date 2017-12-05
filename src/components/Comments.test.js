import React from 'react';
import { shallow } from 'enzyme';
import Comments from './Comments';
import { formatNumber } from '../utilities';

const initialProps = {
	totalCount: 3,
	comments: [
		{
			channel: {
				avatar: "https://yt3.ggpht.com/example1.jpg",
				id: "Example channel id 1",
				name: "Example channel name 1",
			},
			createdAt: "2017-12-05T03:39:15.000Z",
			id: "Example id 1",
			likeCount: 5,
			text: "Example text 1"
		},
		{
			channel: {
				avatar: "https://yt3.ggpht.com/example2.jpg",
				id: "Example channel id 2",
				name: "Example channel name 2",
			},
			createdAt: "2017-11-05T03:39:15.000Z",
			id: "Example id 2",
			likeCount: 10,
			text: "Example text 2"
		},
	],
};

const createShallow = props => shallow(<Comments {...props} />);

describe('<Comments />', () => {
	it('should render without crashing', () => {
		const component = createShallow(initialProps);
		expect(component).toHaveLength(1);
	});

	it('should render element with class "search-bar"', () => {
		const component = createShallow(initialProps);
		expect(component.find('.comments')).toHaveLength(1);
	});

	it('should render each comment passed in as props', () => {
		const component = createShallow(initialProps);
		expect(component.find('.comment')).toHaveLength(2);
	});

	it('should show channel info correctly', () => {
		const component = createShallow(initialProps);
		const channel = component.find('.comment').first().find('.comment__channel');
		const channelAvatar = channel.find('img.comment__channel__avatar');
		const props = initialProps.comments[0];

		expect(channelAvatar).toHaveLength(1);
		expect(channelAvatar.props().src).toBe(props.channel.avatar);
		expect(channelAvatar.props().alt).toBe(props.channel.name);
	});

	it('should show comment details correctly', () => {
		const component = createShallow(initialProps);
		const comment = component.find('.comment').first();
		const commentDetails = comment.find('.comment__details');
		const commentCreatedDate = commentDetails.find('.comment__created-date');
		const commentLikeCount = commentDetails.find('.comment__like-count');
		const props = initialProps.comments[0];

		expect(commentDetails).toHaveLength(1);

		expect(commentCreatedDate).toHaveLength(1);
		expect(commentCreatedDate.find('t').props().fromNow).toBe(true);
		expect(commentCreatedDate.find('t').props().children).toBe(props.createdAt);

		expect(commentLikeCount).toHaveLength(1);
		expect(commentLikeCount.text()).toBe(formatNumber(props.likeCount, true));
	});

	it('should show comment body correctly', () => {
		const component = createShallow(initialProps);
		const comment = component.find('.comment').first();
		const commentBody = comment.find('.comment__body');
		const props = initialProps.comments[0];

		expect(commentBody).toHaveLength(1);
		expect(commentBody.find('Truncate')).toHaveLength(1);
		expect(commentBody.find('Truncate').props().children).toBe(props.text);
	});

	it('should show message if no comments exist', () => {
		const component = createShallow({...initialProps, comments: []});
		const comments = component.find('.comments');
		expect(comments.props().children[1]).toBe('There are currently no comments.');
	});
});
