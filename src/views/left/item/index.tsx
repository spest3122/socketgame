import { useState } from 'react'
import './styles.scss'
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'

interface Info {
    name: string
    score: number
    rank?: 1 | 2 | 3
    online: boolean
    gender: '男' | '女'
}

const PersonItem = () => {
    const [info, setInfo] = useState<Info>({
        name: '大天津',
        score: 99,
        online: true,
        rank: 1,
        gender: '女',
    })
    return (
        <div className="person-item">
            <div className="person-head">
                <div className="person-rank">{info.rank}</div>
                <div className="person-online"></div>
                <div className="person-avatar">{info.gender}</div>
            </div>
            <div className="person-info">
                <p className="person-score">{`${info.name} ${info.score}分`}</p>
                <div className="person-thumbs">
                    <ThumbUpIcon className="person-thumb" />
                    <ThumbDownIcon className="person-thumb" />
                </div>
            </div>
        </div>
    )
}

export default PersonItem
