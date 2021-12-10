import React, {useState, useEffect} from 'react'
import fireDb from "../firebase";
import {Link} from 'react-router-dom'
import './Home.css'
import { toast } from 'react-toastify';




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


    const [data, setData] =useState({});

    useEffect(() => {
        fireDb.child("contacts").on("value", (snapshot) => {
            if(snapshot.val()!==null) {
                setData({...snapshot.val()})
            } else {
                setData({})
            }
        });

        return () => {
            setData({})
        }
    }, []);

    const onDelete = (id) => {
        if(window.confirm("정말 삭제하시겠습니까?")) {
            fireDb.child(`contacts/${id}`).remove((err) => {
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
                    {console.log('data: ', data)}
                    {Object.keys(data).map((id, index) => {
                        return (
                            <tr key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data[id].title}</td>
                                <td>{data[id].content}</td>
                                <td>{data[id].user}</td>
                                <td>{ImageIcon(data[id]?.photo) ? 'O' : 'X'}</td>
                                <td>{displayedAt(data[id]?.date)}</td>
                               
                                <td>
                                    <Link to={`/update/${id}`}>
                                    <button className="btn btn-edit">수정</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={() => onDelete(id)}>삭제</button>
                                    <Link to={`/view/${id}`}>
                                    <button className="btn btn-edit">상세보기</button>
                                    </Link>
                                    
                                </td>
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Home
