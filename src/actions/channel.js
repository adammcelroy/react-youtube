import axios from 'axios';
import { API_URL, API_KEY } from './config';
import { GET_CHANNEL } from './types';

export const getChannel = (channelId) => {
	const payload = axios.get(`${API_URL}/channels`, {params: {
		key: API_KEY,
		id: channelId,
		part: 'id, snippet, statistics',
	}});

	return {type: GET_CHANNEL, payload};
};
