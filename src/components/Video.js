import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import queryString from 'query-string';
import Truncate from './Truncate';
import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import Comments from './Comments';
import {
	getVideo,
	getVideos,
	getChannel,
	getComments,
} from '../actions';
import {
	setPageTitle,
	formatNumber,
} from '../utilities';

class Video extends Component {
	constructor() {
		super();
		this.state = {id: ''};
	}

	componentWillMount() {
		const initialId = queryString.parse(this.props.location.search).v;

		this.getVideo(initialId);
	}

	componentWillReceiveProps(nextProps) {
		const oldId = this.state.id;
		const newId = queryString.parse(nextProps.location.search).v;

		if (newId !== oldId) {
			this.getVideo(newId);
		}
	}

	getVideo(id) {
		const {
			getVideo,
			getVideos,
			getChannel,
			getComments,
		} = this.props;

		this.setState({id});

		getVideo(id).then(() => {
			setPageTitle(this.props.video.title);
			getChannel(this.props.video.channel.id);
			getComments(id);
			getVideos({
				type: 'related',
				videoId: id,
			});
		});
	}

	render() {
		const { id } = this.state;
		const { video, channel } = this.props;

		return video.id ? (
			<div className="video-wrapper">
				<div className="video">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<VideoPlayer id={id} />

								<div className="video__title-wrapper">
									<h1 className="h4 video__title">
										{video.title}
									</h1>
								</div>

								<div className="video__stats-wrapper">
									<div className="video__stats">
										<div className="row">
											<div className="col-6 text-left">
												{formatNumber(video.views)} views
											</div>

											<div className="col-6">
												<div className="video__stats__item">
													<i className="fa fa-thumbs-up"></i>
													{formatNumber(video.likes, true)}
												</div>

												<div className="video__stats__item">
													<i className="fa fa-thumbs-down"></i>
													{formatNumber(video.dislikes, true)}
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="video__channel-wrapper">
									<div className="video__channel">
										<Link
											to={`/channel/${channel.id}`}
											className="video__channel__avatar-wrapper"
										>
											<img
												src={channel.avatar}
												alt={channel.name}
												className="video__channel__avatar"
											/>
										</Link>

										<div className="video__channel__name-wrapper">
											<Link
												to={`/channel/${channel.id}`}
												className="video__channel__name"
											>
												{channel.name}
											</Link>

											<div className="video__created-date-wrapper">
												<div className="video__created-date">
													Published
													<Moment format=" MMM DD, YYYY">
														{video.createdAt}
													</Moment>
												</div>
											</div>
										</div>
									</div>
								</div>

								{video.description &&
									<div className="video__description-wrapper">
										<div className="video__description">
											<Linkify properties={{target: '_blank'}}>
												<Truncate lines={3}>
													{video.description}
												</Truncate>
											</Linkify>
										</div>
									</div>
								}

								{video.comments && video.comments.length > 0 &&
									<Comments
										comments={video.comments}
										totalCount={video.commentCount}
									/>
								}
							</div>

							<div className="col-lg-4">
								<div className="video__related-wrapper">
									<div className="video__related">
										{video.related && video.related.length > 0 &&
											<VideoList
												videos={video.related}
												title="Related Videos"
												layout="sidebar"
											/>
										}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		) : <div></div>;
	}
}

const mapStateToProps = (state) => {
	return {
		video: state.video,
		channel: state.channel,
	};
};

export default connect(mapStateToProps, {
	getVideo,
	getVideos,
	getChannel,
	getComments,
})(Video);
