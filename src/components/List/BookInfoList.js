import React from 'react';
import { Badge, Card, CardBody, CardImg, Col, Row } from 'reactstrap';

const BookInfoViewList = ({ bookList, rowPerCnt }) => {
	return (
		<>
			{Array.from({ length: Math.ceil(bookList.length / rowPerCnt) }, (_, i) => {
				return (
					<Row key={`row${i}`} className="row-grid">
						{bookList
							.slice(i * rowPerCnt, i * rowPerCnt + rowPerCnt)
							.map((bookInfo, key) => (
								<Col key={key} lg={Math.floor(12 / rowPerCnt)}>
									<Card
										className="card-lift--hover shadow border-0"
										style={{ cursor: 'pointer' }}
										onClick={() => {
											console.log(bookInfo.isbn);
										}}
									>
										<CardImg
											alt="..."
											src={bookInfo.thumbnail}
											style={{ height: '300px' }}
											top
										/>
										<CardBody className="py-3">
											<h6 className="text-primary text-uppercase">{bookInfo.title}</h6>
											<div>
												<Badge color="primary" pill className="mr-1">
													Rating: {bookInfo.total_ratin}
												</Badge>
											</div>
										</CardBody>
									</Card>
								</Col>
							))}
					</Row>
				);
			})}
		</>
	);
};

export default BookInfoViewList;
