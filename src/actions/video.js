import axios from 'axios';
import { API_URL, API_KEY } from './config';
import { _getMissingVideoData } from './';
import {
	GET_VIDEO,
	GET_RELATED_VIDEOS,
	GET_COMMENTS,
} from './types';

export const getVideo = (videoId) => {
	const request = axios.get(`${API_URL}/videos`, {
		params: {
			key: API_KEY,
			id: videoId,
			part: 'snippet, statistics',
		},
	});

	return {
		type: GET_VIDEO,
		payload: request,
	};
};

export const getRelatedVideos = (videoId) => {
	const request = axios.get(`${API_URL}/search`, {
		params: {
			key: API_KEY,
			relatedToVideoId: videoId,
			type: 'video',
			part: 'snippet',
			maxResults: 12,
		},
	}).then(_getMissingVideoData);

	return {
		type: GET_RELATED_VIDEOS,
		payload: request,
	};
};

export const getComments = (videoId) => {
	const request = axios.get(`${API_URL}/commentThreads`, {
		params: {
			key: API_KEY,
			videoId,
			part: 'id, snippet',
			maxResults: 10,
		},
	});

	return {
		type: GET_COMMENTS,
		payload: request,
	};
};
