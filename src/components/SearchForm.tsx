import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface ExtendedWindow extends Window {
	webkitSpeechRecognition: any;
}

declare var window: ExtendedWindow;

const agent = window.navigator.userAgent.toLowerCase();
const isChrome = agent.indexOf("edg") === -1 && agent.indexOf("chrome") > -1;

const SearchForm = (props: { handleSearch: (arg0: string) => void; }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const [isSpeech, setSpeech] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value;
		setSearchTerm(searchTerm);
	};

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (searchTerm.trim() !== '') {
			setErrorMsg('');
			props.handleSearch(searchTerm);
		} else {
			setErrorMsg('Please enter a search criteria.');
		}
	};

	const handleSpeechRecognition = () => {
		const SpeechRecognition = window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();

		recognition.onstart = function () {
			setSpeech(true);
		};

		recognition.onend = function () {
			setSpeech(false);
			recognition.stop();
		};

		recognition.onresult = function (event: any) {
			for (let i = event.resultIndex; i < event.results.length; ++i) {
				if (event?.results[i].isFinal) {
					const searchTerm = event?.results[i][0].transcript;
					setSearchTerm(searchTerm);
				}
			}
		};

		recognition.start();
	}

	return (
		<div className={'search-form'}>
			<Form onSubmit={handleSearch}>
				{errorMsg && <p className="errorMsg">{errorMsg}</p>}
				<Form.Group>
					<Form.Label>Enter search criteria</Form.Label>
					<Form.Control
						type="search"
						name="searchTerm"
						value={searchTerm}
						className={'search-term'}
						placeholder="Search for album, artist, track or playlist"
						onChange={handleInputChange}
						autoComplete="on"
					/>
				</Form.Group>
				<Button variant="info" type="submit">
					Search
				</Button>
				{isChrome && window.webkitSpeechRecognition && (
					<Button type="button"
					        className={isSpeech ? 'speech-active' : ''}
					        variant="primary"
					        onClick={handleSpeechRecognition}>
						Speech
					</Button>
				)}
			</Form>
		</div>
	);
};

export default SearchForm;
