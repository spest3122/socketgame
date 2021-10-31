import WsContext from '@api/context'
import { useContextSelector } from 'use-context-selector'

import './styles.scss'

const AppMiddle = () => {
    const { contents, title, description, matches } = useContextSelector(
        WsContext,
        (v) => v.quest
    )!
    const doGiveUp = useContextSelector(WsContext, (v) => v.doGiveUp)

    return (
        <section className="app-middle">
            <header className="middle-header">
                <button className="middle-quit" onClick={doGiveUp}>
                    放棄
                </button>
                <div className="middle-content">
                    <h1 className="middle-main-title">{title}</h1>
                    <h2 className="middle-second-title">{description}</h2>
                </div>
            </header>
            <main className="middle-main">
                {contents.map((item) => (
                    <p className="content-text" key={`contents${item.id}`}>
                        <span
                            className={
                                matches.includes(item.id)
                                    ? 'content-text-highlight'
                                    : ''
                            }
                        >
                            {item.name}
                        </span>
                    </p>
                ))}
            </main>
        </section>
    )
}

export default AppMiddle
