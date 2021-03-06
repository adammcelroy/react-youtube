import { GET_VIDEO, GET_RELATED_VIDEOS, GET_COMMENTS } from '../actions/types';
import { standardiseVideoData, standardiseCommentData } from '../utilities';

const INITIAL_STATE = {
	related: [],
	comments: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_VIDEO:
			return standardiseVideoData(action.payload.data.items[0]);
		case GET_RELATED_VIDEOS: {
			const related = action.payload.data.items.map(v => standardiseVideoData(v));
			return {...state, related};
		}
		case GET_COMMENTS: {
			const comments = action.payload.data.items.map(c => standardiseCommentData(c));
			return {...state, comments};
		}
		default: return state;
	}
};
