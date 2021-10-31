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
    const handleKeyboardkEvent = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'Enter') {
            doSendAnswer(msg)
            setMsg('')
        } else if (e.key === 'Enter') {
            doSendMsg(msg)
            setMsg('')
        }
    }

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
                    >{`${item.dateTime} ${
                        item.type === 'MESSAGE' ? item.from.name + ':' : ''
                    } ${item.message}`}</p>
                ))}
            </section>
            <footer className="right-func">
                <input
                    type="text"
                    className="func-input"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => handleKeyboardkEvent(e)}
                />
                <button onClick={sendMsg}>送出</button>
            </footer>
        </section>
    )
}

export default AppRight
