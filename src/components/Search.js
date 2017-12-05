import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';
import VideoList from './VideoList';
import { getVideos } from '../actions';
import {
	setPageTitle,
	formatNumber,
	scrollToTop,
} from '../utilities';

export class Search extends Component {
	constructor() {
		super();

		this.state = {query: '', title: ''};

		this.getVideos = this.getVideos.bind(this);
	}

	componentWillMount() {
		const query = queryString.parse(this.props.location.search).search_query;

		setPageTitle(query);
		this.setState({query});
		this.getVideos(query);
	}

	componentWillReceiveProps(nextProps) {
		const query = queryString.parse(nextProps.location.search).search_query;
		const oldQuery = this.state.query;

		if (query !== oldQuery) {
			setPageTitle(query);
			this.setState({query});
			this.getVideos(query);
		}
	}

	getVideos(query, isPaginatedRequest) {
		if (!isPaginatedRequest) {
			scrollToTop();
		}

		this.props.getVideos({
			query,
			type: 'search',
			next: isPaginatedRequest && this.props.nextPageToken,
		});
	}

	render() {
		const { query } = this.state;
		const { videos, totalResults } = this.props;
		const title = `${query} (${formatNumber(totalResults)} results)`;

		return (
			<div className="search-wrapper">
				<div className="search">
					<div className="container">
						<InfiniteScroll
							pageStart={0}
							hasMore={true}
							loadMore={page => page > 1 && this.getVideos(query, true)}
							loader={<div className="loader">Loading...</div>}
						>
							<VideoList
								videos={videos}
								title={title}
								layout="list"
								showDescriptions={true}
							/>
						</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
}

export const mapStateToProps = (state) => {
	return {
		videos: state.videos.search,
		nextPageToken: state.videos.current.nextPageToken,
		totalResults: state.videos.current.totalResults,
	};
};

export default connect(mapStateToProps, {getVideos})(Search);
