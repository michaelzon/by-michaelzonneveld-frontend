import React, {useEffect, useState} from 'react';
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

    useEffect(() => {
        const initialRows = Array(5).fill(null).map(() =>
            Array(5).fill().map(() => ({
                letter: '',
                inRightPlace: false,
                misPlacedLetter: false
            }))
        );
        axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
            .then(response => {
                const data = response.data[0]
                setData(data);
                return data
            })
            .then(data => {
                if (data && data.word) {
                    initialRows[0][0].letter = data.word[0];
                    initialRows[0][0].inRightPlace = true;
                    setRows(initialRows);
                    const mysteryWord = data.word.split('').map(char => ({
                            letter: char,
                            inRightPlace: true,
                            misPlacedLetter: false
                    }))
                    setMysteryWord(mysteryWord);
                }
            })
            .catch(error => {
                console.log('error fetching lingo data', error);
            });
    }, []);

    console.log('mysteryWord', mysteryWord);

    const handleChange = (event) => {
        setCurrentInput(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentInput.length !== 5) {
            setError('Word must be of six characters');
            setCurrentInput('');
            return;
        }
        alert('The word that you are guessing: ' + currentInput);

        const wordAsArray = currentInput.split('');
        const newRows = [...rows];
        wordAsArray.map((char, i) => (
            newRows[count][i].letter = char
        ))
        setRows(newRows);
        setCount(count + 1);
        setCurrentInput('');
    }

    console.log(rows);

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