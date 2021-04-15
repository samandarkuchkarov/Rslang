import React from 'react'
import { Context } from '../../context'

export default function Card({ data, progress }) {
  const {
    setSingleWordMode,
    learnWordsCount,
    setCurrentGroup,
    currentGroup,
    corrects,
    errors,
    words,
  } = React.useContext(Context)

  const clickHandler = (e) => {
    switch (e.target.id) {
      case "new":
        setCurrentGroup(words)
        break;
      case "dif":
        setCurrentGroup(errors)
        break;
      case "repeat":
        setCurrentGroup(corrects)
        break;
      default:
        break;
    }
    setSingleWordMode(true)
  }

  console.log(currentGroup)
  return (
    <div className="learning__bot-col">
      <div className="learning__bot-col--card card-container">
        <h3>{data.title}</h3>
        <p>{data.subtitle}</p>
        <button
          className="button"
          type="button"
          onClick={clickHandler}
          id={data.type}
        >
          Начать!
           </button>
        {progress &&
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${learnWordsCount / 0.1}%` }}
              aria-valuemin="0"
              aria-valuemax="10"
              aria-valuenow={learnWordsCount}
            />
          </div>
        }
      </div>
    </div>
  )
}
