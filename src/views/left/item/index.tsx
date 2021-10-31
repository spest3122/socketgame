import './styles.scss'
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { USER } from '@api/context/context'
import WsContext from '@api/context'
import { useContextSelector } from 'use-context-selector'

const PersonItem = (props: USER) => {
    const { name, online, score, id } = props
    const me = localStorage.getItem('userId')
    const doLikeOrDislike = useContextSelector(
        WsContext,
        (v) => v.doLikeOrDislike
    )

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
                {me !== id ? (
                    <div className="person-thumbs">
                        <ThumbUpIcon
                            className="person-thumb"
                            onClick={() =>
                                doLikeOrDislike({ type: 'GOOD', userId: id })
                            }
                        />
                        <ThumbDownIcon
                            className="person-thumb"
                            onClick={() =>
                                doLikeOrDislike({ type: 'BAD', userId: id })
                            }
                        />
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default PersonItem
