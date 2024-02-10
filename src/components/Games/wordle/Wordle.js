import React, {useEffect, useRef, useState} from 'react';
import './wordle.css';
import axios from "axios";

export default function Wordle() {
    const [mysteryWord, setMysteryWord] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    let [turn, setTurn] = useState(0);
    let [currentTileIndex, setCurrentTileIndex] = useState(0);

    const fetchWord = () => {
        axios.get(`https://api.datamuse.com/words?sp=?????`)
            .then(response => {
                const randomInt = Math.floor(Math.random() * 100);
                if (response.data.length > randomInt && response.data[randomInt].word && !response.data[randomInt].word.includes(' ')) {
                    setMysteryWord(response.data[randomInt].word.split(''));
                } else {
                    console.log('No suitable word found, retrying...');
                    fetchWord();
                }
            })
            .catch(error => {
                console.log('error fetching wordle data', error);
            });
    }

    const initRows = () => {
        return Array(5).fill(null).map(() =>
            Array(5).fill().map(() => ({
                letter: '',
                evaluation: '',
            }))
        );
    }

    useEffect(() => {
        fetchWord()
        const rows = initRows();
        setRows(rows);
    }, []);

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (/^[a-z]+$/.test(e.key)  && currentTileIndex < 5) {
                console.log(e.key);
                setCurrentInput(prev => prev + e.key)
                addLetterToTile(e.key)
            }

            // todo je wil eigenlijk iets fixen dat als currentInput gewijzigd wordt, hij opnieuw die rijen gaat bouwen,
            //  want nu moet je een riedeltje uit addLetterToFile herhalen, misschien kan je currentinput ergens als
            //  dependency zetten, en dat als die wijzigt, er dan een hook komt, die dan al die rijen weer gaat opbiouwen

            if (e.key === 'Backspace') {
                if (currentTileIndex > 0) {
                    setRows(prev => {
                        const newRows = [...prev];
                        newRows[turn][currentTileIndex - 1].letter = "";
                        newRows[turn][currentTileIndex - 1].evaluation = "";
                        return newRows;
                    });
                    setCurrentTileIndex(prev => prev - 1);
                }
                else {
                    return
                }
            }

            if (e.key === 'Enter') {
                const input = rows[turn].map(tile => tile.letter).join('');
                alert('The word that you are guessing: ' + input);
                setCurrentInput(input);
                setTurn(prev => prev + 1);
                setCurrentTileIndex(0);
                evaluateLetter(rows[turn]);
            }
        }

        window.document.addEventListener('keyup', handleKeyUp);

        return () => {
            window.document.removeEventListener('keyup', handleKeyUp);
        };
    }, [turn, currentTileIndex]);

    console.log('rows', rows);

    const addLetterToTile = (key) => {
        setRows(prev => {
            const newRows = [...prev];
            const newRow = [...newRows[turn]];
            newRow[currentTileIndex] = {...newRow[currentTileIndex], letter: key};
            newRows[turn] = newRow;
            return newRows;
        });
        setCurrentTileIndex(currentTileIndex + 1);
    }

    const removeLetterFromTile = (currentRow) => {
        const newRows = [...rows];
        if (currentTileIndex > 0) {
            currentRow[currentTileIndex] = {...currentRow[currentTileIndex-1], letter: ""};
            newRows[turn] = currentRow;
        }

        return newRows;
    }

    const evaluateLetter = (currentRow) => {

        console.log(currentRow);

    }

    console.log(mysteryWord);

    return (
        <div className={'wordle-wrapper'}>
            <div className={'wordle-grid'}>
                {rows.map((row, i) => (
                    row.map((tile, j) => (
                        <div key={`${i}-${j}`} className={`wordle-grid-item`}>
                            {tile.letter}
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}