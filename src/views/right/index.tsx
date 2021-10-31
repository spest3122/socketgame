import WsContext from '@api/context'
import { useContextSelector } from 'use-context-selector'
import { useEffect, useState } from 'react'
import './styles.scss'

let COLOR: { [key: string]: string | string[] } = {
    JOIN: 'text-green-400',
    LEAVE: 'text-red-400',
    GOOD: 'text-green-400',
    BAD: 'text-gray-400',
    GIVE_UP: 'text-red-400',
    MESSAGE: '',
    ANSWER: ['text-green-400', 'text-red-400'],
}

const AppRight = () => {
    const { msgList, doSendMsg, doSendAnswer } = useContextSelector(
        WsContext,
        (v) => v
    )

    const [msg, setMsg] = useState<string>('')
    useEffect(() => {
        const handleKeyboardkEvent = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'Enter') {
                doSendAnswer(e.target.value)
                setMsg('')
            } else if (e.key === 'Enter') {
                doSendMsg(e.target.value)
                setMsg('')
            }
        }
        const rightFunc = document.querySelector(
            '.right-func'
        ) as HTMLDivElement
        rightFunc.addEventListener('keydown', handleKeyboardkEvent)
        return () => {
            rightFunc.removeEventListener('keydown', handleKeyboardkEvent)
        }
    }, [])

    const sendMsg = () => {
        doSendMsg(msg)
        setMsg('')
    }

    return (
        <section className="app-right">
            <section className="right-msg">
                {msgList?.map((item) => (
                    <p
                        className={`${COLOR[item.type]}`}
                        key={`msg${item.id}`}
                    >{`${item.dateTime} ${item.message}`}</p>
                ))}
            </section>
            <footer className="right-func">
                <input
                    type="text"
                    className="func-input"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={sendMsg}>送出</button>
            </footer>
        </section>
    )
}

export default AppRight
