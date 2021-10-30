import { USERS, QUESTION, MESSAGELIST } from './context.js'
import { createContext } from 'use-context-selector'

interface WsContextType {
    users: USERS
    quest: QUESTION
    msgList: MESSAGELIST
}

const WsContext = createContext<Partial<WsContextType>>({})

export default WsContext
