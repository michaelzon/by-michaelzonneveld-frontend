import React, {useEffect, useRef, useState} from 'react';
import './lingo.css';
import axios from "axios";

export default function Lingo() {
    const items = Array.from({length: 25})
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [mysteryWord, setMysteryWord] = useState([]);
    const [rows, setRows] = useState([]);
    const charOccurrences = useRef({});

    useEffect(() => {
        const initialRows = Array(5).fill(null).map(() =>
            Array(5).fill().map(() => ({
                letter: '',
                inRightPlace: false,
                misPlacedLetter: false,
            }))
        );

        axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
            .then(response => {
                const data = response.data[0]
                setData(data);
                initialRows[0][0].letter = data.word[0];
                initialRows[0][0].inRightPlace = true;
                setRows(initialRows);
                const mysteryWord = data.word.split('');
                setMysteryWord(mysteryWord);
            })
            .catch(error => {
                console.log('error fetching lingo data', error);
            });
    }, []);

    const handleChange = (event) => {
        setCurrentInput(event.target.value);
    }

    function handleCharOccurrences() {
        if (mysteryWord.length > 0) {
            const newOccurrences = {};
            mysteryWord.forEach((char) => {
                if (newOccurrences[char]) {
                    newOccurrences[char] += 1;
                } else {
                    newOccurrences[char] = 1;
                }
            });
            charOccurrences.current = newOccurrences;
        }
    }

    const handleRowCheck = () => {
        const inputArray = currentInput.split('');
        const newRows = [...rows];
        inputArray.map((char, i) => {
            newRows[count][i].letter = char;
            if (newRows[count][i].letter === mysteryWord[i]) {
                newRows[count][i].inRightPlace = true;

                // if a letter is marked as correctly placed we need to decrement that char occurrence of that letter,
                // so it is not marked as misplaced later on
                if (charOccurrences.current[mysteryWord[i]] > 0) {
                    charOccurrences.current[mysteryWord[i]] = charOccurrences.current[mysteryWord[i]] - 1
                }
            }
        });

        // this ensures that the first 'o' in the misspelled 'hollo' does not get a yellow mark,
        // as there is only one occurrence for that letter in the input that is already correctly placed
        // we also need a counter because we don't want that the number of yellow marks overrides the frequency
        // of the occurring letter
        inputArray.map((char, i) => {
            let misplacedCounter = 0;
            newRows[count].map((item, i) => {
                if (char === item.letter && item.inRightPlace === false && mysteryWord.includes(char)
                    && charOccurrences.current[newRows[count][i].letter] > misplacedCounter ) {
                    newRows[count][i].misPlacedLetter = true;
                    misplacedCounter = misplacedCounter + 1;
                }
            })
        })

        handleCharOccurrences();

        return newRows
    }

    const handleSubmit = (event) => {
        handleCharOccurrences();
        event.preventDefault();
        if (currentInput.length !== 5) {
            setError('Word must be of six characters');
            setCurrentInput('');
            return;
        }
        alert('The word that you are guessing: ' + currentInput);
        const newRows = handleRowCheck()
        setRows(newRows);
        setCount(count + 1);
        setCurrentInput('');
    }

    return (
        <div className={'lingo-container'}>
            <div className={'grid'}>
                {items.map((_, i) => (
                    <div key={i} className="grid-item"> {i} </div>
                ))}
            </div>
            <div className={'grid'} id={'henk'}>
                {rows.map((row, i) => (
                    row.map((item, j) => (
                        <div key={`${i}-${j}`}
                             className={`grid-item ${item.inRightPlace ? 'letter-in-right-place' : ''} ${item.misPlacedLetter ? 'misplaced-letter' : ''} `}>{item.letter}</div>
                    ))
                ))}
            </div>
            <div className={'form'}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Word (objects):
                        <input type={'text'} value={currentInput} onChange={handleChange}/>
                    </label>
                    <button type={'submit'} disabled={currentInput.length !== 5}> Submit</button>
                </form>
            </div>
        </div>

    )
}