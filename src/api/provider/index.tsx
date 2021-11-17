import { USERS, QUESTION, MESSAGELIST, USER } from '@api/context/context.js'
import { useRef, useEffect, FC, ReactChild, useState } from 'react'
import { io, Socket } from 'socket.io-client'

import WsContext from '../context'
type WsChild = {
    children: ReactChild
}
//ws link https://l8-upgrade-ws-api1.herokuapp.com/
const WsProvider: FC<WsChild> = ({ children }) => {
    const ws = useRef<Socket>({} as Socket)
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
        const _socket = io('https://l8-upgrade-ws-api1.herokuapp.com/', {
            extraHeaders: {
                user_info: JSON.stringify({
                    id: localStorage.getItem('userId'),
                    name: 'nono',
                }),
            },
        })
        _socket.on('connect', () => {
            console.log('連接上了', ws)
        })
        _socket.on('disconnect', () => {
            ws.current?.close()
        })
        _socket.on('connection', (data) => {
            let { users, question, messages, user } = data
            console.log(data)

            localStorage.setItem('userId', user.id)
            setUsers(users)
            setQuest(question)
            setMsgList(messages)
        })

        _socket.on('messages', (data) => {
            console.log(data, 33)

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
                    { ...data, type: data.blessType },
                ])
            } else if (data.type === 'MESSAGE') {
                setMsgList((prev) => [...prev, data])
            } else if (data.type === 'GIVE_UP') {
                setMsgList((prev) => [...prev, data])
                setQuest(data.newQuestion)
            }
        })
        ws.current = _socket
        return () => {
            ws.current?.close()
        }
    }, [])
    const doGiveUp = () => {
        ws.current?.emit('giveUp')
    }
    const doSendAnswer = (data: string) => {
        if (data === '') {
            alert('你當我通靈?')
            return
        }
        ws.current?.emit('answer', data)
    }
    const doSendMsg = (data: string) => {
        if (data === '') {
            alert('你當我通靈?')
            return
        }
        ws.current?.emit('message', data)
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
        ws.current?.emit('bless', { type: type, userId: userId })
    }
    const doRestart = () => {
        ws.current?.emit('restart')
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
                doRestart,
            }}
        >
            {children}
        </WsContext.Provider>
    )
}

export default WsProvider
