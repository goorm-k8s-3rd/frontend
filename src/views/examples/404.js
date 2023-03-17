import React from 'react';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import SimpleFooter from 'components/Footers/SimpleFooter.js';

const ErrorPage = () => {
	return (
		<>
			<DemoNavbar />
			<main>
				<section className="section section-shaped section-lg" style={{ height: '100%' }}>
					<div className="shape shape-style-1 bg-gradient-default">
						<img
							src={require('assets/img/theme/book1.jpg')}
							style={{ width: '100%', height: '100%' }}
						/>
					</div>
				</section>
				<section className="section section-lg">
					<Container>
						<Row className="row-grid justify-content-center">
							<Col className="text-center" lg="8">
								<h2 className="display-3">
									<span className="text-danger">404 Page</span>
								</h2>
								<p className="lead">잘못된 경로입니다.</p>
								<div className="btn-wrapper">
									<Button className="mb-3 mb-sm-0" color="primary" href="/">
										Home
									</Button>
								</div>
							</Col>
						</Row>
					</Container>
				</section>
			</main>
			<SimpleFooter />
		</>
	);
};

export default ErrorPage;
