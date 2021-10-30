import { USERS, QUESTION, MESSAGELIST, USER } from '@api/context/context.js'
import { useRef, useEffect, FC, ReactChild, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import WsContext from '../context'
type WsChild = {
    children: ReactChild
}
//ws link https://l8-upgrade-ws-api1.herokuapp.com/
const WsProvider: FC<WsChild> = ({ children }) => {
    const ws = useRef<Socket | null>(null)
    const [users, setUsers] = useState<USERS>([])
    const [quest, setQuest] = useState<QUESTION>({
        description: '',
        id: 0,
        matches: [],
        title: '',
        contents: [],
    })
    const [msgList, setMsgList] = useState<MESSAGELIST>([])
    useEffect(() => {
        ws.current = io('https://l8-upgrade-ws-api1.herokuapp.com/', {
            extraHeaders: {
                user_info: JSON.stringify({
                    id: '2b8cf3a3-5eec-4dca-a663-9c3a9bb89818',
                    name: 'nono',
                }),
            },
        })
        ws.current.on('connect', () => {
            console.log('連接上了', ws.current)
        })
        ws.current.on('disconnect', () => {
            console.log('失連了', ws.current)
        })
        ws.current.on('connection', (data) => {
            let { users, question, messages } = data
            console.log(data)

            setUsers(users)
            setQuest(question)
            setMsgList(messages)
        })
        const wsCurrent = ws.current
        return () => {
            wsCurrent.close()
        }
    }, [])
    return (
        <WsContext.Provider value={{ users, quest, msgList }}>
            {children}
        </WsContext.Provider>
    )
}

export default WsProvider
