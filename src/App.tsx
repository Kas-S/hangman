import {useCallback, useEffect, useState} from 'react'
import words from './wordList.json'
import HangmanDrawing from "./HangmanDrawing.tsx";
import HangmanWord from "./HangmanWord.tsx";
import Keyboard from "./Keyboard.tsx";


function App() {
  const [wordToGuess, setWordToGuess] = useState(() => words[Math.floor(Math.random() * words.length)])
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
      if (guessedLetters.includes(letter)) return
      setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])

  useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if (!e.key.match(/^[a-z]$/)) return
        e.preventDefault()
        addGuessedLetter(e.key)
      }

      document.addEventListener('keypress', handler)

      return () => document.removeEventListener('keypress', handler)
  }, [guessedLetters])

  return (
    <div style={{
      maxWidth: '800px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: '0 auto',
      alignItems: 'center'
    }}>
      <div style={{fontSize: '2rem', textAlign: 'center'}}>Lose Win</div>
      <HangmanDrawing numberOfWrongGuesses={ incorrectLetters.length }/>
      <HangmanWord guessedLetters={ guessedLetters } wordToGuess={ wordToGuess }/>
      <div style={{ alignSelf: "stretch" }}>
          <Keyboard
              activeLetters={ guessedLetters.filter(letter => !wordToGuess.includes(letter)) }
              inactiveLetters={ incorrectLetters }
              addGuessedLetter={ addGuessedLetter }
          />
      </div>
    </div>
  )
}

export default App
