import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		autoplay: PropTypes.bool,
		showRelated: PropTypes.bool,
	};

	static defaultProps = {
		autoplay: process.ENV === 'production',
		showRelated: false,
	};

	render() {
		const { id, autoplay, showRelated } = this.props;

		const params = [
			`autoplay=${Number(autoplay)}`,
			`rel=${Number(showRelated)}`,
			'showinfo=0',
			'iv_load_policy=3',
		].join('&');

		return (
			<div className="video-player-wrapper">
				<div className="video-player">
					<div className="embed-responsive embed-responsive-16by9">
						<iframe
							className="embed-responsive-item"
							src={`https://www.youtube.com/embed/${id}?${params}`}
							title={id}
							allowFullScreen
						></iframe>
					</div>
				</div>
			</div>
		);
	}
}

export default VideoPlayer;
