import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
import queryString from 'query-string';
import Truncate from './Truncate';
import VideoPlayer from './VideoPlayer';
import VideoList from './VideoList';
import Comments from './Comments';
import {
	getVideo,
	getRelatedVideos,
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
			getRelatedVideos,
			getComments,
		} = this.props;

		this.setState({id});

		getVideo(id).then(() => {
			setPageTitle(this.props.video.title);
			getRelatedVideos(id);
			getComments(id);
		});
	}

	render() {
		const { id } = this.state;
		const { video } = this.props;

		return (
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
											<div className="col-md-4 col-sm-5 text-left">
												{formatNumber(video.views)} views
											</div>

											<div className="col-md-8 col-sm-7">
												<div className="video__stats__item">
													<span className="d-none d-md-inline-block">
														Published
													</span>

													<Moment format=" MMM DD, YYYY">
														{video.publishedAt}
													</Moment>
												</div>

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
		);
	}
}

const mapStateToProps = (state) => {
	return {
		video: state.video,
	};
};

export default connect(mapStateToProps, {
	getVideo,
	getRelatedVideos,
	getComments,
})(Video);
