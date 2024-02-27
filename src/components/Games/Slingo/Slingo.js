import React, {useEffect, useRef, useState} from 'react';
import './slingo.css';
import axios from "axios";

export default function Slingo() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentInput, setCurrentInput] = useState('');
    const [mysteryWord, setMysteryWord] = useState([]);
    const [rows, setRows] = useState([]);
    const charOccurrences = useRef({});
    const [userScore, setUserScore] = useState(0);
    const [isGuessedCorrectly, setGuessedCorrectly] = useState(false);
    const shortenedAlphabet = [...'abcdefghijklmnoprstuvwz'];
    const newRandomIndex = Math.floor(Math.random() * shortenedAlphabet.length);
    const newRandomLetter = shortenedAlphabet[newRandomIndex];

    useEffect(() => {
        setUpRound();
    }, []);

    function setUpRound() {
        const initialRows = createInitialRows();
        if (initialRows) {
            fetchWord(initialRows, newRandomLetter)
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


    const fetchWord = (initialRows, randomLetter) => {
        axios.get(`https://api.datamuse.com/words?sp=${randomLetter}????`)
            .then(response => {
                const randomInt = Math.floor(Math.random() * 100);
                if (response.data.length > randomInt && response.data[randomInt].word && !response.data[randomInt].word.includes(' ')) {
                    const data = response.data[randomInt];
                    setData(data);
                    // initialRows[0][0].letter = data.word[0];
                    initialRows[0][0].letter = 'a'
                    initialRows[0][0].inRightPlace = true;
                    setRows(initialRows);
                    // const mysteryWord = data.word.split('');
                    setMysteryWord(['a', 'p', 'p', 'l', 'e'])

                    // setMysteryWord(mysteryWord);
                } else {
                    console.log('No suitable word found, retrying...');
                    fetchWord(initialRows, randomLetter);
                }
            })
            .catch(error => {
                console.log('error fetching slingo data', error);
            });
    }


    async function getWord(randomLetter) {
        const response = await fetch(`https://api.datamuse.com/words?sp=${randomLetter}????`);
        const words = await response.json();
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

    const handleRowCheck = () => {
        const input = currentInput.split('');
        const newRows = [...rows];

        markRightPlaces(input, mysteryWord, currentRow, newRows, charOccurrences);
        markMisplacements(input, mysteryWord, currentRow, newRows, charOccurrences);

        return newRows
    }

    const checkIfAllInRightPlace = (newRow) => {
        return newRow.every(item => item.inRightPlace === true);
    }

    const invalidInput = (currentInput) => {
        let validationError = '';
        const isAlphabetical = /^[a-z]+$/;
        if (!isAlphabetical.test(currentInput)) {
            validationError = 'Only alphabetical characters are allowed';

        } else if (currentInput[0] !== mysteryWord[0]) {
            validationError = 'Word must start with the given letter.';
        }

        return validationError
    }

    const handleSubmit = (event) => {
        handleCharOccurrences();
        event.preventDefault();

        const invalid = invalidInput(currentInput);

        if (invalid) {
            setError(invalid)
            setCurrentInput('');
            return;
        }

        setError('')

        alert('The word that you are guessing: ' + currentInput);

        const newRows = handleRowCheck()

        setRows(newRows);
        setCurrentRow(currentRow + 1);
        setCurrentInput('');

        const allInRightPlace = checkIfAllInRightPlace(newRows[currentRow]);

        if (allInRightPlace) {
            const newUserScore = userScore + 25;
            setUserScore(newUserScore)
            setGuessedCorrectly(true);
        }
    }

    const handleNextRound = (event) => {
        handleCharOccurrences();
        event.preventDefault();
        setCurrentRow(0);
        setGuessedCorrectly(false);
        setUpRound();
    }

    const canInsertSomething = () => {
        const correctLength = currentInput.length === 5;
        return correctLength && !isGuessedCorrectly;
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
                        <div className={'slingo-grid'}>
                            {rows.map((row, i) => {
                                console.log(row);
                                // const allInRightPlace = row.every(item => item.inRightPlace);
                                const allInRightPlace = checkIfAllInRightPlace(row);
                                return row.map((item, j) => (
                                    <div key={`${i}-${j}`}
                                         className={`slingo-grid-item ${allInRightPlace ? 'all-correct' : ''} ${item.inRightPlace ? 'letter-in-right-place' : ''} ${item.misPlacedLetter ? 'misplaced-letter' : ''}`}>
                                        {item.letter ? item.letter : i === currentRow && !isGuessedCorrectly ? '.' : ''}
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
                            <button type={'submit'} disabled={!canInsertSomething()}>
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
                        <button
                            disabled={!isGuessedCorrectly}
                            onClick={handleNextRound}
                        >
                            <span className={'next-round-text'}> NEXT ROUND </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>


    )
}