import React from 'react';
import { Card } from 'react-bootstrap';
import music from '../images/music.jpeg';

const PlayList = ({playlist}: any) => {
	return (
		<>
			{Object.keys(playlist).length > 0 && (
				<div className="playlist">
					{playlist.items.map((item: any, index: number) => {
						return (
							<React.Fragment key={index}>
								<Card style={{width: '288px'}}>
									<a
										target="_blank"
										href={item.external_urls.spotify}
										rel="noopener noreferrer"
										className="card-image-link"
									>
										{item.images?.length ? (
											<Card.Img variant="top" src={item.images[0].url} alt=""/>
										) : (
											<img src={music} alt=""/>
										)}
									</a>
									<Card.Body>
										<Card.Title>{item.name}</Card.Title>
										<Card.Text>
											<small>By {item.owner.display_name}</small>
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

export default PlayList;
