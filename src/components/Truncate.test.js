import React from 'react';
import { mount } from 'enzyme';
import Truncate from './Truncate';

const lipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.';

const initialProps = {
	children: <div>{lipsum}</div>,
	more: 'Show more',
	less: 'Show less',
};

const createMounted = props => mount(<Truncate {...props} />);

describe('<Truncate />', () => {
	it('should render without crashing', () => {
		const component = createMounted(initialProps);
		expect(component).toHaveLength(1);
	});

	it('should show children', () => {
		const component = createMounted(initialProps);
		expect(component.text()).toBe(lipsum);
	});

	it('should contain a "Show more" link', () => {
		const component = createMounted(initialProps);
		expect(component.find('.truncate-trigger')).toHaveLength(1);
		expect(component.find('.truncate-trigger').text()).toBe(initialProps.more);
	});

	it('should show a "Show less" link when "Show more" link is clicked', () => {
		const component = createMounted(initialProps);

		component.find('.truncate-trigger').simulate('click');

		expect(component.state().expanded).toBe(true);
		expect(component.find('.truncate-trigger')).toHaveLength(2);
		expect(component.find('.truncate-trigger').last().text()).toBe(initialProps.less);
	});

	it('should just show "..." instead of "Show more" link if more prop set to "..."', () => {
		const component = createMounted({...initialProps, more: '...'});
		expect(component.find('.truncate-trigger')).toHaveLength(0);
		expect(component.find('span').last().text()).toBe('…');
	})
});
