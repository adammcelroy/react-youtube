import React, { Component } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import VideoList from './VideoList';
import { getVideosForSearch } from '../actions';
import { setPageTitle } from '../utilities';

class Search extends Component {
	constructor() {
		super();
		this.state = {query: ''};
	}

	componentWillMount() {
		const initialQuery = queryString.parse(this.props.location.search).query;

		this.getVideos(initialQuery);
	}

	componentWillReceiveProps(nextProps) {
		const oldQuery = this.state.query;
		const newQuery = queryString.parse(nextProps.location.search).query;

		if (newQuery !== oldQuery) {
			this.getVideos(newQuery);
		}
	}

	getVideos(query) {
		this.setState({query});
		setPageTitle(query);
		this.props.getVideosForSearch(query);
	}

	render() {
		const { videos } = this.props;

		return (
			<div className="search-wrapper">
				<div className="search">
					<div className="container">
						<VideoList
							videos={videos}
							title={`Search: ${this.state.query}`}
							layout="list"
							showDescriptions={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		videos: state.videos.search,
	};
};

export default connect(mapStateToProps, {
	getVideosForSearch,
})(Search);
