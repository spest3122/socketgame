import WsContext from '@api/context'
import { useContextSelector } from 'use-context-selector'
import { useEffect } from 'react'
import './styles.scss'
const AppRight = () => {
    const msgList = useContextSelector(WsContext, (v) => v.msgList)!
    useEffect(() => {
        const handleKeyboardkEvent = (e: KeyboardEvent) => {
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
                {msgList.map((item) => (
                    <p
                        key={`msg${item.id}`}
                    >{`${item.dateTime} ${item.message}`}</p>
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
