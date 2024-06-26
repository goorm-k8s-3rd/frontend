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
import React, { useCallback, useEffect, useRef, useState, memo } from 'react';

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { useRecoilState } from 'recoil';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import { userState } from 'recoils/user';
import axios from 'axios';
import { setCookie } from 'util/auth';
import { setAxiosAuthorization } from 'util/auth';
import { api } from 'config';

const ErrorMessageView = memo(({ errorMessage }) => {
	if (!errorMessage) return null;
	return (
		<div className="text-muted font-italic">
			<small>
				에러:
				<span className="text-danger font-weight-700">{errorMessage}</span>
			</small>
		</div>
	);
});

const FormDataView = memo(({ onChange }) => {
	return (
		<>
			<FormGroup className="mb-3">
				<InputGroup className="input-group-alternative">
					<InputGroupAddon addonType="prepend">
						<InputGroupText>
							<i className="ni ni-circle-08" />
						</InputGroupText>
					</InputGroupAddon>
					<Input placeholder="id" name="username" onChange={onChange} required />
				</InputGroup>
			</FormGroup>
			<FormGroup>
				<InputGroup className="input-group-alternative">
					<InputGroupAddon addonType="prepend">
						<InputGroupText>
							<i className="ni ni-lock-circle-open" />
						</InputGroupText>
					</InputGroupAddon>
					<Input
						placeholder="Password"
						type="password"
						name="password"
						autoComplete="off"
						onChange={onChange}
						required
					/>
				</InputGroup>
			</FormGroup>
		</>
	);
});

const Login = memo(() => {
	const mainRef = useRef(null);
	const [currentUserState, setUserState] = useRecoilState(userState);

	if (currentUserState.isLogin) {
		window.location.href = '/';
	}
	const [userInfo, setUserInfo] = useState({
		username: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const onChange = useCallback(
		e => {
			const { name, value } = e.target;
			setUserInfo({ ...userInfo, [name]: value });
		},
		[userInfo],
	);

	const useUserLogin = async e => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${api}/auth/token`, userInfo, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});
			if (data) {
				setAxiosAuthorization(`${data.token_type} ${data.access_token}`);
				setCookie('token', `${data.token_type} ${data.access_token}`);
				setUserState(oldState => ({
					...oldState,
					userId: userInfo.username,
					isLogin: true,
				}));
			}
		} catch (err) {
			setUserState(oldState => ({
				...oldState,
				userId: '',
				isLogin: false,
			}));
			setErrorMessage(err?.response?.data?.msg ?? '');
		}
	};

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainRef.current.scrollTop = 0;
	}, []);

	return (
		<>
			<DemoNavbar />
			<main ref={mainRef}>
				<section className="section section-shaped section-lg" style={{ height: '100%' }}>
					<div className="shape shape-style-1 bg-gradient-default">
						<img
							src={require('assets/img/theme/book1.jpg')}
							alt="..."
							style={{ width: '100%', height: '100%' }}
						/>
					</div>
					<Container className="pt-lg-7">
						<Row className="justify-content-center">
							<Col lg="5">
								<Card className="bg-secondary shadow border-0">
									<CardHeader>
										<span>
											<b>로그인</b>
										</span>
									</CardHeader>
									<CardBody className="px-lg-5 py-lg-5">
										<Form onSubmit={useUserLogin}>
											<FormDataView onChange={onChange}></FormDataView>
											<ErrorMessageView errorMessage={errorMessage}></ErrorMessageView>
											<div className="text-center">
												<Button className="my-4" color="primary" type="submit">
													로그인
												</Button>
											</div>
										</Form>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
		</>
	);
});

export default Login;
