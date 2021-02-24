import axios from 'axios';

export const getParamValues = (url: string) => {
	return url
		.slice(1)
		.split('&')
		.reduce((prev: Record<string, string>, curr: string) => {
			const [title, value] = curr.split('=');
			prev[title] = value;
			return prev;
		}, {});
};

export const setAuthHeader = () => {
	try {
		const params = JSON.parse(localStorage.getItem('params') as string);
		if (params) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${params.access_token}`;
		}
	} catch (error) {
		console.log('Error setting auth', error);
	}
};
