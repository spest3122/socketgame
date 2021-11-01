import { useState, useEffect } from 'react'
import './styles.scss'
import PersonItem from './item'
import ClockIcon from '@heroicons/react/outline/ClockIcon'
import { useContextSelector } from 'use-context-selector'
import WsContext from '@api/context'
interface TIMER {
    countDown: number
    min: number | string
    sec: number | string
}
const sixtySec = 3600

const AppLeft = () => {
    const { users, doRestart } = useContextSelector(WsContext, (v) => v)
    const [timer, setTimer] = useState<TIMER>({
        countDown: sixtySec,
        min: '00',
        sec: '00',
    })
    useEffect(() => {
        let time = setInterval(function () {
            setTimer((prev) => {
                let count = prev.countDown - 1
                let min = parseInt(((count % (60 * 60)) / 60).toString(), 10)
                let sec = parseInt((count % 60).toString(), 10)
                if (prev.countDown === 0) {
                    clearInterval(time)
                    return { countDown: sixtySec, min: '00', sec: '00' }
                }
                return {
                    countDown: count,
                    min: min < 10 ? '0' + min : min,
                    sec: sec < 10 ? '0' + sec : sec,
                }
            })
        }, 1000)
        return () => {
            clearInterval(time)
        }
    }, [])

    useEffect(() => {
        if (timer.countDown === 0) {
            doRestart!()
        }
    }, [timer.countDown])

    return (
        <section className="app-left">
            <header className="left-header">
                <div className="left-clock-icon">
                    <ClockIcon onClick={doRestart} />
                </div>
                <p className="left-clock-text">{`${timer.min}:${timer.sec}`}</p>
            </header>
            <main className="left-main">
                {users?.map((item) => (
                    <PersonItem key={item.id} {...item} />
                ))}
            </main>
        </section>
    )
}

export default AppLeft
