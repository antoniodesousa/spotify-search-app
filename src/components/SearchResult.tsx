import React from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AlbumsList from './AlbumsList';
import ArtistsList from './ArtistsList';
import TracksList from './TracksList';
import PlayList from './PlayList';

interface ISearchResult {
	isValidSession: any;
	loadMore: any;
	result: any;
	setCategory: any;
	selectedCategory: any;
}

const SearchResult = (props: ISearchResult) => {
	const {
		isValidSession,
		loadMore,
		result,
		setCategory,
		selectedCategory
	} = props;
	const {albums, artists, tracks, playlist} = result;

	if (!isValidSession()) {
		return (
			<Redirect
				to={{
					pathname: '/',
					state: {
						session_expired: true
					}
				}}
			/>
		);
	}

	return (
		<>
			<div className="search-buttons">
				{albums.items?.length > 0 && (
					<button
						className={`${
							selectedCategory === 'albums' ? 'btn active' : 'btn'
						}`}
						onClick={() => setCategory('albums')}
					>
						Albums
					</button>
				)}
				{artists.items?.length > 0 && (
					<button
						className={`${
							selectedCategory === 'artists' ? 'btn active' : 'btn'
						}`}
						onClick={() => setCategory('artists')}
					>
						Artists
					</button>
				)}
				{tracks.items?.length > 0 && (
					<button
						className={`${
							selectedCategory === 'tracks' ? 'btn active' : 'btn'
						}`}
						onClick={() => setCategory('tracks')}
					>
						Tracks
					</button>
				)}
				{playlist.items?.length > 0 && (
					<button
						className={`${
							selectedCategory === 'playlist' ? 'btn active' : 'btn'
						}`}
						onClick={() => setCategory('playlist')}
					>
						PlayLists
					</button>
				)}
			</div>
			<div className={`${selectedCategory === 'albums' ? '' : 'hide'}`}>
				{albums && <AlbumsList albums={albums}/>}
			</div>
			<div className={`${selectedCategory === 'artists' ? '' : 'hide'}`}>
				{artists && <ArtistsList artists={artists}/>}
			</div>
			<div className={`${selectedCategory === 'tracks' ? '' : 'hide'}`}>
				{tracks && <TracksList tracks={tracks}/>}
			</div>
			<div className={`${selectedCategory === 'playlist' ? '' : 'hide'}`}>
				{playlist && <PlayList playlist={playlist}/>}
			</div>
			{result[selectedCategory] && result[selectedCategory].next && (
				<div className="load-more" onClick={() => loadMore(selectedCategory)}>
					<Button variant="info" type="button">
						Load More
					</Button>
				</div>
			)}
		</>
	);
};

export default SearchResult;
