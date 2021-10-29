import { createContext } from 'use-context-selector'

interface WsContextType {
    v: number
}

const WsContext = createContext<Partial<WsContextType>>({
    v: 32,
})

export default WsContext
