import {
	GET_POPULAR_VIDEOS,
	GET_VIDEOS_FOR_SEARCH,
} from '../actions/types';
import { standardiseVideoData } from '../utilities';

const INITIAL_STATE = {
	popular: [],
	search: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_POPULAR_VIDEOS: {
			return {
				...state,
				popular: action.payload.data.items.map(video => standardiseVideoData(video)),
			};
		}
		case GET_VIDEOS_FOR_SEARCH: {
			return {
				...state,
				search: action.payload.data.items.map(video => standardiseVideoData(video)),
			};
		}
		default:
			return state;
	}
};
