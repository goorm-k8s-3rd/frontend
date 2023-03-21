import Index from 'views/Index.js';
import Search from 'views/examples/Search.js';
import Login from 'views/examples/Login.js';
import Profile from 'views/examples/Profile.js';
import Register from 'views/examples/Register.js';
import ErrorPage from 'views/examples/404';
import Detail from 'views/examples/Detail';

const dashboardRouteInfo = {
	index: {
		path: '/',
		name: 'Index',
		component: Index,
		isLoginRequired: false,
		isLogoutRequired: false,
	},
	search: {
		path: '/search',
		name: 'Search',
		component: Search,
		isLoginRequired: false,
		isLogoutRequired: false,
	},
	login: {
		path: '/login',
		name: 'Login',
		component: Login,
		isLoginRequired: false,
		isLogoutRequired: true,
	},
	profile: {
		path: '/profile',
		name: 'Profile',
		component: Profile,
		isLoginRequired: true,
		isLogoutRequired: false,
	},
	register: {
		path: '/register',
		name: 'Register',
		component: Register,
		isLoginRequired: false,
		isLogoutRequired: true,
	},
	detail: {
		path: '/detail/:id',
		name: 'Detail',
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
