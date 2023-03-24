import React from 'react';

// reactstrap components
import { Button, Container, Row, Col, Card, CardBody, CardFooter } from 'reactstrap';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';

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
							alt="..."
						/>
					</div>
					<Container className="pt-lg-7">
						<Row className="row-grid justify-content-center">
							<Col className="text-center" lg="8">
								<Card className="bg-secondary shadow border-0">
									<h2
										style={{
											paddingTop: '10px',
										}}
									>
										<span className="text-danger">
											<b>404 Error</b>
										</span>
									</h2>
									<CardBody className="px-lg-5 py-lg-5">잘못된 경로입니다.</CardBody>
									<CardFooter>
										<Button className="mb-3 mb-sm-0" color="primary" href="/">
											Home
										</Button>
									</CardFooter>
								</Card>
							</Col>
						</Row>
					</Container>
				</section>
				<section className="section section-lg"></section>
			</main>
		</>
	);
};

export default ErrorPage;
