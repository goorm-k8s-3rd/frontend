import Home from 'views/Home.js';
import Search from 'views/Search.js';
import Login from 'views/Login.js';
import Profile from 'views/Profile.js';
import Register from 'views/Register.js';
import ErrorPage from 'views/404';
import Detail from 'views/Detail';

const dashboardRouteInfo = {
	index: {
		path: '/',
		name: '메인 페이지',
		component: Home,
		isLoginRequired: false,
		isLogoutRequired: false,
	},
	search: {
		path: '/search',
		name: '검색',
		component: Search,
		isLoginRequired: false,
		isLogoutRequired: false,
	},
	login: {
		path: '/login',
		name: '로그인',
		component: Login,
		isLoginRequired: false,
		isLogoutRequired: true,
	},
	profile: {
		path: '/profile',
		name: 'My Profile',
		component: Profile,
		isLoginRequired: true,
		isLogoutRequired: false,
	},
	register: {
		path: '/register',
		name: '회원가입',
		component: Register,
		isLoginRequired: false,
		isLogoutRequired: true,
	},
	detail: {
		path: '/detail/:id',
		name: '리뷰',
		component: Detail,
		isLoginRequired: true,
		isLogoutRequired: false,
	},
	errorPage: {
		path: '/*',
		name: 'Error Page',
		component: ErrorPage,
		isLoginRequired: false,
		isLogoutRequired: false,
	},
};

export default dashboardRouteInfo;
