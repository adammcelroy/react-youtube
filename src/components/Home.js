import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import { getVideos } from '../actions';
import { setPageTitle } from '../utilities';

export class Home extends Component {
	componentWillMount() {
		this.setPageTitle();
		this.props.getVideos();
	}

	setPageTitle(title) {
		setPageTitle(title)
	}

	render() {
		return (
			<div className="home-wrapper">
				<div className="home">
					<div className="container">
						<VideoList
							videos={this.props.videos}
							title="Popular Right Now"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = state => ({videos: state.videos.popular});

export default connect(state => mapStateToProps, {getVideos})(Home);
