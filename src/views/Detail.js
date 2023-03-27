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

const bookInfoPromiseFunc = id => {
	return new Promise(res => {
		setTimeout(() => {
			res({
				title: `혼자 공부하는 파이썬${id}`,
				authors: `윤인성${id}`,
				contents: `혼자 공부하는 파이썬』이 더욱 흥미있고 알찬 내용으로 개정되었습니다. 프로그래밍이 정말 처음인 입문자도 따라갈 수 있는 친절한 설명과 단계별 학습은 그대로! 혼자 
공부하더라도 체계적으로 계획을 세워 학습할 수 있도록 ‘혼공 계획표’를 새롭게 추가했습니다. 또한 입문자가 자주 물어보는 질문과 오류 해결 방법을 적재적소에 배치하여 예상치 못한 문제에 부딪혀도 좌절하지  
않고 끝까지 완독할 수 있도록 도와줍니다. 단순한 문법 암기와 코딩 따라하기에 지쳤다면, 새로운,`,
				thumbnail:
					'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6080832%3Ftimestamp%3D20230322161657',
				url: 'https://search.daum.net/search?w=bookpage&bookId=6080832&q=%ED%98%BC%EC%9E%90+%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94+%ED%8C%8C%EC%9D%B4%EC%8D%AC',
				isbn: id,
				rate: 3.33,
				myReview: { rating: 0.5, comment: '댓글댓글댓글댓글댓글댓글댓글댓글' },
				review: Array.from({ length: 10 }, (_, i) => ({
					id: `id${i}`,
					content: `댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글${i}`,
					rate: 3.5,
					like: i * 2,
					dislike: i,
					/** 1: 안누름, 2: 좋아요, 3: 싫어요 */
					userCheck: (i % 3) + 1,
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
					.filter(userReview => userReview.id !== userId)
					.map((userReview, i) => (
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
												onClickLike(true, i);
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
												onClickLike(false, i);
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
										<p>{userReview.content}</p>
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

	const onClickLike = async (isLike, idx) => {
		try {
			const review = [...bookInfo?.review];
			if (!review[idx]) {
				throw Error('해당 인덱스가 없습니다');
			}
			await likePromiseFunc(review[idx].id, isLike);

			const beforeLike = review[idx].userCheck;
			review[idx].userCheck = isLike ? 2 : 3;
			/** 아무것도 안누른 상태 */
			if (beforeLike === 1) {
				review[idx][isLike ? 'like' : 'dislike'] += 1;
			} else {
				/** 무언가가 눌려진 상태에서 기존의 상태를 제거 */
				review[idx][beforeLike === 2 ? 'like' : 'dislike'] -= 1;
				/** 좋아요에서 싫어요를 누른 경우 */
				if (beforeLike === 2 && !isLike) {
					review[idx].dislike += 1;
				} else if (beforeLike === 3 && isLike) {
					/** 싫어요에서 좋아요를 누른 경우 */
					review[idx].like += 1;
				} else if ((beforeLike === 2 && isLike) || (beforeLike === 3 && !isLike)) {
					/** 같은 버튼을 연속해서 누른 경우 */
					review[idx].userCheck = 1;
				}
			}

			/** 아무것도 안눌렸던 상태에서 싫어요인 경우  */
			setBookInfo({ ...bookInfo, review });
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		// axios.get(`http://......./book/${match.params.id}`,{withCredentials: true}).then(({data}) => {
		// 	setBookInfo(data);
		// 	commentRef.current.value = '123';
		// 	setRating(data?.myReview?.rating ?? 0);
		// });
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
					<h2>리뷰 ({bookInfo.review?.length ?? 0})</h2>
					<OtherReview reviewList={bookInfo.review ?? []} onClickLike={onClickLike} />
				</Container>
			</section>
		</>
	);
};

export default Detail;
