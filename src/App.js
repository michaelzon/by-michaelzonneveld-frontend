import logo from './logo.svg';
import './App.css';
import PhotoGallery from "./components/PhotoGallery";

function App() {

    const photos = [
        {id: 41410003, url: '/images/000041410003.JPG', title: '000041410003'},
        {id: 41410005, url: '/images/000041410005.JPG', title: '000041410005'},
        {id: 41410006, url: '/images/000041410006.JPG', title: '000041410006'},
        {id: 41410007, url: '/images/000041410007.jpg', title: '000041410007'},
        {id: 41410008, url: '/images/000041410008.JPG', title: '000041410008'},
        {id: 41410019, url: '/images/000041410019.JPG', title: '000041410019'},
        {id: 41410021, url: '/images/000041410021.JPG', title: '000041410021'},
        {id: 41410023, url: '/images/000041410023.JPG', title: '000041410023'},
        {id: 41410025, url: '/images/000041410025.JPG', title: '000041410025'},
        {id: 41410026, url: '/images/000041410026.JPG', title: '000041410026'},
        {id: 41410027, url: '/images/000041410027.JPG', title: '000041410027'},
        {id: 41410029, url: '/images/000041410029.JPG', title: '000041410029'},
        {id: 41410032, url: '/images/000041410032.JPG', title: '000041410032'},
        {id: 41410033, url: '/images/000041410033.JPG', title: '000041410033'},
        {id: 41410034, url: '/images/000041410034.JPG', title: '000041410034'},
        {id: 41410036, url: '/images/000041410036.JPG', title: '000041410036'},
    ];

    return (
        <div className="App">
            <h1>Photo Gallery</h1>
            <PhotoGallery photos={photos}/>
        </div>
    );
}

export default App;
