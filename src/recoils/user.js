import { atom } from 'recoil';

export const myNickname = atom({
	key: 'myNickname',
	default: '',
});

export const isLoggedIn = atom({
	key: 'isLoggedIn',
	default: false,
});
