import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import { getVideos } from '../actions';
import { setPageTitle } from '../utilities';

class Home extends Component {
	componentWillMount() {
		setPageTitle();

		this.props.getVideos();
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

export default connect(state => ({videos: state.videos.popular}), {getVideos})(Home);
