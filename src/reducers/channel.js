import { GET_CHANNEL } from '../actions/types';
import { standardiseChannelData } from '../utilities';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_CHANNEL:
			return standardiseChannelData(action.payload.data.items[0]);
		default: return state;
	}
};
