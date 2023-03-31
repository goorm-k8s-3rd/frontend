import axios from 'axios';
import BookInfoViewList from 'components/List/BookInfoList';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import { api } from 'config';
import React, { useEffect, useRef, useState } from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';
import { deleteExpiredToken } from 'util/auth';

const Hero = () => {
	const mainRef = useRef(null);
	const [recentList, setRecentList] = useState([]);

	useEffect(() => {
		axios
			.get(`${api}/book/recent`)
			.then(({ data }) => {
				console.log(data);
				setRecentList(data);
			})
			.catch(err => {
				deleteExpiredToken(err);
			});
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainRef.current.scrollTop = 0;
	}, []);

	return (
		<>
			<DemoNavbar />
			<main ref={mainRef}>
				<div className="position-relative">
					<section className="section section-hero section-shaped">
						{/* Background circles */}
						<div className="shape shape-style-1 shape-default">
							<img
								src={require('assets/img/theme/book1.jpg')}
								alt="..."
								style={{ width: '100%', height: '100%' }}
							/>
						</div>
						<Container className="shape-container d-flex align-items-center py-lg">
							<div className="col px-0">
								<Row className="align-items-center justify-content-center">
									<Col
										style={{ marginTop: '60px', marginBottom: '60px' }}
										className="text-center"
										lg="6"
									>
										<h1 style={{ color: 'white' }}>Book Network</h1>
										<p
											style={{
												fontSize: '1rem',
											}}
											className="lead text-white"
										>
											책을 읽고 리뷰하는 공간으로 읽은 책을 찾고 리뷰를 남겨보세요!
										</p>
										<div className="mt-5">
											<small className="text-white font-weight-bold mb-0 mr-2">
												&proudly coded by 3부상조
											</small>
										</div>
									</Col>
								</Row>
							</div>
						</Container>
						{/* SVG separator */}
						<div className="separator separator-bottom separator-skew zindex-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								preserveAspectRatio="none"
								version="1.1"
								viewBox="0 0 2560 100"
								x="0"
								y="0"
							>
								<polygon className="fill-white" points="2560 0 2560 100 0 100" />
							</svg>
						</div>
					</section>
					<section className="section">
						<Container>
							<h3>최근 리뷰</h3>
							<Row className="justify-content-center">
								<Col lg="12">
									<BookInfoViewList bookList={recentList} rowPerCnt={6} />
								</Col>
							</Row>
						</Container>
					</section>
				</div>
			</main>
		</>
	);
};

export default Hero;
