import React, {useState, useEffect} from 'react'
import { Prompt } from 'react-router-dom'

const Warning = ( message = "페이지에서 나가시겠습니까? ") => {
    const [isDirty, setDirty] = useState(false)

    useEffect(()=>{
        //브라우저 디텍팅
        window.onbeforeunload = isDirty && (() => message);

        return () => {
            window.onbeforeunload = null;
        }
    }, [isDirty])

    const routerPrompt = (
        <Prompt when={isDirty} message={message} />
    )

    return [routerPrompt, () => setDirty(true), () => setDirty(false)]
}

export default Warning
