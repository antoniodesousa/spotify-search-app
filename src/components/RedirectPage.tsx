import { useEffect } from 'react';
import { getParamValues } from '../utils/functions';

const RedirectPage = (props: any) => {
	const {setExpiryTime, history, location} = props;

	useEffect(() => {
		try {
			if (!location.hash) {
				return history.push('/dashboard');
			}

			const access_token = getParamValues(location.hash);
			const expiryTime = new Date().getTime() + parseInt(access_token.expires_in) * 1000;
			localStorage.setItem('params', JSON.stringify(access_token));
			localStorage.setItem('expiry_time', String(expiryTime));
			setExpiryTime(expiryTime);
			history.push('/dashboard');
		} catch (error) {
			history.push('/');
		}
	}, [setExpiryTime, location, history]);

	return null;
}

export default RedirectPage;
