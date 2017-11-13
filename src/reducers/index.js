import { combineReducers } from 'redux';
import videoReducer from './video';
import videosReducer from './videos';

export default combineReducers({
	video: videoReducer,
	videos: videosReducer,
});
