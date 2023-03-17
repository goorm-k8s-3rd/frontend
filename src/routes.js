import Index from 'views/Index.js';
import Landing from 'views/examples/Landing.js';
import Login from 'views/examples/Login.js';
import Profile from 'views/examples/Profile.js';
import Register from 'views/examples/Register.js';

const dashboardRouteInfo = {
	index: {
		path: '/',
		name: 'Index',
		component: Index,
		isLoginRequired: false,
	},
	landing: {
		path: '/landing',
		name: 'Landing',
		component: Landing,
		isLoginRequired: false,
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
	},
	register: {
		path: '/register',
		name: 'Register',
		component: Register,
		isLoginRequired: false,
		isLogoutRequired: true,
	},
};

export default dashboardRouteInfo;
