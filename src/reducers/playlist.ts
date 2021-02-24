import { SET_PLAYLIST, ADD_PLAYLIST } from '../utils/constants';

const playlistReducer = (state = {items: []}, action: { type?: any; playlists?: any; }) => {
	const {playlists} = action;
	switch (action.type) {
		case SET_PLAYLIST:
			return playlists;
		case ADD_PLAYLIST:
			return {
				...state,
				next: playlists.next,
				items: [...state.items, ...playlists.items]
			};
		default:
			return state;
	}
};

export default playlistReducer;
