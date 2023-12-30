import React from 'react';

export default function Photo ({match, photos}) {
    const photoId = match.params.id;
    const photo = photos.find(p => p.id === photoId)

    return (
        <div>
            {photo ? <img src={photo.url} alt={photo.title} /> : <p> Photo couldn't be retrieved</p>}
        </div>
    )
}