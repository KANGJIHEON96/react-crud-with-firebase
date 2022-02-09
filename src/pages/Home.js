import React, {useState, useEffect} from 'react'
import {fireDbRef} from "../firebase";
import {Link} from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify';
import imgA from '../camera.png'

import Pagination from '../components/Pagination';



const Home = () => {
    //자바스크립트 시간계산표시 함수
    function displayedAt(createdAt) {
        if(!createdAt) return false
        const milliSeconds = new Date() - createdAt
        const seconds = milliSeconds / 1000
        if (seconds < 60) return `방금 전`
        const minutes = seconds / 60
        if (minutes < 60) return `${Math.floor(minutes)}분 전`
        const hours = minutes / 60
        if (hours < 24) return `${Math.floor(hours)}시간 전`
        const days = hours / 24
        if (days < 7) return `${Math.floor(days)}일 전`
        const weeks = days / 7
        if (weeks < 5) return `${Math.floor(weeks)}주 전`
        const months = days / 30
        if (months < 12) return `${Math.floor(months)}개월 전`
        const years = days / 365
        return `${Math.floor(years)}년 전`
      }

 

      const [data, setData] =useState([]);

      const [row, setRow] = useState([])
      const [limit, setLimit] = useState(5); // 페이지당 게시물 수
      const [page, setPage] = useState(1); // 현재 페이지번호
      const [numPages, setNumPages] = useState(0); // 필요한 페이지의 개수
      const offset = (page-1) * limit; // 첫 게시물의 위치

      useEffect(() => console.log('page: ',page), [page])

    useEffect(() => {
        fireDbRef.child("contacts").on("value", (snapshot) => {
            if(snapshot.val()!==null) {
                const data = snapshot.val();
                const res = Object.keys(data).reduce((acc, cur) => {
                    if(acc.findIndex((v) => v.pk === data[cur]?.fk) > -1) {
                        // +1 상수로 되어 있는걸 동적으로 수정
                        acc.splice((acc.findIndex((v) => v.pk === data[cur]?.fk)) + 1, 0, data[cur])
                        //splice(시작점, 지울 개수, 넣을 것)
                    }else {
                        acc.push({...data[cur], pk: cur});
                       
                    }
                    return acc
                }, []);
                setData(res)
            } else {
                console.log('this')
                setData([])
            }
        });

        return () => {
            setData([])
        }
    }, []);


    const onDelete = (id) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            fireDbRef.child(`contacts/${id}`).remove((err) => {
                if (err) {
                toast.error(err)
            } else {
                toast.success("삭제 완료.")
            }
        })
        }
    }

    
    const ImageIcon = (isPhoto) => {
        // if(photo !== undefined){
        //     return 'O'
        // } else if (photo === undefined) {
        //     return 'X'
        // }
        
        // return photo ? 'O' : 'X'

        return isPhoto ? true : false
        
    }

    

    return (
        <div style={{marginTop: "100px"}}>
             <label>
             페이지당 표시할 게시물 수:
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
             </label>

            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>No.</th>
                        <th style={{textAlign: "center"}}>제목</th>
                        <th style={{textAlign: "center"}}>내용</th>
                        <th style={{textAlign: "center"}}>사용자</th>
                        <th style={{textAlign: "center"}}>이미지</th>
                        <th style={{textAlign: "center"}}>작성시간</th>
                        <th style={{textAlign: "center"}}>기능</th>
                    </tr>
                </thead>
                
                
                <tbody>
                    {/* 배열의 일부분을 잘라내어 새로운 배열을 리턴하기 위해 slice함수를 사용함. */}
                    {
                     data.slice(offset, offset+limit)?.map((row, index) => {
                         return ( <>
                             <tr key={row.pk}>
                                 <th scope="row">{(index + 1) + 5 * (page-1)}</th>
                                 <td>{(row?.fk) ? 'ㄴ re: ' + row.title : row?.title}</td>
                                 <td>{row?.content}</td>
                                 <td>{row?.user}</td>
                                 <td>{ImageIcon(row?.photo) ? <img src = {imgA} style={{width : "20px"}} /> : 'X'}</td>
                                 <td>{displayedAt(row?.date)}</td>
                               
                                 <td>
                                     <Link to={`/update/${row.pk}`}>
                                     <button className="btn btn-edit">수정</button>
                                     </Link>
                                     <button className="btn btn-delete" onClick={() => onDelete(row.pk)}>삭제</button>
                                     <Link to={`/view/${row?.pk}`}>
                                     <button className="btn btn-edit">상세보기</button>
                                     </Link>
                         
                                 </td>
                             </tr>
                             </>
                         )
                       })
                    }
                    
                </tbody>
                {console.log('data: ', data)}
                <Pagination
                    total={data?.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                    numPages={numPages}
                />
            </table>
        </div>
    )
}

export default Home
