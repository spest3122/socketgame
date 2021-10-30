import './styles.scss'
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { USER } from '@api/context/context'

const PersonItem = (props: USER) => {
    const { name, online, score } = props

    return (
        <div className="person-item">
            <div className="person-head">
                <div className="person-rank">{1}</div>
                <div
                    className={`person-online ${
                        online ? '' : 'person-offline'
                    }`}
                ></div>
                <div className="person-avatar">{2}</div>
            </div>
            <div className="person-info">
                <p className="person-score">{`${name} ${score}分`}</p>
                <div className="person-thumbs">
                    <ThumbUpIcon className="person-thumb" />
                    <ThumbDownIcon className="person-thumb" />
                </div>
            </div>
        </div>
    )
}

export default PersonItem
