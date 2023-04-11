import { Cookies } from 'react-cookie';
import axios, { AxiosError } from 'axios';

const cookie = new Cookies();

/**
 * 쿠키 설정
 * @param {string} name
 * @param {string} value
 */
export const setCookie = (name, value) => {
	return cookie.set(name, value);
};

/**
 * 쿠키 name 값에 해당하는 데이터 가져오기
 * @param {string} name
 */
export const getCookie = name => {
	return cookie.get(name);
};

/**
 * 쿠키 name 값에 해당하는 데이터 삭제
 * @param {string} name 쿠키 name 값
 */
export const deleteCookie = name => {
	return cookie.remove(name);
};

/**
 * Axios Default 설정에서 Header쪽 Authorization 수정
 * @param {string} data 빈 값을 보내줄 시 설정 해제
 */
export const setAxiosAuthorization = data => {
	if (data) {
		axios.defaults.headers.common['Authorization'] = data;
	} else if (!data && axios.defaults.headers.common['Authorization']) {
		delete axios.defaults.headers.common['Authorization'];
	}
};

/**
 * 토큰 만료시 쿠키에서 token 데이터 삭제 및 Axios 기본값 재설정
 * @param {AxiosError} error axios error메시지
 */
export const deleteExpiredToken = error => {
	if (error?.response?.status === 404) {
		setAxiosAuthorization();
		deleteCookie('token');
		window.location.href = '/';
	}
};
Footer;
