import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './photo.css';


export default function Photo({photos}) {
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const photoId = parseInt(useParams().id)

    useEffect(() => {
        const retrievedPhoto = photos.find(p => p.id === photoId);
        if (retrievedPhoto) {
            setPhoto(retrievedPhoto);
        } else {
            setError('Photo not found');
        }
    }, [photos, photoId])

    if (error) {
        return <div className={"error-message"}>Error: {error}</div>
    }

    return (
        <div className={'photo__flex-box--column'}>
            {photo ?
                <div className={'photo__flex-box--row'}>
                    <div className={'photo__image'}>
                        <img src={photo.url} alt={photo.title}/>
                    </div>
                    <div className={'photo__description'}>
                        <span> {photo.location}</span>
                        <span> {photo.date}</span>
                    </div>
                </div>
                :
                <p> Loading photo... </p>

            }
        </div>
    )
}