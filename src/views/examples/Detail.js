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
import { userState } from 'recoils/user';
import { notify } from 'util';

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
				myReview: { rating: 0.5, comment: '댓글댓글댓글댓글댓글댓글댓글댓글' },
				commentList: Array.from({ length: 10 }, (_, i) => ({
					id: `id${i}`,
					comment: `댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글${i}`,
					rating: 3.5,
					like: i * 2,
					dislike: i,
					/** 눌렀다면 어디에 눌렀는지 1이면 like 2이면 dislike 이 값 0이라면 아직 안누름*/
					userCheck: i % 3,
				})),
			});
		}, 1000);
	});
};

/**
 * @param {string} contents 유저가 쓴 리뷰 내용
 */
const commentPromiseFunc = contents => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			// res({ isSucceed: true });
			rej('asdf');
		}, 1000);
	});
};

const deletePromiseFunc = () => {
	return new Promise(res => {
		setTimeout(() => {
			res({ isSucceed: true });
		}, 1000);
	});
};

/**
 * @param {string} id 상대방 리뷰의 아이디
 * @param {boolean} isLike 공감인지 비공감인지
 */
const likePromiseFunc = (id, isLike) => {
	return new Promise(res => {
		setTimeout(() => {
			res({ isSucceed: true });
		}, 500);
	});
};

const OtherReview = ({ reviewList, onClickLike }) => {
	const { userId } = useRecoilValue(userState);

	return (
		<>
			{reviewList.length ? (
				reviewList
					.filter(review => review.id !== userId)
					.map((review, i) => (
						<Card key={i} className="shadow shadow-lg--hover mt-5">
							<CardBody>
								<div className="d-flex">
									<div className="pl-4 md text-left">
										{review.id}{' '}
										<Badge color="primary" pill className="mr-1">
											Rating: {review.rating}
										</Badge>
										<Badge
											color="danger"
											pill
											className="mr-1"
											onClick={() => {
												onClickLike(true, i);
											}}
											style={{ cursor: 'pointer' }}
										>
											<i
												style={{ color: review.userCheck === 1 ? 'black' : '' }}
												className="ni ni-bold-up"
											/>{' '}
											{review.like}
										</Badge>
										<Badge
											color="info"
											pill
											className="mr-1"
											onClick={() => {
												onClickLike(false, i);
											}}
											style={{ cursor: 'pointer' }}
										>
											<i
												style={{ color: review.userCheck === 2 ? 'black' : '' }}
												className="ni ni-bold-down"
											/>{' '}
											{review.dislike}
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
	const commentRef = useRef(null);
	const notificationAlertRef = useRef(null);

	const onSubmitContent = async comment => {
		try {
			await commentPromiseFunc(comment);
			setBookInfo({ ...bookInfo, myReview: { rating, comment } });
			notify(notificationAlertRef, 2, '등록완료!');
		} catch (e) {
			console.log(e);
			notify(notificationAlertRef, 3, e);
		}
	};

	const onClickDelete = async () => {
		try {
			await deletePromiseFunc();
			setRating(0);
			setBookInfo({ ...bookInfo, myReview: {} });
		} catch (e) {
			console.log(e);
		}
	};

	const onClickLike = async (isUp, idx) => {
		try {
			const commentList = [...bookInfo?.commentList];
			if (!commentList[idx]) {
				throw Error('해당 인덱스가 없습니다');
			}
			await likePromiseFunc(commentList[idx].id, isUp);

			const beforeLike = commentList[idx].userCheck;
			if (beforeLike === 0) {
				commentList[idx][isUp ? 'like' : 'dislike'] += 1;
			} else {
				commentList[idx][beforeLike === 1 ? 'like' : 'dislike'] -= 1;
			}
			commentList[idx].userCheck = isUp ? 1 : 2;

			if (beforeLike === 1 && !isUp) {
				commentList[idx].dislike += 1;
			} else if (beforeLike === 2 && isUp) {
				commentList[idx].like += 1;
			} else if (beforeLike !== 0) {
				commentList[idx].userCheck = 0;
			}
			setBookInfo({ ...bookInfo, commentList });
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		bookInfoPromiseFunc(match.params.id).then(result => {
			setBookInfo(result);
			commentRef.current.value = '123';
			setRating(result?.myReview?.rating ?? 0);
		});
	}, [match.params.id]);

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
								<p>{bookInfo.content}</p>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
			<section className="section bg-secondary">
				<Container>
					<h2>내 리뷰 ({rating.toFixed(1)})</h2>
					<Rating
						initialValue={bookInfo?.myReview?.rating ?? 0}
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
					<h2>리뷰 ({bookInfo.commentList?.length ?? 0})</h2>
					<OtherReview
						reviewList={bookInfo.commentList ?? []}
						onClickLike={onClickLike}
					/>
				</Container>
			</section>
		</>
	);
};

export default Detail;
