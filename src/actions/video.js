import axios from 'axios';
import { API_URL, API_KEY } from './config';
import { GET_VIDEO, GET_COMMENTS } from './types';

export const getVideo = (videoId) => {
	const payload = axios.get(`${API_URL}/videos`, {params: {
		key: API_KEY,
		id: videoId,
		part: 'snippet, statistics',
	}});

	return {type: GET_VIDEO, payload};
};

export const getComments = (videoId) => {
	const payload = axios.get(`${API_URL}/commentThreads`, {params: {
		key: API_KEY,
		videoId,
		part: 'id, snippet',
		maxResults: 12,
	}});

	return {type: GET_COMMENTS, payload};
};
