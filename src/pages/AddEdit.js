import React, {useState, useEffect, useRef} from 'react'
import {useHistory, useParams} from "react-router-dom"
import './AddEdit.css'
import  { timestamp, fireDbRef } from "../firebase"
import {toast} from "react-toastify"
import Warning from '../hooks/Warning'
import moment from 'moment'
import DatePicker from '../components/datePicker'


const initialState = {

    title:"",
    content:"",
    user:"",
    date:'',
    photo: [],
    startDate:'',
    endDate:'',
}

const AddEdit = () => {

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    

    console.log('startDate: ', startDate)
    console.log('endDate: ', endDate)
    
    const imgRef = useRef(null)
    
    const [ Prompt, setDirty, setPristine] = Warning()
    const [name, setName] = useState("")
    
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});


    const { title, content, user, date,  } = state;

    const history = useHistory()

    const {id} = useParams()


    useEffect(() => {
        fireDbRef.child("contacts").on("value", (snapshot) => {
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

    useEffect(() => {
        if(id && Object.keys(data).length) {
            setState({...data[id]})
        } else {
            setState({...initialState})
        }
       
    }, [id,data])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state, [name]: value })
    }
    
    
    
    const handleImageFile = async (e) => {
        const file = e.target.files;
        const result = [];

        // console.log('확인 : ', Array.from(file).every(v => v.type.startsWith('image/')))
        // console.log('확인 : ', ![...file].every(v => v.type.startsWith('image/')))
        if(file.length>5){
            return alert('이미지는 최대 5개, 크기는 5MB 미만')
        }

            console.log('file', file)
        if( ![...file].every(v => v.type.startsWith('image/'))) return;
        
        
        for(let i = 0; i< file.length; i++ ) { 
            const _file = await readSync(file[i]);
            result.push(_file);

            // const reader = new FileReader(); //FILEREADER은 업로드한 이미지를 미리보기 위한 객체
            // reader.onload = (e) => {
            //     console.log('test: ', e.target.result)
            //     // imgRef.current.src = e.target.result;
            //     setState({
            //         ...state,
            //         photo: e.target.result
            //     })
            // }
            // reader.readAsDataURL(file[i])
        }


        setState({
            ...state,
            photo: result
        })
    }

    const readSync = (file) => {
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();             //FILEREADER은 업로드한 이미지를 미리보기 위한 객체
            reader.onload = (e) => {
                resolve(e.target.result)
              
            }
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    }

    // 게시물 작성시간 함수
    const nowTime = moment().format('YYYYMMDD HH:mm:ss')
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!title || !content || !user ) {
            toast.error("입력란을 모두 작성하세요")
        } else {
            if(!id) {
                // fireDbRef.child("contacts").push(state, (err) => {
                    // fireDbRef.child("contacts").push({...state, pk: fireDbRef.child('id').push().key, date: timestamp}, (err) => {
                fireDbRef.child("contacts").push({...state,  date: timestamp}, (err) => {
                    if(err) {
                        toast.error(err)
                    } else {
                        toast.success("게시물이 등록되었습니다.")
                    }
                })
            } else {
                    fireDbRef.child(`contacts/${id}`).set({...state, date: timestamp}, (err) => {
                        if(err) {
                            toast.error(err)
                        } else {
                            toast.success("업데이트 성공.")
                        }
                    })
            }
            
            setTimeout(() => history.push('/'), 500);
        }
    }
    return ( <>
        <div style={{display:"flex", margin:"auto"}}>
            <form style={{margin: "auto", padding:"15px", maxWidth:"400px", alignContent:"center",}} onSubmit={handleSubmit} onChange={e => {setName(e.target.value);
                setDirty();}}>
                {console.log(';state.photo: ', state)}
                <input type="text" id="title" name="title" style={{width: "800px", height:"70px", margin:"auto"}} onChange={handleInputChange} placeholder="제목" value={title} />
                <input type="text" id="content" name="content" placeholder="내용" value={content} onChange={handleInputChange} style={{width: "800px", height: "500px"}}></input>
                <input type="text" id="user" name="user"  placeholder="사용자" value={user} onChange={handleInputChange}></input>
               
               {
                   state?.photo?.map(function(binaryData,index) {
                       
                       return <img key={index} src={binaryData} alt={index} width="120" />
                       
                   })
               } 


                <div className="button">
                    <label htmlFor="chooseFIle">사진 추가하기</label>
                <input type="file" multiple="multiple" name="photo" size="1024 * 1024 * 5" accept="image/*" id="photo" onChange={handleImageFile} />
                </div>
                <hr color='black' width='800px'/>
                <label htmlFor="user">작성 날짜(시간): </label>
                {nowTime}
                <hr color='black' width='800px'/>
                
                <div style={{ position:'absolute', bottom:155, right:270, }}>
                <label htmlFor="content">사용 기간:</label>
                
                <DatePicker startDate={startDate} onStartDate={setStartDate} endDate={endDate} onEndDate={setEndDate} focusedInput={focusedInput} onFocusedInput={setFocusedInput} />
                </div>

              
                <input style={{width:"800px"}} type="submit" value={id ? "Update" : "Save"}  onClick={() => {setName(""); setPristine()}} />
            </form>
        </div>
        {Prompt}
   </>
   )
}

export default AddEdit
