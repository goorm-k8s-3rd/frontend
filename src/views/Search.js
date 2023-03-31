/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
// nodejs library that concatenates classes

// reactstrap components
import {
	FormGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
	Form,
} from 'reactstrap';
import axios from 'axios';

// core components
import DemoNavbar from 'components/Navbars/DemoNavbar.js';
import PaginationComponent from 'components/Pagination/Pagination';
import BookInfoViewList from 'components/List/BookInfoList';
import { api } from 'config';
import { deleteExpiredToken } from 'util/auth';

const Search = () => {
	const mainRef = useRef(null);
	const [bookList, setBookList] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [maxPage, setMaxPage] = useState(1);
	const [bookName, setBookName] = useState('');

	const onSubmitTitle = async name => {
		try {
			setBookName(name);
			const { data } = await axios.get(`${api}/book/search/${name}`);
			setBookList(data.data);
			setMaxPage(11);
		} catch (e) {
			deleteExpiredToken(e);
			console.log(e);
		}
	};

	const onClickPagination = async num => {
		try {
			setCurPage(num);
			const result = await axios.get(`${api}/book/search/${bookName}`);
			setBookList(result);
		} catch (e) {
			deleteExpiredToken(e);
			console.log(e);
		}
	};

	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainRef.current.scrollTop = 0;
	}, [curPage]);

	return (
		<>
			<DemoNavbar />
			<main ref={mainRef}>
				<div className="position-relative">
					{/* shape Hero */}
					<section
						className="section section-lg section-shaped pb-300"
						style={{ minHeigt: '700px' }}
					>
						<div className="shape shape-style-1 shape-default">
							<img
								src={require('assets/img/theme/book1.jpg')}
								style={{ width: '100%', height: '100%' }}
							/>
						</div>
						<Container className="py-lg-md d-flex">
							<div className="col px-0">
								<Row>
									<Col lg="6">
										<Form
											onSubmit={e => {
												e.preventDefault();
												onSubmitTitle(e.target[0].value);
											}}
										>
											<FormGroup className="mb-3">
												<InputGroup className="input-group-alternative">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="ni ni-zoom-split-in" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														placeholder="책 이름을 입력하고 Enter키를 누르세요"
														name="name"
														required
													/>
												</InputGroup>
											</FormGroup>
										</Form>
									</Col>
								</Row>
							</div>
						</Container>
					</section>
				</div>
				<section className="section section-lg pt-lg-0 mt--200">
					<Container>
						<Row className="justify-content-center">
							<Col lg="12">
								<BookInfoViewList bookList={bookList} rowPerCnt={4} />
							</Col>
						</Row>
					</Container>
				</section>
				{/* <PaginationComponent
					curPage={curPage}
					onClick={onClickPagination}
					pageCnt={5}
					maxCnt={maxPage}
				/> */}
			</main>
		</>
	);
};

export default Search;
