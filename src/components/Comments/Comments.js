import React, {useEffect, useState, PureComponent} from 'react';
import './Comments.css';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const onChangeHandler = (event) => {
        console.log(event.target.value)
        setComment(event.target.value);
    }

    // take the comments that we already have and place the new one in the end of the list
    const onClickHandler = () => {
        setComments((comments) => [comments, comment]);
    }

    return (
        <div className={'comments'}>
            <div className={'comment__flex-row'}>
                <div className={'comment__user-info'}> Comment:</div>
                <div className={'comment__text'}>
                    <textarea value={comment} onChange={onChangeHandler} className={'input-box'}/>
                </div>
                <div className={'comment__actions'}>
                    <button className={'comment-button'} onClick={onClickHandler}>Submit</button>
                </div>
                <div className={'comment__overview'}>
                    {comments.map((text) => (
                        <div className={'comment__item'}>{text}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}