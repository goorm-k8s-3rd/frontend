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
import React, { useEffect, useRef, useState } from 'react';

// reactstrap components
import {
	Card,
	Container,
	Nav,
	NavItem,
	NavLink,
	CardBody,
	TabContent,
	TabPane,
	Badge,
	CardImg,
	Row,
	Col,
} from 'reactstrap';

// core components
import classNames from 'classnames';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import BookInfoViewList from 'components/List/BookInfoList';
import dashboardRouteInfo from 'routes';
import axios from 'axios';

const reviewPromiseFunc = () => {
	return new Promise(res => {
		setTimeout(() => {
			res(
				Array.from({ length: 13 }, (_, i) => ({
					isbn: i,
					title: `이름${i}`,
					rate: ((i + 1) / 3).toFixed(2),
					comment:
						'리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰',
					like: i * 3,
					dislike: i,
					thumbnail:
						'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6080832%3Ftimestamp%3D20230322161657',
				})),
			);
		}, 1000);
	});
};

const myInterestPromiseFunc = () => {
	return new Promise(res => {
		setTimeout(() => {
			res(
				Array.from({ length: 13 }, (_, i) => ({
					title: `책이름1${i}`,
					authors: `저자${i}`,
					thumbnail:
						'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6080832%3Ftimestamp%3D20230322161657',
					url: 'https://search.daum.net/search?w=bookpage&bookId=6080832&q=%ED%98%BC%EC%9E%90+%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94+%ED%8C%8C%EC%9D%B4%EC%8D%AC',
					isbn: i,
					rate: ((i + 1) / 3).toFixed(2),
				})),
			);
		}, 1000);
	});
};

const MyReview = ({ reviewList }) => {
	const detailPath = dashboardRouteInfo.detail.path.split(':')[0];

	return (
		<>
			{reviewList.length ? (
				reviewList.map((review, i) => (
					<Card
						onClick={() => {
							window.location.href = `${detailPath}${review.isbn}`;
						}}
						key={i}
						className="shadow shadow-lg--hover mt-5"
						style={{ cursor: 'pointer' }}
					>
						<CardBody>
							<div className="d-flex px-3">
								<div className="d-flex flex-column">
									<CardImg
										alt="..."
										src="https://image.yes24.com/momo/TopCate0001/kepub/L_195737.jpg"
										style={{ height: '200px', width: '130px' }}
									/>
									{review.title}
								</div>
								<div className="pl-4 md text-left">
									<Badge color="primary" pill className="mr-1">
										My Rating: {review.rate}
									</Badge>
									<Badge color="danger" pill className="mr-1">
										<i className="ni ni-bold-up" /> {review.like}
									</Badge>
									<Badge color="info" pill className="mr-1">
										<i className="ni ni-bold-down" /> {review.dislike}
									</Badge>
									<hr
										style={{
											marginTop: '10px',
											marginBottom: '10px',
										}}
									/>
									<p>{review.comment}</p>
								</div>
							</div>
						</CardBody>
					</Card>
				))
			) : (
				<Card className="bg-secondary shadow border-0">
					<CardBody className="px-lg-5 py-lg-5">작성된 리뷰가 없습니다</CardBody>
				</Card>
			)}
		</>
	);
};

const Profile = () => {
	const mainRef = useRef(null);
	const [tabs, setTabs] = useState(1);
	const [reviewList, setReviewList] = useState([]);
	const [interestList, setInterestList] = useState([]);
	const title = dashboardRouteInfo.profile.name;

	const toggleNavs = async index => {
		setTabs(index);
		if (index === 1) {
			const list = await reviewPromiseFunc();
			setReviewList(list);
		}
	};

	useEffect(() => {
		if (tabs === 1) {
			// axios.get(`http://......./review/user`,{withCredentials: true}).then(({data}) => {
			// 	setReviewList(data)
			// });
			reviewPromiseFunc().then(list => setReviewList(list));
		} else {
			myInterestPromiseFunc().then(list => setInterestList(list));
		}
	}, [tabs]);

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainRef.current.scrollTop = 0;
	}, []);

	return (
		<>
			<DemoNavbar />
			<main className="profile-page" ref={mainRef}>
				<section className="section section-lg section-shaped pb-300">
					<div className="shape shape-style-1 shape-default">
						<img
							src={require('assets/img/theme/book1.jpg')}
							style={{ width: '100%', height: '100%' }}
							alt="..."
						/>
					</div>
					<Container className="shape-container d-flex align-items-center">
						<div className="col px-0">
							<Row className="align-items-center justify-content-center">
								<Col style={{ marginTop: '60px' }} className="text-center" lg="6">
									<h1 style={{ color: 'white' }}>{title}</h1>
								</Col>
							</Row>
						</div>
					</Container>
				</section>
				<section>
					<Container>
						<div className="px-4">
							<div className="text-center mt-5">
								<Nav
									className="nav-fill flex-column flex-md-row"
									id="tabs-icons-text"
									pills
									role="tablist"
								>
									<NavItem>
										<NavLink
											aria-selected={tabs === 1}
											className={classNames('mb-sm-3 mb-md-0', {
												active: tabs === 1,
											})}
											onClick={e => {
												e.preventDefault();
												toggleNavs(1);
											}}
											href="#pablo"
											role="tab"
										>
											<i className="ni ni-cloud-upload-96 mr-2" />내 리뷰
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											aria-selected={tabs === 2}
											className={classNames('mb-sm-3 mb-md-0', {
												active: tabs === 2,
											})}
											onClick={e => {
												e.preventDefault();
												toggleNavs(2);
											}}
											href="#pablo"
											role="tab"
										>
											<i className="ni ni-bell-55 mr-2" />
											관심 작품
										</NavLink>
									</NavItem>
								</Nav>
								<Card className="shadow">
									<CardBody>
										<TabContent activeTab={'tabs' + tabs}>
											<TabPane tabId="tabs1">
												<MyReview reviewList={reviewList} />
											</TabPane>
											<TabPane tabId="tabs2">
												<BookInfoViewList bookList={interestList} rowPerCnt={4} />
											</TabPane>
										</TabContent>
									</CardBody>
								</Card>
							</div>
						</div>
					</Container>
				</section>
				<br />
			</main>
		</>
	);
};

export default Profile;
