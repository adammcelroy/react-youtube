import { combineReducers } from 'redux';
import videoReducer from './video';
import videosReducer from './videos';
import channelReducer from './channel';

export default combineReducers({
	video: videoReducer,
	videos: videosReducer,
	channel: channelReducer,
});
