import React from 'react';
import './PhotoGallery.css';

export default function PhotoGallery ({photos}) {
    return (
        <div className='container'>
            <div className='header'></div>
            <div className='wrapper'>
                <div className='sidebar'>sidebar</div>
                <div className='container__items'>
                    {photos.map(photo => (
                        <div className='item'>
                            <img key={photo.id} src={photo.url} alt={photo.title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};