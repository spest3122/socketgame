import './styles.scss'
import PersonItem from './item'
import ClockIcon from '@heroicons/react/outline/ClockIcon'
const AppLeft = () => {
    const aa: number[] = [1, 3, 4, 5, 6, 7, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7]
    return (
        <section className="app-left">
            <header className="left-header">
                <div className="left-clock-icon">
                    <ClockIcon />
                </div>
                <p className="left-clock-text">45: 63</p>
            </header>
            <main className="left-main">
                {aa.map((item, index) => (
                    <PersonItem key={'person' + index} />
                ))}
            </main>
        </section>
    )
}

export default AppLeft
