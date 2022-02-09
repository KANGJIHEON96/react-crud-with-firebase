import React from "react";
import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  console.log('total, limit, page: ', total, limit, page)
  const numPages = Math.ceil(total / limit);
  

  // 필요한 페이지의 개수 : 총 게시물 수 나누기 페이지당 게시물 수 한 후 올림
  console.log('numPages:' , numPages)
  return (<>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt;</Button>
        {Array(numPages)?.fill()?.map((arr, i) => (
            <Button key={i+1} onClick={() => setPage(i+1)} aria-current={page === i+1 ? "page" : null}>{i+1}</Button>
          ))} 
          {/* // 필요한 페이지의 개수를 배열의 인자로 받고 fill함수로 이 배열에 값을 할당해준다.
          // 그리고 페이지개수를 받아서 map함수로 리턴할 값(i+1, 0번째가 아닌 첫 번째 부터 보여줘야 하니까)을 리턴해준다.
          이 과정을 거치면 값을 가지는 배열이 생성됨. */}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
        {/* 현재 페이지 번호와 필요한 페이지 수가 같으면 버튼 비활성화 */}
      </Nav>
    </>
  )
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
