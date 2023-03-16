import { atom } from 'recoil';

export const userState = atom({
	key: 'userState',
	default: {
		userId: '',
		isLogin: false,
		token: '',
	},
});
