import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookie = new Cookies();

export const setCookie = (name, value, option = {}) => {
	return cookie.set(name, value, { ...option });
};

export const getCookie = name => {
	return cookie.get(name);
};

export const deleteCookie = name => {
	return cookie.remove(name);
};

export const setAxiosAuthorization = data => {
	if (data) {
		axios.defaults.headers.common['Authorization'] = data;
	} else if (!data && axios.defaults.headers.common['Authorization']) {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export const deleteExpiredToken = error => {
	if (error?.response?.status === 404) {
		setAxiosAuthorization();
		deleteCookie('token');
		window.location.href = '/';
	}
};
