/*!

=========================================================
* Argon Design System React - v1.1.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
	Button,
	UncontrolledCollapse,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { useRecoilState } from 'recoil';

import { userState } from 'recoils/user.js';
import { setAxiosAuthorization } from 'util/auth';
import axios from 'axios';
import { deleteCookie } from 'util/auth';

const UserButtonView = () => {
	const [{ isLogin }, setUserState] = useRecoilState(userState);

	const useUserLogout = async e => {
		e.preventDefault();
		try {
			const promiseFunc = () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({ code: 200 });
						// reject({ code: 400, errorMessage: '에러내용' });
					}, 1000);
				});
			};
			await promiseFunc();
			// await axios.get(`http://......./auth/logout`, {
			// 	withCredentials: true,
			// });
			// setAxiosAuthorization();
			// deleteCookie('token');

			setUserState(oldState => ({
				...oldState,
				userId: '',
				isLogin: false,
			}));
		} catch (err) {
			console.log(err);
		}
	};

	const onClickSearch = () => {
		window.location.href = '/search';
	};

	return isLogin ? (
		<Nav className="navbar-nav-hover align-items-lg-center ml-lg-auto" navbar>
			<i
				className="ni ni-zoom-split-in"
				style={{
					color: 'white',
					paddingRight: '3px',
					cursor: 'pointer',
				}}
				onClick={onClickSearch}
			/>
			<span
				className="nav-link-inner--text"
				style={{
					color: 'white',
					cursor: 'pointer',
				}}
				onClick={onClickSearch}
			>
				_________
			</span>
			<UncontrolledDropdown nav>
				<DropdownToggle nav>
					<Button className="align-content-center">
						<i className="ni ni-circle-08" />내 정보
					</Button>
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem to="/profile" tag={Link}>
						프로필
					</DropdownItem>
					<DropdownItem onClick={useUserLogout}>로그아웃</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		</Nav>
	) : (
		<Nav className="align-items-lg-center ml-lg-auto" navbar>
			<Button className="btn-neutral btn-icon" color="default" href="/login">
				<span className="nav-link-inner--text">로그인</span>
			</Button>
			<Button className="btn-neutral btn-icon" color="default" href="/register">
				<span className="nav-link-inner--text">회원가입</span>
			</Button>
		</Nav>
	);
};

function DemoNavbar() {
	const [collapseClasses, setCollapseClasses] = useState('');

	const onExiting = () => {
		setCollapseClasses('collapsing-out');
	};

	const onExited = () => {
		setCollapseClasses('');
	};

	useEffect(() => {
		const headroom = new Headroom(document.getElementById('navbar-main'));
		// initialise
		headroom.init();
	});

	return (
		<>
			<header className="header-global">
				<Navbar
					className="navbar-main navbar-transparent navbar-light headroom"
					expand="lg"
					id="navbar-main"
				>
					<Container>
						<NavbarBrand className="mr-lg-5" to="/" tag={Link}>
							<img
								alt="..."
								src={require('assets/img/brand/BNetwork.png')}
								style={{ width: '120px', height: '50px' }}
							/>
						</NavbarBrand>
						<button className="navbar-toggler" id="navbar_global">
							<span className="navbar-toggler-icon" />
						</button>
						<UncontrolledCollapse
							toggler="#navbar_global"
							navbar
							className={collapseClasses}
							onExiting={onExiting}
							onExited={onExited}
						>
							<div className="navbar-collapse-header">
								<Row>
									<Col className="collapse-brand" xs="6">
										<Link to="/">
											<img alt="..." src={require('assets/img/brand/argon-react.png')} />
										</Link>
									</Col>
									<Col className="collapse-close" xs="6">
										<button className="navbar-toggler" id="navbar_global">
											<span />
											<span />
										</button>
									</Col>
								</Row>
							</div>
							<UserButtonView />
						</UncontrolledCollapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
}

export default DemoNavbar;
