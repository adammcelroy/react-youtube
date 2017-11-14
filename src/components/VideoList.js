import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Truncate from './Truncate';
import { formatNumber } from '../utilities';

class VideoList extends Component {
	static propTypes = {
		videos: PropTypes.array.isRequired,
		title: PropTypes.string,
		layout: PropTypes.string,
		showDescriptions: PropTypes.bool,
	};

	static defaultProps = {
		layout: 'grid',
		showDescriptions: false,
	};

	constructor() {
		super();

		this.renderVideoListings = this.renderVideoListings.bind(this);
		this.renderVideoListing = this.renderVideoListing.bind(this);
	}

	renderVideoListing(video) {
		const {
			layout,
			showDescriptions,
		} = this.props;

		const outerColumnClasses = (layout === 'grid')
			? 'col-lg-3 col-md-4 col-sm-6'
			: 'col-12';

		let innerColumnClasses = 'col-12';
		if (layout === 'list') {
			innerColumnClasses = 'col-xl-3 col-lg-4 col-md-6 col-sm-5';
		} else if (layout === 'sidebar') {
			innerColumnClasses = 'col-sm-6';
		}

		return (
			<div className={outerColumnClasses} key={video.id}>
				<article className="video-listing-wrapper">
					<div className="video-listing">
						<div className="row">
							<div className={innerColumnClasses}>
								<Link to={`/watch?v=${video.id}`}>
									<div className="video-listing__thumbnail-wrapper">
										<img
											src={video.thumbnail}
											alt={video.title}
											className="video-listing__thumbnail"
										/>

										{video.duration &&
											<div className="video-listing__duration-wrapper">
												<div className="video-listing__duration">
													{video.duration}
												</div>
											</div>
										}
									</div>
								</Link>
							</div>

							<div className="col">
								<Link to={`/watch?v=${video.id}`}>
									<div className="video-listing__title-wrapper">
										<h1
											className="video-listing__title"
											title={video.title}
										>
											<Truncate lines={2} more="...">
												{video.title}
											</Truncate>
										</h1>
									</div>
								</Link>

								<div className="video-listing__channel-wrapper">
									<Link
										to={`/channel/${video.channel.id}`}
										className="video-listing__channel"
										title={video.channel.name}
									>
										<Truncate lines={1} more="...">
											{video.channel.name}
										</Truncate>
									</Link>
								</div>

								<Link to={`/watch?v=${video.id}`}>
									<div className="video-listing__stats-wrapper">
										<div className="video-listing__stats">
											{video.views &&
											<div className="video-listing__stats__item">
												{formatNumber(video.views, true)} views
											</div>
											}

											{video.publishedAt &&
											<div className="video-listing__stats__item">
												<Moment fromNow>
													{video.publishedAt}
												</Moment>
											</div>
											}
										</div>
									</div>

									{showDescriptions && video.description &&
										<div className="video-listing__description-wrapper">
											<div className="video-listing__description">
												<Truncate lines={3} more="...">
													{video.description}
												</Truncate>
											</div>
										</div>
									}
								</Link>
							</div>
						</div>
					</div>
				</article>
			</div>
		);
	}

	renderVideoListings() {
		const { videos } = this.props;

		return (
			<div className="video-list__videos-wrapper">
				<div className="video-list__videos">
					<div className="row">
						{videos && videos.map(video => this.renderVideoListing(video))}
					</div>
				</div>
			</div>
		);
	}

	render() {
		const {
			title,
			layout,
		} = this.props;

		return (
			<section className="video-list-wrapper">
				<div className={`video-list video-list--${layout}`}>
					{title &&
						<div className="video-list__title-wrapper">
							<h1 className="h5 video-list__title">
								{title}
							</h1>
						</div>
					}

					{this.renderVideoListings()}
				</div>
			</section>
		);
	}
}

export default VideoList;
