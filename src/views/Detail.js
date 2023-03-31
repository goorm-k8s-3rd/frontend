import DemoNavbar from 'components/Navbars/DemoNavbar';
import React, { useEffect, useRef, useState } from 'react';
import {
	Badge,
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Form,
	Input,
	Row,
} from 'reactstrap';
import { Rating } from 'react-simple-star-rating';
import { useRecoilValue } from 'recoil';
import NotificationAlert from 'react-notification-alert';
import axios from 'axios';
import { userState } from 'recoils/user';
import { notify } from 'util';
import { api } from 'config';
import { deleteExpiredToken } from 'util/auth';

const OtherReview = ({ userId, reviewList, onClickLike }) => {
	const filteredList = reviewList.filter(userReview => userReview.id !== userId);
	return (
		<>
			<h2>리뷰 ({filteredList.length})</h2>
			{filteredList.length ? (
				filteredList.map((userReview, i) => (
					<Card key={i} className="shadow shadow-lg--hover mt-5">
						<CardBody>
							<div className="d-flex">
								<div className="pl-4 md text-left">
									{userReview.id}{' '}
									<Badge color="primary" pill className="mr-1">
										Rating: {userReview.rate}
									</Badge>
									<Badge
										color="danger"
										pill
										className="mr-1"
										onClick={() => {
											onClickLike(userReview.id, true, i);
										}}
										style={{ cursor: 'pointer' }}
									>
										<i
											style={{ color: userReview.userCheck === 2 ? 'black' : '' }}
											className="ni ni-bold-up"
										/>{' '}
										{userReview.like}
									</Badge>
									<Badge
										color="info"
										pill
										className="mr-1"
										onClick={() => {
											onClickLike(userReview.id, false, i);
										}}
										style={{ cursor: 'pointer' }}
									>
										<i
											style={{ color: userReview.userCheck === 3 ? 'black' : '' }}
											className="ni ni-bold-down"
										/>{' '}
										{userReview.dislike}
									</Badge>
									<hr
										style={{
											marginTop: '10px',
											marginBottom: '10px',
										}}
									/>
									<p>{userReview.contents}</p>
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
	const { userId } = useRecoilValue(userState);
	const [bookInfo, setBookInfo] = useState({});
	const [rating, setRating] = useState(0);
	const commentRef = useRef(null);
	const notificationAlertRef = useRef(null);
	const bookId = match.params.id;

	const onSubmitContent = async comment => {
		try {
			await axios.post(`${api}/review/${bookId}/create`, {
				contents: comment,
				rate: rating,
			});
			notify(notificationAlertRef, 2, '등록완료!');
		} catch (e) {
			console.log(e);
			deleteExpiredToken(e);
			notify(notificationAlertRef, 3, e);
		}
	};

	const onClickDelete = async () => {
		try {
			await axios.delete(`${api}/review/${bookId}/delete`);
			commentRef.current.value = '';
			setRating(0);
		} catch (e) {
			console.log(e);
			deleteExpiredToken(e);
			notify(notificationAlertRef, 2, '삭제오류');
		}
	};

	const onClickLike = async (id, isLike, idx) => {
		try {
			const review = [...bookInfo?.review];
			if (!review[idx]) {
				throw Error('해당 인덱스가 없습니다');
			}
			const clickInfo = {
				none: {
					like: async () => {
						await axios.get(`${api}/review/${bookId}/like`, {
							params: { id },
						});
						review[idx].userCheck = 2;
						review[idx].like += 1;
					},
					dislike: async () => {
						await axios.get(`${api}/review/${bookId}/dislike`, {
							params: { id },
						});
						review[idx].userCheck = 3;
						review[idx].dislike += 1;
					},
				},
				like: {
					like: async () => {
						await axios.delete(`${api}/review/${bookId}/like`, {
							data: { id },
						});
						review[idx].like -= 1;
						review[idx].userCheck = 1;
					},
					dislike: async () => {
						await axios.get(`${api}/review/${bookId}/dislike`, {
							params: { id },
						});
						review[idx].dislike += 1;
						review[idx].like -= 1;
						review[idx].userCheck = 3;
					},
				},
				dislike: {
					like: async () => {
						await axios.get(`${api}/review/${bookId}/like`, {
							params: { id },
						});
						review[idx].dislike -= 1;
						review[idx].like += 1;
						review[idx].userCheck = 2;
					},
					dislike: async () => {
						await axios.delete(`${api}/review/${bookId}/like`, {
							params: { id },
						});
						review[idx].dislike -= 1;
						review[idx].userCheck = 1;
					},
				},
			};

			const likeStr = isLike ? 'like' : 'dislike';
			switch (review[idx].userCheck) {
				case 1:
					await clickInfo.none[likeStr]();
					break;
				case 2:
					await clickInfo.like[likeStr]();
					break;
				default:
					await clickInfo.dislike[likeStr]();
			}

			setBookInfo({ ...bookInfo, review });
		} catch (e) {
			console.log(e);
			deleteExpiredToken(e);
		}
	};

	useEffect(() => {
		axios
			.get(`${api}/book/${bookId}`)
			.then(({ data }) => {
				setBookInfo(data);
				const myInfo = (data?.review ?? []).filter(rev => rev.id === userId);
				if (myInfo.length > 0) {
					commentRef.current.value = myInfo[0].contents;
					setRating(+myInfo[0].rate);
				}
			})
			.catch(err => {
				deleteExpiredToken(err);
			});
	}, [bookId, userId]);

	return (
		<>
			<DemoNavbar />
			<NotificationAlert ref={notificationAlertRef} />
			<section className="section section-lg section-shaped pb-300">
				<div className="shape shape-style-1 shape-default">
					<img
						src={require('assets/img/theme/book1.jpg')}
						style={{ width: '100%', height: '100%' }}
						alt="..."
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
								<p>{bookInfo.contents}</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section className="section bg-secondary">
				<Container>
					<h2>내 리뷰 ({rating.toFixed(1)})</h2>
					<Rating
						initialValue={rating ?? 0}
						allowFraction
						transition
						onClick={setRating}
					/>
					<Form
						onSubmit={e => {
							e.preventDefault();
							onSubmitContent(e.target[0].value);
						}}
					>
						<Input
							innerRef={commentRef}
							id="myReview"
							placeholder="리뷰를 적으세요!"
							rows="3"
							type="textarea"
						/>
						<Button color="success" type="submit">
							등록하기
						</Button>
						<Button color="danger" onClick={onClickDelete}>
							삭제
						</Button>
					</Form>
				</Container>
			</section>
			<section className="section bg-secondary">
				<Container>
					<OtherReview
						userId={userId}
						reviewList={bookInfo.review ?? []}
						onClickLike={onClickLike}
					/>
				</Container>
			</section>
		</>
	);
};

export default Detail;
