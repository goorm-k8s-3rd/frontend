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
	Media,
	NavbarBrand,
	Navbar,
	Nav,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { useRecoilState } from 'recoil';

import { userState } from 'recoils/user.js';

const UserButtonView = () => {
	const [{ isLogin }, setUserState] = useRecoilState(userState);

	const useUserLogin = async e => {
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

			setUserState(oldState => ({
				...oldState,
				userId: '',
				isLogin: false,
				token: '',
			}));
		} catch (err) {
			setUserState(oldState => ({
				...oldState,
				userId: '',
				isLogin: false,
				token: '',
			}));
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
					<DropdownItem onClick={useUserLogin}>로그아웃</DropdownItem>
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
							<Nav className="navbar-nav-hover align-items-lg-center" navbar>
								<UncontrolledDropdown nav>
									<DropdownToggle nav>
										<i className="ni ni-ui-04 d-lg-none mr-1" />
										<span className="nav-link-inner--text">Components</span>
									</DropdownToggle>
									<DropdownMenu className="dropdown-menu-xl">
										<div className="dropdown-menu-inner">
											<Media
												className="d-flex align-items-center"
												href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/overview?ref=adsr-navbar"
												target="_blank"
											>
												<div className="icon icon-shape bg-gradient-primary rounded-circle text-white">
													<i className="ni ni-spaceship" />
												</div>
												<Media body className="ml-3">
													<h6 className="heading text-primary mb-md-1">
														Getting started
													</h6>
													<p className="description d-none d-md-inline-block mb-0">
														Learn how to use Argon compiling Scss, change brand colors and
														more.
													</p>
												</Media>
											</Media>
											<Media
												className="d-flex align-items-center"
												href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/colors?ref=adsr-navbar"
												target="_blank"
											>
												<div className="icon icon-shape bg-gradient-success rounded-circle text-white">
													<i className="ni ni-palette" />
												</div>
												<Media body className="ml-3">
													<h6 className="heading text-primary mb-md-1">Foundation</h6>
													<p className="description d-none d-md-inline-block mb-0">
														Learn more about colors, typography, icons and the grid system
														we used for Argon.
													</p>
												</Media>
											</Media>
											<Media
												className="d-flex align-items-center"
												href="https://demos.creative-tim.com/argon-design-system-react/#/documentation/alert?ref=adsr-navbar"
												target="_blank"
											>
												<div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
													<i className="ni ni-ui-04" />
												</div>
												<Media body className="ml-3">
													<h5 className="heading text-warning mb-md-1">Components</h5>
													<p className="description d-none d-md-inline-block mb-0">
														Browse our 50 beautiful handcrafted components offered in the
														Free version.
													</p>
												</Media>
											</Media>
										</div>
									</DropdownMenu>
								</UncontrolledDropdown>
								<UncontrolledDropdown nav>
									<DropdownToggle nav>
										<i className="ni ni-collection d-lg-none mr-1" />
										<span className="nav-link-inner--text">Examples</span>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem to="/landing" tag={Link}>
											Landing
										</DropdownItem>
										<DropdownItem to="/profile" tag={Link}>
											Profile
										</DropdownItem>
										<DropdownItem to="/login" tag={Link}>
											Login
										</DropdownItem>
										<DropdownItem to="/register" tag={Link}>
											Register
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
							<UserButtonView />
						</UncontrolledCollapse>
					</Container>
				</Navbar>
			</header>
		</>
	);
}

export default DemoNavbar;
