export type USER = {
    id: string
    name: string
    online?: boolean
    score?: number
}

export type MESSAGE = {
    dateTime: string
    id: number
    message: string
    type: string
    user: USER
    from?: {
        id: string
        name: string
    }
}

export type MESSAGELIST = MESSAGE[]

export type USERS = USER[]

export type STARTDATETIME = string

export type CONTENT = {
    id: number
    name: string
}

export type QUESTION = {
    description: string
    id: number
    matches: number[]
    title: string
    contents: CONTENT[]
}
