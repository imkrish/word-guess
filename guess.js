const fs = require('fs')
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const getAnswer = (pathFile) => {
    const answers = fs.readFileSync(pathFile, 'utf8').split('\n')
    const numAnswers = answers.length
    const randomNumber = Math.floor(Math.random() * numAnswers)
    return answers[randomNumber]
}

const checkAnswer = (guessWord, answer, result) => {
    const guessWordParts = guessWord.split('')
    return guessWordParts.reduce((newResult, guess, idx) => {
        return newResult.concat([result[idx] ? true : answer.indexOf(guess) > -1])
    }, [])
}

const getHint = (guessWord, result) => {
    const guessWordParts = guessWord.split('')
    const hint = guessWordParts.reduce((hintString, char, idx) => {
        if (result[idx]) {
            return `${hintString}${char}`
        }
        return `${hintString}_`
    }, '')
    return hint
}

const isDone = (hint) => hint.split('').every(char => char !== '_')
const printGameName = () => console.log(`  WordGuess testing  `)
const printNTrail = (times) => console.log(`You got in ${times} trials`)
const printGameDone = (times) => console.log(`Trail ${times}: Congratulation`)
const printHint = (times, hint) => console.log(`Trail ${times}: ${hint}`)

const wordGuess = (guessWord, result = [], times = 1) => {
    if (times === 1) {
        printGameName()
    }
    rl.question('Key in one character or your guess word: ', (answer) => {
        const newResult = checkAnswer(guessWord, answer, result)
        const hint = getHint(guessWord, newResult)
        if (isDone(hint)) {
            printGameDone(times)
            printNTrail(times)
            rl.close();
            return
        }
        printHint(times, hint)
        wordGuess(guessWord, newResult, times + 1)
    })
}

wordGuess(getAnswer('./answers'))