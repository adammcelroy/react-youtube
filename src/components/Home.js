import React, { Component } from 'react';
import { connect } from 'react-redux';
import VideoList from './VideoList';
import { getPopularVideos } from '../actions';
import { setPageTitle } from '../utilities';

class Home extends Component {
	componentWillMount() {
		const { getPopularVideos } = this.props;

		setPageTitle();

		getPopularVideos();
	}

	render() {
		const { videos } = this.props;

		return (
			<div className="home-wrapper">
				<div className="home">
					<div className="container">
						<VideoList
							videos={videos}
							title="Popular Right Now"
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		videos: state.videos.popular,
	};
};

export default connect(mapStateToProps, {
	getPopularVideos,
})(Home);
