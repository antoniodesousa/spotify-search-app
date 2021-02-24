import React from 'react';
import { Card } from 'react-bootstrap';
import music from '../images/music.jpeg';

const ArtistsList = ({artists}: any) => {
	return (
		<>
			{Object.keys(artists).length > 0 && (
				<div className="artists">
					{artists.items.map((artist: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<Card style={{width: '288px'}}>
									<a
										target="_blank"
										href={artist.external_urls.spotify}
										rel="noopener noreferrer"
										className="card-image-link"
									>
										{artist.images?.length ? (
											<Card.Img
												variant="top"
												src={artist.images[0].url}
												alt=""
											/>
										) : (
											<img src={music} alt=""/>
										)}
									</a>
									<Card.Body>
										<Card.Title>{artist.name}</Card.Title>
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

export default ArtistsList;
