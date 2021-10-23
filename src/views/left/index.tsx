import './styles.css'
import PersonItem from './item'
const AppLeft = () => {
    const aa: number[] = [1, 3, 4, 5, 6, 7, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7]
    return (
        <section className="app-left">
            <header className="left-header">
                <p>45: 63</p>
            </header>
            <main className="left-main">
                {aa.map((item) => (
                    <PersonItem />
                ))}
            </main>
        </section>
    )
}

export default AppLeft
