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

    console.log('keys', keys);

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
                // setCurrentInput(prev => prev + e.key) // todo dit moet nog beter, indien currentInput als state later nodig is.
                removeLetterFromTile()
            }

            if (e.key === 'Enter') {
                handleFrequencies()
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

    const evaluateLetter = (currentRow) => {
        currentRow.forEach((tile, index) => {
            if (tile.letter === mysteryWord[index]) {
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
                setRows(prev => {
                    const newRows = [...prev];
                    newRows[turn][index].evaluation = 'absent';
                    return newRows;
                });
            }
        });
    }

    console.log('mysteryword', mysteryWord);
    // console.log('rows', rows);
    // console.log('frequencies', frequencies)
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
                {keys.map((row, i) => (
                    <div className={'keyboard--row'} key={`${i}`}>
                        {row.map((key, j) => (
                            <div className={'keyboard--key--outer'} key={`${j}`}>
                                <div className={'keyboard--key--inner'}>
                                    <div className={'keyboard--key--text'}>
                                        {key}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}