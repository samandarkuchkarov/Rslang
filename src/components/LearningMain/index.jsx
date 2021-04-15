import React from 'react'
import Card from '../Card'
import MainCard from '../MainCard'
import './Learning.scss'

const cards = [
  {
    title: 'Новые слова',
    subtitle: 'Нажмите, чтобы выучить новые для себя слова.',
    type: 'new',
    progress: true,
  },
  {
    title: 'Повторить слова',
    subtitle: 'Нажмите, чтобы повторить выученные слова.',
    type: 'repeat',
    progress: false,
  },
  {
    title: 'Сложные слова',
    subtitle: 'Нажмите, чтобы повторить сложные слова.',
    type: 'dif',
    progress: false,
  },
]

export default function LearningMain() {
  return (
    <>
     <div className="learning container-fluid">
      <div className="learning__greeting">
        <h1>
          <span>Привет!</span>
          {' '}
          Готов приступить к обучению?
        </h1>
        <p>
          На этой странице вы можете следить за своим прогрессом
          и выбирать желаемый набор слов для изучения, например, “Новые слова” ,
          “Повторить слова” или “Сложные слова” . Удачи!
        </p>
      </div>
      <MainCard />
      <div className="learning__bot">
        {cards.map((el, i) => (
          <Card data={el} key={i} progress={el.progress} />
        ))}
      </div>
    </div> 
    </>
  )
}
