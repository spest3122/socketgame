import { USERS, QUESTION, MESSAGELIST, USER } from '@api/context/context.js'
import { useRef, useEffect, FC, ReactChild, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import WsContext from '../context'
type WsChild = {
    children: ReactChild
}
//ws link https://l8-upgrade-ws-api1.herokuapp.com/
const WsProvider: FC<WsChild> = ({ children }) => {
    const [ws, setWs] = useState<Socket | null>(null)
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
        setWs(
            io('https://l8-upgrade-ws-api1.herokuapp.com/', {
                extraHeaders: {
                    user_info: JSON.stringify({
                        id: localStorage.getItem('userId'),
                        name: 'nono',
                    }),
                },
            })
        )
        return () => {
            ws?.close()
        }
    }, [])
    useEffect(() => {
        if (ws) {
            ws.on('connect', () => {
                console.log('連接上了', ws)
            })
            ws.on('disconnect', () => {
                ws.close()
            })
            ws.on('connection', (data) => {
                let { users, question, messages, user } = data
                console.log(data)

                localStorage.setItem('userId', user.id)
                setUsers(users)
                setQuest(question)
                setMsgList(messages)
            })

            ws.on('messages', (data) => {
                console.log(data)

                let joinOrLeave = ['JOIN', 'LEAVE']
                if (joinOrLeave.includes(data.type)) {
                    setMsgList((prev) => [...prev, data])
                } else if (data.type === 'OVER_THEN_RESTART') {
                    setUsers(data.users)
                    setQuest(data.question)
                    setMsgList(data.messages)
                } else if (data.type === 'BLESS_YOU') {
                    setMsgList((prev) => [
                        ...prev,
                        { ...data.messages, type: data.blessType },
                    ])
                }
            })
        }
    }, [ws])
    const doGiveUp = () => {
        ws?.emit('giveUp')
    }
    const doSendAnswer = (data: string) => {
        if (data === '') {
            alert('你當我通靈?')
            return
        }
        ws?.emit('answer', data)
    }
    const doSendMsg = (data: string) => {
        if (data === '') {
            alert('你當我通靈?')
            return
        }
        ws?.emit('message', data)
    }

    const doLikeOrDislike = ({
        type,
        userId,
    }: {
        type: string
        userId: string
    }) => {
        if (type === '') {
            alert('你當我通靈?')
            return
        }
        if (userId === '') {
            alert('你當我靈媒?')
            return
        }
        ws?.emit('bless', { type: type, userId: userId })
    }
    return (
        <WsContext.Provider
            value={{
                users,
                quest,
                msgList,
                doLikeOrDislike,
                doGiveUp,
                doSendAnswer,
                doSendMsg,
            }}
        >
            {children}
        </WsContext.Provider>
    )
}

export default WsProvider
