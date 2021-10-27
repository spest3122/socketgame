import { io, Socket } from 'socket.io-client'
import './app.scss'
import AppLeft from '@views/left'
import { useRef, useEffect } from 'react'
import AppMiddle from '@views/middle'
import AppRight from '@views/right'

//ws link https://l8-upgrade-ws-api1.herokuapp.com/
function App() {
    const ws = useRef<Socket | null>(null)
    useEffect(() => {
        // ws.current = io('https://l8-upgrade-ws-api1.herokuapp.com/', {
        //     extraHeaders: {
        //         user_info: JSON.stringify({
        //             id: '398cfb03-bf20-4130-91e1-8a9a01bd6a5d',
        //             name: 'nono',
        //         }),
        //     },
        // })
        // ws.current.on('connect', () => {
        //     console.log(`連接上了 ${ws.current?.connected}`)
        // })

        // ws.current.on('disconnect', () => {
        //     console.log(`連接上了 ${ws.current?.disconnected}`)
        // })

        // ws.current.on('connection', (data) => {
        //     console.log(data)
        // })

        const wsCurrent = ws.current

        return () => {
            wsCurrent.close()
        }
    }, [])

    return (
        <div className="app">
            <AppLeft />
            <AppMiddle />
            <AppRight />
        </div>
    )
}

export default App
