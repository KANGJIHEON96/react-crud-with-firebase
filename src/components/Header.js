import React, {useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import "./Header.css"


const Header = () => {
    const [activeTab, setActiveTab]= useState("Home");
    const location= useLocation();

    useEffect(() => {
        if(location.pathname ==="/" ){
            setActiveTab("Home")
        } else if(location.pathname ==="/add"){
            setActiveTab("AddContact")
        }
    }, [location])

    return (
        <div className="header">
            <p className="logo">게시판</p>
            <div className="header-right">
                <Link to="/">
                        <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={() => setActiveTab("Home")}>
                        홈(게시물 리스트)
                    </p>
                </Link>
                <Link to="/add">
                    <p className={`${activeTab === "AddContact" ? "active" : ""}`} onClick={() => setActiveTab("AddContact")}>
                        게시물 작성
                    </p>
                </Link>
                
                
            </div>
        </div>
    )
}

export default Header
