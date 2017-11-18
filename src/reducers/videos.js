import {
	GET_POPULAR_VIDEOS,
	GET_VIDEOS_FOR_SEARCH,
} from '../actions/types';
import { standardiseVideoData } from '../utilities';

const INITIAL_STATE = {
	popular: [],
	search: [],
	current: {
		totalResults: 0,
		nextPageToken: '',
	},
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
			const videos = action.payload.data.items.map(
				video => standardiseVideoData(video)
			);

			const newState = {
				...state,
				current: {
					nextPageToken: action.payload.data.nextPageToken,
					totalResults: action.payload.data.pageInfo.totalResults,
				},
			};

			if (action.meta.continuedResults) {
				newState.search = [...newState.search, ...videos];
			} else {
				newState.search = videos;
			}

			return newState;
		}
		default:
			return state;
	}
};
