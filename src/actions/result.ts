import {
	SET_ALBUMS,
	ADD_ALBUMS,
	SET_ARTISTS,
	ADD_ARTISTS,
	SET_TRACKS,
	ADD_TRACKS,
	SET_PLAYLIST,
	ADD_PLAYLIST
} from '../utils/constants';
import { get } from '../utils/api';

export const setAlbums = (albums: any) => ({
	type: SET_ALBUMS,
	albums
});

export const addAlbums = (albums: any) => ({
	type: ADD_ALBUMS,
	albums
});

export const setArtists = (artists: any) => ({
	type: SET_ARTISTS,
	artists
});

export const addArtists = (artists: any) => ({
	type: ADD_ARTISTS,
	artists
});

export const setTracks = (tracks: any) => ({
	type: SET_TRACKS,
	tracks
});

export const addTracks = (tracks: any) => ({
	type: ADD_TRACKS,
	tracks
});

export const setPlayList = (playlists: any) => ({
	type: SET_PLAYLIST,
	playlists
});

export const addPlaylist = (playlists: any) => ({
	type: ADD_PLAYLIST,
	playlists
});

export const initiateGetResult = (searchTerm: string) => {
	return async (dispatch: (arg0: { type: string; albums?: any; artists?: any; playlists?: any; }) => void) => {
		try {
			const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(searchTerm)}&type=album,playlist,artist,track`;
			const searchKey = searchTerm.replace(/\s/g, "");
			const prevResult = sessionStorage.getItem(searchKey);
			let result;

			if (prevResult) {
				result = JSON.parse(prevResult);
			} else {
				result = await get(API_URL);
				sessionStorage.setItem(searchKey, JSON.stringify(result));
			}

			const {albums, artists, tracks, playlists} = result;
			dispatch(setAlbums(albums));
			dispatch(setArtists(artists));
			dispatch(setTracks(tracks));
			return dispatch(setPlayList(playlists));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const initiateLoadMoreAlbums = (url: any) => {
	return async (dispatch: (arg0: { type: string; albums: any; }) => any) => {
		try {
			const result = await get(url);
			return dispatch(addAlbums(result.albums));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const initiateLoadMoreArtists = (url: any) => {
	return async (dispatch: (arg0: { type: string; artists: any; }) => any) => {
		try {
			const result = await get(url);
			return dispatch(addArtists(result.artists));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const initiateLoadMoreTracks = (url: any) => {
	return async (dispatch: (arg0: { type: string; tracks: any; }) => any) => {
		try {
			const result = await get(url);
			return dispatch(addTracks(result.tracks));
		} catch (error) {
			console.log('error', error);
		}
	};
};

export const initiateLoadMorePlaylist = (url: any) => {
	return async (dispatch: (arg0: { type: string; playlists: any; }) => any) => {
		try {
			const result = await get(url);
			return dispatch(addPlaylist(result.playlists));
		} catch (error) {
			console.log('error', error);
		}
	};
};
