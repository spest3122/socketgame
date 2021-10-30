import './app.scss'
import AppLeft from '@views/left'
import AppMiddle from '@views/middle'
import AppRight from '@views/right'

function App() {
    return (
        <div className="app">
            <AppLeft />
            <AppMiddle />
            <AppRight />
        </div>
    )
}

export default App
