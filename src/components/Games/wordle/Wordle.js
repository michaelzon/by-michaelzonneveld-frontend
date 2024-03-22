import React, {useEffect, useRef, useState} from 'react';
import './wordle.css';
import axios from "axios";

export default function Wordle() {
    const [mysteryWord, setMysteryWord] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    let [turn, setTurn] = useState(0);
    let [currentTileIndex, setCurrentTileIndex] = useState(0);
    const frequencies = useRef({});
    const keys = [
        'qwertyuiop⌫'.split(''),
        'asdfghjkl↵'.split(''),
        'zxcvbnm<>'.split(''),
    ];

    const [keyColors, setKeyColors] = useState(keys.map(row => row.map(key => ({key: key, color: ''}))));

    const fetchWord = () => {
        axios.get(`https://api.datamuse.com/words?sp=?????`)
            .then(response => {
                const randomInt = Math.floor(Math.random() * 100);
                if (response.data.length > randomInt && response.data[randomInt].word && !response.data[randomInt].word.includes(' ')) {
                    // setMysteryWord(response.data[randomInt].word.split(''));
                    setMysteryWord(['a', 'p', 'p', 'l', 'e'])
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
        return Array(6).fill(null).map(() =>
            Array(5).fill().map(() => ({
                letter: '',
                evaluation: '',
            }))
        );
    }

    useEffect(() => {
        fetchWord()
        // setMysteryWord(['h', 'e', 'l', 'l', 'o']);
        const rows = initRows();
        setRows(rows);
    }, []);

    function handleFrequencies() {
        if (mysteryWord.length > 0) {
            const newFrequencies = {};
            mysteryWord.forEach((letter) => {
                if (newFrequencies[letter]) {
                    newFrequencies[letter] += 1;
                } else {
                    newFrequencies[letter] = 1;
                }
            });
            frequencies.current = newFrequencies;
        }
    }

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (/^[a-z]+$/.test(e.key) && currentTileIndex < 5) {
                setCurrentInput(prev => prev + e.key)
                addLetterToTile(e.key)
            }

            if (e.key === 'Backspace') {
                // setCurrentInput(prev => prev + e.key)
                removeLetterFromTile()
            }

            if (e.key === 'Enter') {
                handleFrequencies()
                const input = rows[turn].map(tile => tile.letter).join('');
                alert('The word that you are guessing: ' + input);
                setCurrentInput(input);
                setCurrentTileIndex(0);
                evaluateLetters(rows[turn]);
                setTurn(prev => prev + 1);
            }
        }

        window.document.addEventListener('keyup', handleKeyUp);

        return () => {
            window.document.removeEventListener('keyup', handleKeyUp);
        };
    }, [turn, currentTileIndex]);


    const addLetterToTile = (key) => {
        setRows(prev => {
            const newRows = [...prev];
            newRows[turn][currentTileIndex].letter = key
            return newRows;
        });
        setCurrentTileIndex(currentTileIndex + 1);
    }

    const removeLetterFromTile = (currentRow) => {
        if (currentTileIndex > 0) {
            setRows(prev => {
                const newRows = [...prev];
                newRows[turn][currentTileIndex - 1].letter = "";
                return newRows;
            });
            setCurrentTileIndex(prev => prev - 1);
        }
    }

    const evaluateLetters = (currentRow) => {
        let shouldColorKeys = false;
        currentRow.forEach((tile, index) => {
            if (tile.letter === mysteryWord[index]) {
                shouldColorKeys = true;
                setRows(prev => {
                    const newRows = [...prev];
                    newRows[turn][index].evaluation = 'correct';
                    if (frequencies.current[tile.letter] > 0) {
                        frequencies.current[tile.letter]--
                    }
                    return newRows;
                });
            }
        });
        currentRow.forEach((tile, index) => {
            let presentAmount = 0;
            if (mysteryWord.includes(tile.letter)) { // je moet hem eerst alle correcten laten checken zodat je niet een 'e' markeert als geel als je 'eeeee' invoert bij 'hello', want dan kan je er voor zorgen dat e niet geel krijgt afhankelijk van de count letterfrequency, e is in dat geval dan e:0 omdat dat is afgetrokken van e op het moment dat ie als groeg werd gemarkeerd.
                shouldColorKeys = true;
                setRows(prev => {
                    const newRows = [...prev];
                    if (frequencies.current[tile.letter] > presentAmount) {
                        console.log(frequencies.current[tile.letter]);
                        newRows[turn][index].evaluation = 'present';
                        presentAmount++;
                    }
                    return newRows;
                });
            } else {
                shouldColorKeys = true;
                setRows(prev => {
                    const newRows = [...prev];
                    newRows[turn][index].evaluation = 'absent';
                    return newRows;
                });
            }

        });
        if (shouldColorKeys) {
            colorKeys();
        }
    }

    const checkEvaluation = (rows, keyColor, evaluation) => {
        const flattenedRows = rows.flat();
        return flattenedRows.some(tile => tile.letter === keyColor.key && tile.evaluation === evaluation);
    }

    const colorKeys = () => {
        setKeyColors(prev =>
            prev.map(row =>
                row.map(keyColor => {
                    const isAbsent = checkEvaluation(rows, keyColor, 'absent');
                    const isPresent = checkEvaluation(rows, keyColor, 'present');
                    const isCorrect = checkEvaluation(rows, keyColor, 'correct');
                    if (isCorrect) {
                        return {...keyColor, color: 'green'}
                    } else if (isPresent) {
                        return {...keyColor, color: 'yellow'}
                    } else if (isAbsent) {
                        return {...keyColor, color: 'grey'}
                    }
                    return keyColor
                })))
    }

    console.log(mysteryWord);

    return (
        <div className={'wordle-wrapper'}>
            <div className={'wordle-grid-wrapper'}>
                <div className={'wordle-grid'}>
                    {rows.map((row, i) => (
                        row.map((tile, j) => (
                            <div key={`${i}-${j}`}
                                 className={`wordle-grid-item ${tile.evaluation === 'correct' && 'letter-correct'} ${tile.evaluation === 'present' && 'letter-present'} ${tile.evaluation === 'absent' && 'letter-absent'} `}>
                                {tile.letter}
                            </div>
                        ))
                    ))}
                </div>
            </div>
            <div className={'keyboard'}>
                {keyColors.map((row, i) => (
                    <div className={'keyboard-row'} key={`${i}`}>
                        {row.map((keyObj, j) => (
                            <div
                                className={`keyboard-key--outer ${keyObj.color === 'grey' && 'key--outer__absent'} ${keyObj.color === 'yellow' && 'key--outer__present'} ${keyObj.color === 'green' && 'key--outer__correct'}`}
                                key={`${j}`}>
                                <div
                                    className={`keyboard-key--inner ${keyObj.color === 'grey' && 'key--inner__absent'} ${keyObj.color === 'yellow' && 'key--inner__present'} ${keyObj.color === 'green' && 'key--inner__correct'}`}>
                                    <div className={'keyboard-key--text'}>
                                        {keyObj.key}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            hi
        </div>
    )
}