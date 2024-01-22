import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './lingo.css';
import axios from "axios";


export default function Lingo() {
    const items = Array.from({length: 25})
    const [lingoData, setLingoData] = useState(null);

    const [error, setError] = useState(null);
    const [count, setCount] = useState(0);

    const [currentInput, setCurrentInput] = useState('');
    const [firstLetter, setFirstLetter] = useState('');
    const [firstRow, setFirstRow] = useState(new Array(5).fill(''));
    const [secondRow, setSecondRow] = useState(new Array(5).fill(''));
    const [thirdRow, setThirdRow] = useState(new Array(5).fill(''));
    const [fourthRow, setFourthRow] = useState(new Array(5).fill(''));
    const [fifthRow, setFifthRow] = useState(new Array(5).fill(''));

    const [rows, setRows] = useState([firstRow, secondRow, thirdRow, fourthRow, fifthRow]);

    useEffect(() => {
        axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
            .then(response => {
                const data = response.data[0]
                setLingoData(data);
                return data
            })
            .then(data  => {
                if (data && data.word) {
                    const rowsWithFirstLetter = [...rows]
                    rowsWithFirstLetter[0][0] = data.word[0];
                    setRows(rowsWithFirstLetter);
                }
            })
            .catch(error => {
                console.log('error fetching lingo data', error);
            });
    }, []);

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

        let tempArr = currentInput.split('');

        setCurrentInput('');

        const newRows = [...rows];
        newRows[count] = tempArr
        setRows(newRows);
        setCount(count + 1);
    }

    return (
        <div className={'lingo-container'}>
            <div className={'grid'}>
                {items.map((_, i) => (
                    <div key={i} className="grid-item"> {i} </div>
                ))}
            </div>
            <div className={'grid'} id={'henk'}>
                {rows.map((word, i) => (
                    word.map((letter, j) => (
                        <div key={`${i}-${j}`} className="grid-item">{letter}</div>
                    ))
                ))}
            </div>
            <div> {firstRow}</div>
            <div className={'form'}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Word:
                        <input type={'text'} value={currentInput} onChange={handleChange}/>
                    </label>
                    <button type={'submit'} disabled={currentInput.length !== 5}> Submit</button>
                </form>
                <p>You entered: {}</p>
            </div>
        </div>

    )
}