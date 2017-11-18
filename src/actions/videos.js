import axios from 'axios';
import _ from 'lodash';
import { API_URL, API_KEY } from './config';
import { GET_POPULAR_VIDEOS, GET_VIDEOS_FOR_SEARCH, GET_RELATED_VIDEOS } from './types';

export const getAdditionalVideoData = (videosData) => {
	const videos = videosData.data.items;
	const ids = videos.map(video => video.id.videoId || video.id).join(',');

	return axios.get(`${API_URL}/videos`, {
		params: {
			key: API_KEY,
			id: ids,
			part: 'statistics, contentDetails',
		},
	}).then((additionalData) => ({
		...videosData,
		data: {
			...videosData.data,
			items: _.map(videos, (video) => {
				const id = video.id.videoId || video.id;
				return _.assign(video, _.find(additionalData.data.items, {id}))
			}),
		}
	}));
};

export const getVideos = (config = {type: 'popular'}) => {
	let endpoint, type, requiresAdditionalVideoData;
	let params = {
		key: API_KEY,
		maxResults: 12,
		part: 'snippet',
	};

	if (config.next) {
		params.pageToken = config.next;
	}

	switch (config.type) {
		case 'popular': {
			type = GET_POPULAR_VIDEOS;
			endpoint = 'videos';

			params = {
				...params,
				chart: 'mostPopular',
				part: 'snippet, statistics, contentDetails',
				regionCode: 'US',
				videoCategoryId: '',
			};
			break;
		}
		case 'search': {
			type = GET_VIDEOS_FOR_SEARCH;
			endpoint = 'search';
			requiresAdditionalVideoData = true;

			params = {
				...params,
				q: config.query,
				type: 'video',
			};
			break;
		}
		case 'related': {
			type = GET_RELATED_VIDEOS;
			endpoint = 'search';
			requiresAdditionalVideoData = true;

			params = {
				...params,
				relatedToVideoId: config.videoId,
				type: 'video',
			};
			break;
		}
		default: return;
	}

	const payload = axios.get(`${API_URL}/${endpoint}`, {params}).then(
		data => requiresAdditionalVideoData ? getAdditionalVideoData(data) : data
	);

	return {type, payload};
};
