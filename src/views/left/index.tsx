import './styles.scss'
import PersonItem from './item'
import ClockIcon from '@heroicons/react/outline/ClockIcon'
import { useContextSelector } from 'use-context-selector'
import WsContext from '@api/context'
const AppLeft = () => {
    const users = useContextSelector(WsContext, (v) => v.users)

    return (
        <section className="app-left">
            <header className="left-header">
                <div className="left-clock-icon">
                    <ClockIcon />
                </div>
                <p className="left-clock-text">45: 63</p>
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
