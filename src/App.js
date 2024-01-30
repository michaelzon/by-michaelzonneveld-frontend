import './app.css';
import PhotoGallery from "./components/Photos/PhotoGallery/PhotoGallery";
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Photo from "./components/Photos/Photo/Photo";
import Sidebar from "./components/Sidebar/SideBar";
import Experience from "./components/Experience/Expierence";
import Home from "./components/Home";
import Header from "./components/Header/Header";
import AboutMe from "./components/AboutMe/AboutMe";
import Footer from "./components/Footer/Footer";
import Slingo from "./components/Games/Slingo/Slingo";
import Overview from "./components/Games/Overview";


export default function App() {

    const photos = [
        {
            id: 41410003,
            url: '/images/bologna/000041410003.JPG',
            album: 'bologna',
            title: '000041410003',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410005,
            url: '/images/bologna/000041410005.JPG',
            album: 'bologna',
            title: '000041410005',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410006,
            url: '/images/bologna/000041410006.JPG',
            album: 'bologna',
            title: '000041410006',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410007,
            url: '/images/bologna/000041410007.jpg',
            album: 'bologna',
            title: '000041410007',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410008,
            url: '/images/bologna/000041410008.JPG',
            album: 'bologna',
            title: '000041410008',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410019,
            url: '/images/bologna/000041410019.JPG',
            album: 'bologna',
            title: '000041410019',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410021,
            url: '/images/bologna/000041410021.JPG',
            album: 'bologna',
            title: '000041410021',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410023,
            url: '/images/bologna/000041410023.JPG',
            album: 'bologna',
            title: '000041410023',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410025,
            url: '/images/bologna/000041410025.JPG',
            album: 'bologna',
            title: '000041410025',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410026,
            url: '/images/bologna/000041410026.JPG',
            album: 'bologna',
            title: '000041410026',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410027,
            url: '/images/bologna/000041410027.JPG',
            album: 'bologna',
            title: '000041410027',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410029,
            url: '/images/bologna/000041410029.JPG',
            album: 'bologna',
            title: '000041410029',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410032,
            url: '/images/bologna/000041410032.JPG',
            album: 'bologna',
            title: '000041410032',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410033,
            url: '/images/bologna/000041410033.JPG',
            album: 'bologna',
            title: '000041410033',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410034,
            url: '/images/bologna/000041410034.JPG',
            album: 'bologna',
            title: '000041410034',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },
        {
            id: 41410036,
            url: '/images/bologna/000041410036.JPG',
            album: 'bologna',
            title: '000041410036',
            location: 'Centre of Bologna',
            date: '21-9-21'
        },

        {
            id: 6036,
            url: '/images/morocco/6036.JPG',
            album: 'morocco',
            title: '6036',
            location: 'Marrakesh, Rue Yves St Laurent',
            date: '5-10-22'
        },
        {
            id: 6041,
            url: '/images/morocco/6041.JPG',
            album: 'morocco',
            title: '6041',
            location: 'Marrakesh, Rue Yves St Laurent',
            date: '5-10-22'
        },
        {
            id: 6048,
            url: '/images/morocco/6048.JPG',
            album: 'morocco',
            title: '6048',
            location: 'Marrakesh, Rue Yves St Laurent',
            date: '5-10-22'
        },
        {
            id: 6050,
            url: '/images/morocco/6050.JPG',
            album: 'morocco',
            title: '6050',
            location: 'Marrakesh, Rue Yves St Laurent',
            date: '5-10-22'
        },
    ];

    return (
        <Router>
            <div className='container'>
                <Header></Header>
                <div className='wrapper'>
                    <Sidebar></Sidebar>
                    <div className={'content-wrapper'}>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'/about-me'} element={<AboutMe/>}/>
                            <Route path={'/experience'} element={<Experience/>}/>
                            <Route path={"/:album"} element={<PhotoGallery photos={photos}/>}/>
                            <Route path={"/:album/:id"} element={<Photo photos={photos}/>}/>
                            <Route path={"/games/"} element={<Overview/>}/>
                            <Route path={"/games/slingo"} element={<Slingo/>}/>
                        </Routes>
                    </div>
                </div>
                <Footer/>
            </div>
        </Router>
    );
}

