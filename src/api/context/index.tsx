import { USERS, QUESTION, MESSAGELIST } from './context.js'
import { createContext } from 'use-context-selector'

interface WsContextType {
    users: USERS
    quest: QUESTION
    msgList: MESSAGELIST
    finalCountDown: string
    doLikeOrDislike: ({
        type,
        userId,
    }: {
        type: string
        userId: string
    }) => void
    doGiveUp: () => void
    doSendAnswer: (data: string) => void
    doSendMsg: (data: string) => void
    doRestart: () => void
}

const WsContext = createContext<Partial<WsContextType>>({})

export default WsContext
