import BookInfoViewList from 'components/List/BookInfoList';
import DemoNavbar from 'components/Navbars/DemoNavbar';
import React, { useEffect, useRef } from 'react';

// reactstrap components
import { Container, Row, Col } from 'reactstrap';

const Hero = () => {
	const mainRef = useRef(null);

	useEffect(() => {
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
									<Col className="text-center" lg="6">
										<div style={{ paddingBottom: '60px' }}></div>
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
									<BookInfoViewList
										bookList={Array.from({ length: 6 }, (_, i) => ({
											title: `제목${i}`,
											authors: `저자${i}`,
											isbn: i,
											thumbnail:
												'https://image.yes24.com/momo/TopCate0001/kepub/L_195737.jpg',
											total_ratin: ((i + 1) / 3).toFixed(2),
										}))}
										rowPerCnt={6}
									/>
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
