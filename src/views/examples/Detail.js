import DemoNavbar from 'components/Navbars/DemoNavbar';
import React, { useEffect, useRef, useState } from 'react';
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardImg,
	Col,
	Container,
	Form,
	Input,
	Row,
} from 'reactstrap';
import { Rating } from 'react-simple-star-rating';

const bookInfoPromiseFunc = id => {
	return new Promise(res => {
		setTimeout(() => {
			res({
				title: `책이름${id}`,
				authors: `저자${id}`,
				isbn: id,
				thumbnail: 'https://image.yes24.com/momo/TopCate0001/kepub/L_195737.jpg',
				total_ratin: 3.33,
				content:
					'내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내',
			});
		}, 1000);
	});
};

const commentPromiseFunc = contents => {
	return new Promise(res => {
		setTimeout(() => {
			res({ isSucceed: true });
		}, 1000);
	});
};

const OtherReview = ({ reviewList }) => {
	return (
		<>
			{reviewList.length ? (
				reviewList.map((review, i) => (
					<Card key={i} className="shadow shadow-lg--hover mt-5">
						<CardBody>
							<div className="d-flex px-3">
								<div className="pl-4 md text-left">
									<Badge color="primary" pill className="mr-1">
										My Rating: {review.rating}
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

const Detail = ({ match }) => {
	const [bookInfo, setBookInfo] = useState({});
	const [rating, setRating] = useState(0);
	const [reviewList, setReviewList] = useState([]);
	const commentRef = useRef(null);

	const onSubmitTitle = async name => {
		try {
			console.log(name);
			// setBookName(name);
			// const result = await promiseFunc(name, curPage);
			// setBookList(result);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		bookInfoPromiseFunc(match.params.id).then(result => setBookInfo(result));
	}, []);

	return (
		<>
			<DemoNavbar />
			<section className="section section-lg section-shaped pb-300">
				<div className="shape shape-style-1 shape-default">
					<img
						src={require('assets/img/theme/book1.jpg')}
						style={{ width: '100%', height: '100%' }}
					/>
				</div>
			</section>
			<section className="section bg-secondary">
				<Container>
					<Row className="row-grid align-items-top">
						<Col md="4">
							<img alt="" src={bookInfo.thumbnail} style={{ height: '500px' }}></img>
						</Col>
						<Col md="8">
							<div className="pl-md-5">
								<h2>{bookInfo.title}</h2>
								<small>{bookInfo.authors}</small>
								<p className="lead"></p>
								<hr
									style={{
										marginTop: '10px',
										marginBottom: '30px',
									}}
								/>
								<p>{bookInfo.content}</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section className="section bg-secondary">
				<Container>
					<h2>내 리뷰</h2>
					<Rating allowFraction transition onClick={setRating} />
					<Form
						onSubmit={e => {
							e.preventDefault();
							onSubmitTitle(e.target[0].value);
						}}
					>
						<Input
							id="exampleFormControlTextarea1"
							placeholder="리뷰를 적으세요!"
							rows="3"
							type="textarea"
						/>
						<Button color="success" type="submit">
							등록하기
						</Button>
					</Form>
				</Container>
			</section>
			<section className="section bg-secondary">
				<Container>
					<h2>리뷰</h2>
					<OtherReview reviewList={reviewList} />
				</Container>
			</section>
		</>
	);
};

export default Detail;
