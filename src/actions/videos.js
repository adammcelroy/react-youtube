import axios from 'axios';
import _ from 'lodash';
import { API_URL, API_KEY } from './config';
import {
	GET_POPULAR_VIDEOS,
	GET_VIDEOS_FOR_SEARCH,
} from './types';

export const _getMissingVideoData = (videosData) => {
	const videos = videosData.data.items;
	const ids = videos.map(video => video.id.videoId).join(',');

	return axios.get(`${API_URL}/videos`, {
		params: {
			key: API_KEY,
			id: ids,
			part: 'statistics, contentDetails',
		},
	}).then((missingData) => {
		const parts = missingData.data.items;

		// Merge missing data into the video results
		const combined = _.map(videos, video => _.assign(video, _.find(parts, {id: video.id.videoId})));

		// Update the return data
		videosData.data.items = combined;

		return videosData;
	});
};

export const getPopularVideos = (pageToken) => {
	const request = axios.get(`${API_URL}/videos`, {
		params: {
			key: API_KEY,
			chart: 'mostPopular',
			regionCode: 'US',
			videoCategoryId: '',
			maxResults: 24,
			part: 'snippet, statistics, contentDetails',
			pageToken,
		},
	});

	return {
		type: GET_POPULAR_VIDEOS,
		payload: request,
	};
};

export const getVideosForSearch = (query, pageToken) => {
	const videoPromise = axios.get(`${API_URL}/search`, {
		params: {
			key: API_KEY,
			q: query,
			type: 'video',
			part: 'snippet',
			maxResults: 12,
			pageToken,
		},
	}).then(_getMissingVideoData);

	return {
		type: GET_VIDEOS_FOR_SEARCH,
		payload: videoPromise,
	};
};
