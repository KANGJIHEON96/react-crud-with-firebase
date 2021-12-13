import React, {useState, useEffect} from 'react'
import {fireDbRef} from "../firebase";
import {Link} from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify';

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
      const [limit, setLimit] = useState(10);
      const [page, setPage] = useState(1);
      const offset = (page - 1) * limit;

    useEffect(() => {
        fireDbRef.child("contacts").on("value", (snapshot) => {
            if(snapshot.val()!==null) {
                const data = snapshot.val();
                const res = Object.keys(data).reduce((acc, cur) => {
                    if(acc.findIndex((v) => v.pk === data[cur]?.fk) > -1) {
                        // +1 상수로 되어 있는걸 동적으로 수정
                        acc.splice((acc.findIndex((v) => v.pk === data[cur]?.fk)) + 1, 0, data[cur])
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
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
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
                    
                    {
                     data.slice(offset, offset + limit)?.map((row, index) => {
                         return ( <>
                             <tr key={row.pk}>
                                 <th scope="row">{ index + 1}</th>
                                 <td>{(row?.fk) ? 'ㄴ' : row.title}</td>
                                 <td>{row.content}</td>
                                 <td>{row.user}</td>
                                 <td>{ImageIcon(row?.photo) ? 'O' : 'X'}</td>
                                 <td>{displayedAt(row?.date)}</td>
                               
                                 <td>
                                     <Link to={`/update/${row.pk}`}>
                                     <button className="btn btn-edit">수정</button>
                                     </Link>
                                     <button className="btn btn-delete" onClick={() => onDelete(row.pk)}>삭제</button>
                                     <Link to={`/view/${row.pk}`}>
                                     <button className="btn btn-edit">상세보기</button>
                                     </Link>
                         
                                 </td>
                             </tr>
                             </>
                         )
                       })
                    }
                    
                </tbody>
                <Pagination
          total={row.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
            </table>
        </div>
    )
}

export default Home
