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
import React from 'react';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

function Hero() {
	return (
		<>
			<div className="position-relative">
				{/* Hero for FREE version */}
				<section className="section section-hero section-shaped">
					{/* Background circles */}
					<div className="shape shape-style-1 shape-default">
						<img src={require('assets/img/theme/book1.jpg')} />
					</div>
					<Container className="shape-container d-flex align-items-center py-lg">
						<div className="col px-0">
							<Row className="align-items-center justify-content-center">
								<Col className="text-center" lg="6">
									<div style={{ paddingBottom: '60px' }}></div>
									<h1 style={{ color: 'white' }}>Book Network</h1>
									{/* <img
											alt="..."
											className="img-fluid"
											src={require('assets/img/brand/argon-react-white.png')}
											style={{ width: '200px' }}
										/> */}
									<p
										style={{
											fontSize: '1rem',
										}}
										className="lead text-white"
									>
										책을 읽고 리뷰하는 공간으로 읽은 책을 찾고 리뷰를 남겨보세요!
									</p>
									{/* <div className="btn-wrapper mt-5">
											<Button
												className="btn-white btn-icon mb-3 mb-sm-0"
												color="default"
												href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
												size="lg"
											>
												<span className="btn-inner--icon mr-1">
													<i className="ni ni-cloud-download-95" />
												</span>
												<span className="btn-inner--text">Download React</span>
											</Button>{' '}
											<Button
												className="btn-icon mb-3 mb-sm-0"
												color="github"
												href="https://github.com/creativetimofficial/argon-design-system-react"
												size="lg"
												target="_blank"
											>
												<span className="btn-inner--icon mr-1">
													<i className="fa fa-github" />
												</span>
												<span className="btn-inner--text">
													<span className="text-warning mr-1">Star us</span>
													on Github
												</span>
											</Button>
										</div> */}
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
			</div>
		</>
	);
}

export default Hero;
