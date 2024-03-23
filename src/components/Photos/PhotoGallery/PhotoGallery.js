// import React from 'react';
// import './photo-gallery.css';
// import {Link, useParams} from "react-router-dom";

// export default function PhotoGallery({photos}) {
//     const { album } = useParams();
//     const photosFromAlbum = photos.filter(photo => photo.album === album);

//     return (
//         <div className='container__items'>
//             {photosFromAlbum.map(photo => (
//                 <div key={photo.id} className='item'>
//                     <Link to={`/${photo.album}/${photo.id}`}>
//                         <img src={photo.url} alt={photo.title}/>
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// };