import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import albumsReducer from '../reducers/albums';
import artistsReducer from '../reducers/artists';
import tracksReducer from '../reducers/tracks';
import playlistReducer from '../reducers/playlist';

interface ExtendedWindow extends Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare var window: ExtendedWindow;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	combineReducers({
		albums: albumsReducer,
		artists: artistsReducer,
		tracks: tracksReducer,
		playlist: playlistReducer
	}),
	composeEnhancers(applyMiddleware(thunk))
);

export default store;
