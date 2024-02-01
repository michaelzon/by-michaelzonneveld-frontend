import React, {useEffect, useRef, useState} from 'react';
import './slingo.css';
import axios from "axios";

export default function Slingo() {
    const items = Array.from({length: 25})
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [mysteryWord, setMysteryWord] = useState([]);
    const [rows, setRows] = useState([]);
    const charOccurrences = useRef({});
    const [userScore, setUserScore] = useState(0);
    const [numberOfRounds, setNumberOfRounds] = useState(1);
    const [guessedCorrectly, isGuessedCorrectly] = useState(false)
    const shortenedAlphabet = [...'abcdefghijklmnoprstuvwz'];
    const randomIndex = Math.floor(Math.random() * shortenedAlphabet.length);
    const randomLetter = shortenedAlphabet[randomIndex];
    const randomInt = Math.floor(Math.random() * 100);

    useEffect(() => {
        setUpNewRound();
    }, []);

    function setUpNewRound() {
        const initialRows = createInitialRows();
        if (initialRows) {
            fetchWord(initialRows)
        }
    }

    const createInitialRows = () => {
        return Array(5).fill(null).map(() =>
            Array(5).fill().map(() => ({
                letter: '',
                inRightPlace: false,
                misPlacedLetter: false,
            }))
        );
    }

    const fetchWord = (initialRows) => {
        axios.get(`https://api.datamuse.com/words?sp=${randomLetter}????`)
            .then(response => {
                if (response.data.length > randomInt && response.data[randomInt].word) {
                    const suitableWord = response.data.find(wordObj => !wordObj.word.includes(' '));
                    if (suitableWord) {
                        const data = response.data[randomInt];
                        setData(data);
                        initialRows[0][0].letter = data.word[0];
                        initialRows[0][0].inRightPlace = true;
                        setRows(initialRows);
                        const mysteryWord = data.word.split('');
                        setMysteryWord(mysteryWord);
                    } else {
                        console.log('No suitable word found, retrying...');
                        fetchWord();
                    }
                }
            })
            .catch(error => {
                console.log('error fetching slingo data', error);
            });
    }

    const handleChange = (event) => {
        setCurrentInput(event.target.value);
    }

    function handleCharOccurrences() {
        if (mysteryWord.length === 0) {
            return;
        }

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

    const markRightPlaces = (input, mysteryWord, currentRow, newRows, charOccurrences) => {
        input.forEach((char, i) => {
            newRows[currentRow][i].letter = char;
            if (char === mysteryWord[i]) {
                newRows[currentRow][i].inRightPlace = true;
                if (charOccurrences.current[char] > 0) {
                    charOccurrences.current[char]--;
                }
            }
        });
    }

    const markMisplacements = (input, mysteryWord, currentRow, newRows, charOccurrences) => {
        input.forEach((char) => {
            let misplacements = 0;
            if (mysteryWord.includes(char)) {
                newRows[currentRow].forEach((item, i) => {
                    if (char === item.letter && !item.inRightPlace && charOccurrences.current[item.letter] > misplacements) {
                        newRows[currentRow][i].misPlacedLetter = true;
                        misplacements++;
                    }
                })
            }
        })
    }

    // const calculateScore = (newRow) => {
    //     const correct = newRow.every(item => item.inRightPlace === true);
    //     if (correct) {
    //         setUserScore(+25);
    //         setNumberOfRounds(+1);
    //     }
    // }

    const handleRowCheck = () => {
        const input = currentInput.split('');
        const newRows = [...rows];

        markRightPlaces(input, mysteryWord, currentRow, newRows, charOccurrences);

        markMisplacements(input, mysteryWord, currentRow, newRows, charOccurrences);

        handleCharOccurrences();

        return newRows
    }

    function calculateScore(newRow) {
        return new Promise((resolve) => {
            const allInRightPlace = newRow.every(item => item.inRightPlace === true);
            if (allInRightPlace) {
                console.log(userScore)
                const newScore = userScore + 25;
                resolve(newScore);
            } else {
                resolve(0);
            }
        });
    }

    const handleSubmit = (event) => {
        handleCharOccurrences();
        event.preventDefault();

        let validationError = '';

        if (currentInput.length !== 5) {
            validationError = 'Word must be of six characters.';

        } else if (currentInput[0] !== mysteryWord[0]) {
            validationError = 'Word must start with the given letter.';
        }

        if (validationError) {
            setError(validationError)
            setCurrentInput('');
            setCurrentRow(currentRow);
            return;
        }
        alert('The word that you are guessing: ' + currentInput);
        const newRows = handleRowCheck()
        calculateScore(newRows[currentRow]).then(score => {
            setUserScore(score);
        })

        setRows(newRows);
        setCurrentRow(currentRow + 1);
        setCurrentInput('');
        setError(validationError);
    }

    useEffect(() => {
        if (userScore > 0) {
            isGuessedCorrectly(true);
        }
    }, [userScore]);

    console.log(mysteryWord)
    console.log(guessedCorrectly)

    const handleNextRound = (event) => {
        console.log('yay new round!');
        handleCharOccurrences();
        event.preventDefault();
        setUpNewRound();
        setCurrentRow(0);
        isGuessedCorrectly(false);

        // calculateScore(newRows[currentRow]).then(score => {
        //     setUserScore(score);
        // })

    }

    return (
        <div className={'logo-and-game-wrapper'}>
            <div className={'slingo-logo-wrapper'}>
                <div className={'slingo-logo'}>
                    <div className={'slingo-letter slingo-letter-s'}>S</div>
                    <div className={'slingo-letter slingo-letter-l'}>L</div>
                    <div className={'slingo-letter slingo-letter-i'}>I</div>
                    <div className={'slingo-letter slingo-letter-n'}>N</div>
                    <div className={'slingo-letter slingo-letter-g'}>G</div>
                    <div className={'slingo-letter slingo-letter-o'}>O</div>
                </div>
            </div>
            <div className={'slingo-and-form-wrapper'}>
                <div className={'slingo-wrapper'}>
                    <div className={'slingo-container'}>
                        <div className={'grid'}>
                            {rows.map((row, i) => {
                                const allInRightPlace = row.every(item => item.inRightPlace);
                                return row.map((item, j) => (
                                    <div key={`${i}-${j}`}
                                         className={`grid-item ${allInRightPlace ? 'all-correct' : ''} ${item.inRightPlace ? 'letter-in-right-place' : ''} ${item.misPlacedLetter ? 'misplaced-letter' : ''}`}>
                                        {item.letter}
                                    </div>
                                ));
                            })}
                        </div>
                    </div>
                </div>
                <div className={'form-and-score'}>
                    <form className={'form-container'} onSubmit={handleSubmit}>
                        <div className={'form-input-box'}>
                            <div className={'form-guess-wrapper'}>
                                <h3 className={'form-guess'}> Your Guess: </h3>
                            </div>
                            <input
                                type={'text'}
                                value={currentInput.toLowerCase()}
                                onChange={handleChange}
                                className={'form-input'}
                            />
                            <button type={'submit'} disabled={currentInput.length !== 5}>
                                <span className={'submit-text'}> SUBMIT </span>
                            </button>
                        </div>
                        {error &&
                            <div className={'error-message'}>
                                <img className={'error-icon'} src={'/images/icons/error.svg'} alt={'error-icon'}/>
                                <div>{error}</div>
                            </div>
                        }
                    </form>
                    <div className={'score-container'}>
                        <div className={'score-board'}>
                            <div className={'score-board-text'}>
                                Score
                            </div>
                            <div className={'score-board-points'}>
                                {userScore}
                            </div>
                        </div>
                        <button disabled={!guessedCorrectly} onClick={handleNextRound}>
                            <span className={'next-round-text'}> next round! </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>


    )
}