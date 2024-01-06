import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Comments from "../Comments/Comments";
import './Photo.css';


export default function Photo({photos}) {
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState(null);
    const photoId = parseInt(useParams().id)
    console.log('photoId');

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
        <div className={'photo-comments'}>
            <div className={'photo'}>
                {photo ? <img src={photo.url} alt={photo.title}/> : <p> Loading photo...</p>}
            </div>
            <Comments></Comments>
        </div>
    )
}