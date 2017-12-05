import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from './VideoPlayer';

const initialProps = {
	id: '123',
	autoplay: true,
	showRelated: true,
};

const createShallow = props => shallow(<VideoPlayer {...props} />);

describe('<VideoPlayer />', () => {
	it('should render without crashing', () => {
		const component = createShallow(initialProps);
		expect(component).toHaveLength(1);
	});

	it('should render element with class "video-player"', () => {
		const component = createShallow(initialProps);
		expect(component.find('.video-player')).toHaveLength(1);
	});

	it('should render an iframe with a src containing the YouTube domain', () => {
		const component = createShallow(initialProps);
		const domain = 'https://www.youtube.com/embed/';

		expect(component.find('iframe')).toHaveLength(1);
		expect(component.find('iframe').props().src.startsWith(domain)).toBe(true);
	});

	it('should render an iframe with a src including the video id', () => {
		const component = createShallow(initialProps);
		const src = component.find('iframe').props().src;
		expect(src.split('?')[0].endsWith(initialProps.id)).toBe(true);
	});

	it('should include the autoplay prop in the iframe src', () => {
		const component = createShallow(initialProps);
		const src = component.find('iframe').props().src;
		expect(src.indexOf(`autoplay=${Number(initialProps.autoplay)}`)).not.toBe(-1);
	});

	it('should include the showRelated prop in the iframe src', () => {
		const component = createShallow(initialProps);
		const src = component.find('iframe').props().src;
		expect(src.indexOf(`rel=${Number(initialProps.showRelated)}`)).not.toBe(-1);
	});
});
