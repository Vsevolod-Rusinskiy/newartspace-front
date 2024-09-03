import React from 'react'
import styles from './Alphabet.module.scss'

const russianAlphabet = [
  'А',
  'Б',
  'В',
  'Г',
  'Д',
  'Е',
  'Ж',
  'З',
  'И',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ч',
  'Ш',
  'Щ',
  'Э',
  'Ю',
  'Я',
]
const englishAlphabet = [
  'A',
  'B',
  'C',
  'D',
  'F',
  'G',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'R',
  'S',
  'T',
  'V',
  'X',
  'Y',
  'Z',
]

export const Alphabet = () => (
  <div className={styles.alphabet_container}>
    <div className={styles.alphabet_line}>
      {russianAlphabet.map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))}
    </div>
    <div className={styles.alphabet_line}>
      {englishAlphabet.map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))}
    </div>
  </div>
)
