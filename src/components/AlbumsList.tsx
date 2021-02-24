import React from 'react';
import { Card } from 'react-bootstrap';
import music from '../images/music.jpeg';

const AlbumsList = ({albums}: any) => {
	return (
		<>
			{Object.keys(albums).length > 0 && (
				<div className="albums">
					{albums.items.map((album: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<Card style={{width: '288px'}}>
									<a
										target="_blank"
										href={album.external_urls.spotify}
										rel="noopener noreferrer"
										className="card-image-link"
									>
										{album.images?.length ? (
											<Card.Img
												variant="top"
												src={album.images[0].url}
												alt=""
											/>
										) : (
											<img src={music} alt=""/>
										)}
									</a>
									<Card.Body>
										<Card.Title>{album.name}</Card.Title>
										<Card.Text>
											<small>
												{album.artists.map((artist: { name: any; }) => artist.name).join(', ')}
											</small>
										</Card.Text>
									</Card.Body>
								</Card>
							</React.Fragment>
						);
					})}
				</div>
			)}
		</>
	);
};

export default AlbumsList;
