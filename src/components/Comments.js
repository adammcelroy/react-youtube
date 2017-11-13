import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { formatNumber } from '../utilities';

class Comments extends Component {
	static propTypes = {
		comments: PropTypes.array.isRequired,
		totalCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	};

	_renderComment(comment) {
		return (
			<div className="comment-wrapper" key={comment.id}>
				<div className="comment">
					<div className="row">
						<div className="col-sm-6">
							<div className="comment__channel-wrapper">
								<Link to={`/channel/${comment.channel.id}`}>
									<div className="comment__channel">
										<div className="comment__channel__avatar-wrapper">
											<img
												src={comment.channel.avatar}
												alt={comment.channel.name}
												className="comment__channel__avatar"
											/>
										</div>

										<div className="comment__channel__name-wrapper">
											<div className="comment__channel__name">
												{comment.channel.name}
											</div>
										</div>
									</div>
								</Link>
							</div>
						</div>

						<div className="col-sm-6">
							<div className="comment__details-wrapper">
								<div className="comment__details">
									<div className="comment__details__item-wrapper">
										<div className="comment__details__item">
											<div className="comment__publish-date-wrapper">
												<div className="comment__publish-date">
													<Moment fromNow>
														{comment.publishedAt}
													</Moment>
												</div>
											</div>
										</div>
									</div>

									<div className="comment__details__item-wrapper">
										<div className="comment__details__item">
											<div className="comment__like-count-wrapper">
												<div className="comment__like-count">
													<i className="fa fa-thumbs-up"></i>
													{formatNumber(comment.likeCount, true)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="comment__body-wrapper">
						<div className="comment__body">
							{comment.text}
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const {
			comments,
			totalCount,
		} = this.props;

		return (
			<section className="comments-wrapper">
				<div className="comments">
					<div className="comments__title-wrapper">
						<h1 className="h5 comments__title">
							Comments
							{totalCount && ` (${formatNumber(totalCount)})`}
						</h1>
					</div>

					{comments.length > 0 && comments.map(comment => this._renderComment(comment))}
					{comments.length === 0 && 'There are currently no comments.'}
				</div>
			</section>
		);
	}
}

export default Comments;
