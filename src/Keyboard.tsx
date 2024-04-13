import './style.css'

const ALPHABET: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

interface KeyboardProps {
    activeLetters: string[],
    inactiveLetters: string[],
    addGuessedLetter: (letter: string) => void,
    disabled: boolean
}

function Keyboard({activeLetters, inactiveLetters, addGuessedLetter, disabled}: KeyboardProps) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '.5rem'
        }}>
            { ALPHABET.map((key) => {
                const isActive = activeLetters.includes(key),
                      isInactive = inactiveLetters.includes(key)

                return (
                    <button disabled={isActive || isInactive || disabled} onClick={() => addGuessedLetter(key)} className={"btn" + (isActive ? " active": "") + (isInactive ? " inactive": "")} key={key}>{key}</button>
                )
            }) }
        </div>
    )
}

export default Keyboard;