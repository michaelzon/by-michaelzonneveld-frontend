import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './lingo.css';


export default function Lingo() {
    const [error, setError] = useState(null);
    const items = Array.from({length: 30})
    const [firstGuess, setFirstGuess] = useState('');
    const [secondGuess, setSecondGuess] = useState('');
    const [thirdGuess, setThirdGuess] = useState('');
    const [fourthGuess, setFourthGuess] = useState('');
    const [fifthGuess, setFifthGuess] = useState('');
    const [guesses, setGuesses] = useState([firstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess]);
    const handleChange = (event) => {
        setFirstGuess(event.target.value);
    }

    const updateGuesses = () => {
        console.log(firstGuess);
        setGuesses([firstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess]);
    }


    console.log(guesses);

    const handleSubmit = (event) => {
        updateGuesses()
        event.preventDefault();
        alert('The word that you are guessing: ' + firstGuess);
    }


    return (
        <div className={'lingo-container'}>
            <div className={'grid'}>
                {items.map((_, i) => (
                    <div key={i} className="grid-item"> {i} </div>
                ))}
            </div>
            <div className={'form'}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Word:
                        <input type={'text'} value={firstGuess} onChange={handleChange}/>
                    </label>
                    <button type={'submit'}> Submit</button>
                </form>
                {/*<p>You entered: {firstGuess}</p>*/}
            </div>
        </div>

    )
}