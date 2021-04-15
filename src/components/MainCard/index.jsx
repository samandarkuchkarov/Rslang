import React from 'react'
import { Context } from '../../context'

export default function MainCard() {
  const { learnWordsCount } = React.useContext(Context)
  return (
    <div className="learning__main card-container">
      <h3 className="learning__main-left">Сегодня изучено</h3>
      <div className="learning__main-right">
        <p>
          Изучено:
            {' '}
          <span>{learnWordsCount}</span>
          {' '}
            из
            {' '}
          <span>20</span>
          {' '}
            слов
          </p>
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
      </div>
    </div>
  )
}
