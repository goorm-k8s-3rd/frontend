import React from 'react';

// reactstrap components
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// 0부터 시작
const PaginationComponent = ({ curPage, pageCnt, maxCnt, onClick }) => {
	curPage -= 1;
	const start = Math.floor(curPage / pageCnt) * pageCnt;
	const end = start + pageCnt - 1;
	const isStart = start === 0;
	const isEnd = end + 1 >= maxCnt;
	return (
		<>
			<nav>
				<Pagination className="pagination justify-content-center">
					<PaginationItem disabled={isStart}>
						<PaginationLink
							onClick={e => {
								e.preventDefault();
								onClick(1);
							}}
							first
						/>
					</PaginationItem>
					<PaginationItem disabled={isStart}>
						<PaginationLink
							onClick={e => {
								e.preventDefault();
								onClick(start);
							}}
							previous
						/>
					</PaginationItem>
					{Array.from({ length: end < maxCnt ? pageCnt : maxCnt - start }, (_, i) => (
						<PaginationItem key={i} active={curPage === i + start}>
							<PaginationLink
								onClick={e => {
									e.preventDefault();
									onClick(i + 1 + start);
								}}
							>
								{i + 1 + start}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem disabled={isEnd}>
						<PaginationLink
							onClick={e => {
								e.preventDefault();
								onClick(end + 2);
							}}
							next
						/>
					</PaginationItem>
					<PaginationItem disabled={isEnd}>
						<PaginationLink
							onClick={e => {
								e.preventDefault();
								onClick(maxCnt);
							}}
							last
						/>
					</PaginationItem>
				</Pagination>
			</nav>
		</>
	);
};

export default PaginationComponent;
