import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';
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
	componentWillMount() {
		const { id } = this.props.match.params;

		this.getVideo(id);
	}

	componentWillReceiveProps(nextProps) {
		const oldId = this.props.match.params.id;
		const newId = nextProps.match.params.id;

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

		getVideo(id).then(() => {
			setPageTitle(this.props.video.snippet.title);
			getRelatedVideos(id);
			getComments(id);
		});
	}

	render() {
		const { id } = this.props.match.params;
		const {
			video: {
				snippet,
				statistics,
				related,
				comments,
			},
		} = this.props;

		return (
			<div className="video-wrapper">
				<div className="video">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<VideoPlayer
									id={id}
									autoplay={false} // eventually true
								/>

								<div className="video__title-wrapper">
									<h1 className="h4 video__title">
										{snippet.title}
									</h1>
								</div>

								<div className="video__stats-wrapper">
									<div className="video__stats">
										<div className="row">
											<div className="col-md-4 col-sm-5 text-left">
												{formatNumber(statistics.viewCount)} views
											</div>

											<div className="col-md-8 col-sm-7">
												<div className="video__stats__item">
													<span className="d-none d-md-inline-block">
														Published
													</span>

													<Moment format=" MMM DD, YYYY">
														{snippet.publishedAt}
													</Moment>
												</div>

												<div className="video__stats__item">
													<i className="fa fa-thumbs-up"></i>
													{formatNumber(statistics.likeCount, true)}
												</div>

												<div className="video__stats__item">
													<i className="fa fa-thumbs-down"></i>
													{formatNumber(statistics.dislikeCount, true)}
												</div>
											</div>
										</div>
									</div>
								</div>

								{snippet.description &&
									<div className="video__description-wrapper">
										<div className="video__description">
											<Linkify properties={{target: '_blank'}}>
												<Truncate lines={3}>
													{snippet.description}
												</Truncate>
											</Linkify>
										</div>
									</div>
								}

								{comments && comments.length > 0 &&
									<Comments
										comments={comments}
										totalCount={statistics.commentCount}
									/>
								}
							</div>

							<div className="col-lg-4">
								<div className="video__related-wrapper">
									<div className="video__related">
										{related && related.length > 0 &&
											<VideoList
												videos={related}
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
