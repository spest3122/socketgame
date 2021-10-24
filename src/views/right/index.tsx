import React, { useState, useEffect } from 'react'
import './styles.scss'
interface Msg {
    msg: string
}
const AppRight = () => {
    const [msg, setMsg] = useState<Array<Msg>>([
        { msg: '2021/10/20 13:20:10 dddd加入房間' },
        { msg: '2021/10/20 13:20:10 dddd加入房間' },
    ])

    useEffect(() => {
        function handleKeyboardkEvent(e: KeyboardEvent) {
            console.log(e)
        }
        const rightFunc = document.querySelector(
            '.right-func'
        ) as HTMLDivElement
        rightFunc.addEventListener('keydown', handleKeyboardkEvent)
        return () => {
            rightFunc.removeEventListener('keydown', handleKeyboardkEvent)
        }
    }, [])
    return (
        <section className="app-right">
            <section className="right-msg">
                {msg.map((item, index) => (
                    <p key={`msg${index}`}>{item.msg}</p>
                ))}
            </section>
            <footer className="right-func">
                <input type="text" className="func-input" />
                <button>送出</button>
            </footer>
        </section>
    )
}

export default AppRight
