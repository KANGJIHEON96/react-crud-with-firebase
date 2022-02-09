import React, {useState, useEffect, useContext} from 'react'
import {fireDbRef} from "../firebase"
import { useParams, Link } from 'react-router-dom'
import "./View.css"



const View = () => {

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


    const [user, setUser]= useState({})
    
    
   

    console.log('user: ', user)
   
    

    const {id} = useParams(); //id와 라우터 매치시키는 기능
    const {fk} = useParams()

    

    useEffect(() => {
        fireDbRef
        .child(`contacts/${id}`)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                setUser({...snapshot.val()})
            } else {
                setUser({})
            } 
        })
    }, [id]);

    


    return (
    <>
    {/* <img src={user.photo} style={{width:"25%", height:"25%"}}/> */}
                {user?.photo?.map(function(binaryData,index) {
                      return <img key={index} src={binaryData} alt={index} width="120" />})  } 

                    <div class="wrapper">
                <div class="section3">
                <div class="box" style={{height:"300px"}}>
                <p>내용:{user?.content}</p>
                </div>
                <p class="box">작성자:{user?.user}</p>
                <p class="box">작성시간:{displayedAt(user?.date)}</p>


                </div>
                <div class="box ad1">제목:{user?.title}</div>
                </div>



                <hr style={{color:"black", width:"100%"}} />
                    <Link to="/"><button className="btn btn-edit">돌아가기</button></Link>
                    <Link to={`/reply/${id}`}><button className="btn btn-edit">답글 달기</button></Link>
                </>)
                }

export default View