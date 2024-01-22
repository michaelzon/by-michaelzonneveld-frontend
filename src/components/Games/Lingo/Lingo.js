import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './lingo.css';


export default function Lingo() {
    const items = Array.from({length: 30})


    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);

    const [currentInput, setCurrentInput] = useState('');

    const [firstGuessAsString, setFirstGuessAsString] = useState('');
    const [tempFirstGuess, setTempFirstGuess] = useState(new Array(6).fill(''));

    const [firstGuess, setFirstGuess] = useState(new Array(6).fill(''));
    const [secondGuess, setSecondGuess] = useState(new Array(6).fill(''));
    const [thirdGuess, setThirdGuess] = useState(new Array(6).fill(''));
    const [fourthGuess, setFourthGuess] = useState(new Array(6).fill(''));
    const [fifthGuess, setFifthGuess] = useState(new Array(6).fill(''));

    const [guesses, setGuesses] = useState([firstGuess, secondGuess, thirdGuess, fourthGuess, fifthGuess]);

    const handleChange = (event) => {
        setCurrentInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentInput.length !== 6) {
            setError('Word must be of six characters');
            setCurrentInput('');
            return;
        }

        alert('The word that you are guessing: ' + currentInput);

        let tempArr = currentInput.split('');

        setCurrentInput('');

        if (count === 0) {
            setGuesses([tempArr, secondGuess, thirdGuess, fourthGuess, fifthGuess]);
        }

        if (count === 1) {
            const newGuesses = [...guesses];
            newGuesses[1] = tempArr
            setGuesses(newGuesses);
        }

        if (count === 2) {
            const newGuesses = [...guesses];
            newGuesses[2] = tempArr
            setGuesses(newGuesses);
        }

        if (count === 3) {
            const newGuesses = [...guesses];
            newGuesses[3] = tempArr
            setGuesses(newGuesses);
        }

        if (count === 4) {
            const newGuesses = [...guesses];
            newGuesses[4] = tempArr
            setGuesses(newGuesses);
        }

        setCount(count +1);
    }

    return (
        <div className={'lingo-container'}>
            <div className={'grid'}>
                {items.map((_, i) => (
                    <div key={i} className="grid-item"> {i} </div>
                ))}
            </div>
            <div className={'grid'} id={'henk'}>
                {guesses.map((word, i) => (
                    word.map((letter, j) => (
                        <div key={`${i}-${j}`} className="grid-item">{letter}</div>
                    ))
                ))}
            </div>
            <div> {firstGuess}</div>
            <div className={'form'}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Word:
                        <input type={'text'} value={currentInput} onChange={handleChange}/>
                    </label>
                    <button type={'submit'} disabled={currentInput.length !== 6}> Submit</button>
                </form>
                <p>You entered: {}</p>
            </div>
        </div>

    )
}