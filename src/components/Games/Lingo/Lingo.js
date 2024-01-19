import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './lingo.css';


export default function Lingo() {
    const [error, setError] = useState(null);
    const items = Array.from({length: 30})
    const [firstGuess, setFirstGuess] = useState('');
    const [tempFirstGuess, setTempFirstGuess] = useState('moeder');
    const [tempFirstGuessAsArray, setTempFirstGuessAsArray] = useState(tempFirstGuess.split(''));
    const [secondGuess, setSecondGuess] = useState('moeten');
    const [thirdGuess, setThirdGuess] = useState('moetje');
    const [fourthGuess, setFourthGuess] = useState('moesje');
    const [fifthGuess, setFifthGuess] = useState('moeite');
    const [guesses, setGuesses] = useState([tempFirstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess]);
    const handleChange = (event) => {
        setFirstGuess(event.target.value);
    }

    const updateGuesses = () => {
        setGuesses([firstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess]);
    }

    const handleSubmit = (event) => {
        // updateGuesses()
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
            <div className={'grid'} id={'henk'}>
                {guesses.map((word, i) => {
                        const wordAsArray = word.split('');
                        return wordAsArray.map((eachLetter, j) => {
                                return <div key={j} className="grid-item"> {eachLetter} </div>
                            }
                        )
                    }
                )}
            </div>
            <div className={'form'}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Word:
                        <input type={'text'} value={firstGuess} onChange={handleChange}/>
                    </label>
                    <button type={'submit'}> Submit</button>
                </form>
                <p>You entered: {tempFirstGuess + secondGuess}</p>
            </div>
        </div>

    )
}