import React, { useState } from 'react';
import {
	initiateGetResult,
	initiateLoadMoreAlbums,
	initiateLoadMorePlaylist,
	initiateLoadMoreTracks,
	initiateLoadMoreArtists
} from '../actions/result';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SearchResult from './SearchResult';
import SearchForm from './SearchForm';
import Header from './Header';
import Loader from './Loader';

interface IDashboard {
	dispatch?: any;
	isValidSession?: any;
	history?: any;
	albums?: any;
	artists?: any;
	tracks?: any;
	playlist?: any;
}

const Dashboard = (props: IDashboard) => {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('albums');
	const {isValidSession, history} = props;

	const handleSearch = (searchTerm: string) => {
		if (isValidSession()) {
			setIsLoading(true);
			props.dispatch(initiateGetResult(searchTerm)).then(() => {
				setIsLoading(false);
				setSelectedCategory('albums');
			});
		} else {
			history.push({
				pathname: '/',
				state: {
					session_expired: true
				}
			});
		}
	};

	const loadMore = async (type: string) => {
		if (isValidSession()) {
			const {dispatch, albums, artists, tracks, playlist} = props;
			setIsLoading(true);
			switch (type) {
				case 'albums':
					await dispatch(initiateLoadMoreAlbums(albums.next));
					break;
				case 'artists':
					await dispatch(initiateLoadMoreArtists(artists.next));
					break;
				case 'tracks':
					await dispatch(initiateLoadMoreTracks(tracks.next));
					break;
				case 'playlist':
					await dispatch(initiateLoadMorePlaylist(playlist.next));
					break;
				default:
			}
			setIsLoading(false);
		} else {
			history.push({
				pathname: '/',
				state: {
					session_expired: true
				}
			});
		}
	};

	const setCategory = (category: string) => {
		setSelectedCategory(category);
	};

	const {albums, artists, tracks, playlist} = props;
	const result = {albums, artists, tracks, playlist};

	return (
		<>
			{isValidSession() ? (
				<div>
					<Header/>
					<SearchForm handleSearch={handleSearch}/>
					<Loader show={isLoading}>Loading...</Loader>
					<SearchResult
						result={result}
						loadMore={loadMore}
						setCategory={setCategory}
						selectedCategory={selectedCategory}
						isValidSession={isValidSession}
					/>
				</div>
			) : (
				<Redirect
					to={{
						pathname: '/',
						state: {
							session_expired: true
						}
					}}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state: { albums: any; artists: any; tracks: any; playlist: any; }) => {
	return {
		albums: state.albums,
		artists: state.artists,
		tracks: state.tracks,
		playlist: state.playlist
	};
};

export default connect(mapStateToProps)(Dashboard);
