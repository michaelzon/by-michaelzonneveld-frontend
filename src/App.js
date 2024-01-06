import './App.css';
import PhotoGallery from "./components/PhotoGallery/PhotoGallery";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Photo from "./components/Photo/Photo";
import Sidebar from "./SideBar";

export default function App() {

    const photos = [
        {id: 41410003, url: '/images/bologna/000041410003.JPG', album: 'bologna', title: '000041410003'},
        {id: 41410005, url: '/images/bologna/000041410005.JPG', album: 'bologna', title: '000041410005'},
        {id: 41410006, url: '/images/bologna/000041410006.JPG', album: 'bologna', title: '000041410006'},
        {id: 41410007, url: '/images/bologna/000041410007.jpg', album: 'bologna', title: '000041410007'},
        {id: 41410008, url: '/images/bologna/000041410008.JPG', album: 'bologna', title: '000041410008'},
        {id: 41410019, url: '/images/bologna/000041410019.JPG', album: 'bologna', title: '000041410019'},
        {id: 41410021, url: '/images/bologna/000041410021.JPG', album: 'bologna', title: '000041410021'},
        {id: 41410023, url: '/images/bologna/000041410023.JPG', album: 'bologna', title: '000041410023'},
        {id: 41410025, url: '/images/bologna/000041410025.JPG', album: 'bologna', title: '000041410025'},
        {id: 41410026, url: '/images/bologna/000041410026.JPG', album: 'bologna', title: '000041410026'},
        {id: 41410027, url: '/images/bologna/000041410027.JPG', album: 'bologna', title: '000041410027'},
        {id: 41410029, url: '/images/bologna/000041410029.JPG', album: 'bologna', title: '000041410029'},
        {id: 41410032, url: '/images/bologna/000041410032.JPG', album: 'bologna', title: '000041410032'},
        {id: 41410033, url: '/images/bologna/000041410033.JPG', album: 'bologna', title: '000041410033'},
        {id: 41410034, url: '/images/bologna/000041410034.JPG', album: 'bologna', title: '000041410034'},
        {id: 41410036, url: '/images/bologna/000041410036.JPG', album: 'bologna', title: '000041410036'},

        {id: 6036, url: '/images/morocco/6036.JPG', album: 'morocco', title: '6036'},
        {id: 6041, url: '/images/morocco/6041.JPG', album: 'morocco', title: '6041'},
        {id: 6048, url: '/images/morocco/6048.JPG', album: 'morocco', title: '6048'},
        {id: 6050, url: '/images/morocco/6050.JPG', album: 'morocco', title: '6050'},
    ];

    return (
        <Router>
            <div className='container'>
                <div className='header'></div>
                <div className='wrapper'>
                    <Sidebar></Sidebar>
                    <Routes>
                        {/*<Route path={"/bologna"} element={<PhotoGallery photos={photos.filter(photo => photo.album === 'bologna')}/>}/>*/}
                        <Route path={"/:album"} element={<PhotoGallery photos={photos}/>}/>
                        <Route path={"/:album/:id"} element={<Photo photos={photos} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

