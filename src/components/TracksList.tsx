import React from 'react';
import { Card } from 'react-bootstrap';
import music from '../images/noimage.jpeg';

const TracksList = ({tracks}: any) => {
	return (
		<>
			{Object.keys(tracks).length > 0 && (
				<div className="tracks">
					{tracks.items.map((item: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<Card style={{width: '288px'}}>
									<a
										target="_blank"
										href={item.external_urls.spotify}
										rel="noopener noreferrer"
										className="card-image-link"
									>
										{item.album?.images?.length ? (
											<Card.Img variant="top" src={item.album.images[0].url} alt=""/>
										) : (
											<img src={music} alt=""/>
										)}
									</a>
									<Card.Body>
										<Card.Title>{item.name}</Card.Title>
										<Card.Text>
											<small>By {item.album.artists[0].name}</small>
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

export default TracksList;
