import { useState, FC, ReactChild } from 'react'
import WsContext from '../context'
type WsChild = {
    children: ReactChild
}
const WsProvider: FC<WsChild> = ({ children }) => {
    const [v, setV] = useState<number>(32)
    return <WsContext.Provider value={{ v }}>{children}</WsContext.Provider>
}

export default WsProvider
