import { useState } from 'react'

import './styles.scss'

const AppMiddle = () => {
    const [content] = useState<string[]>([
        'ddddd@ffff',
        'ddddd@ffff',
        'ddddd@ffff',
        'ddddd@ffff',
        'ddddd@ffff',
    ])
    return (
        <section className="app-middle">
            <header className="middle-header">
                <button className="middle-quit">放棄</button>
                <div className="middle-content">
                    <h1 className="middle-main-title">走開</h1>
                    <h2 className="middle-second-title">你長的很醜</h2>
                </div>
            </header>
            <main className="middle-main">
                {content.map((item, index) => (
                    <p className="content-text" key={`content${index}`}>
                        {item}
                    </p>
                ))}
            </main>
        </section>
    )
}

export default AppMiddle
