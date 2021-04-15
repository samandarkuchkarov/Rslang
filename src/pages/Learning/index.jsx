/* eslint-disable */
import React from 'react'
import { Context } from '../../context'
import LearningMain from '../../components/LearningMain'
import SingleWord from '../../components/SingleWord'
import TextBookCard from './../TextBookCard/TextBookCard'
export default function Learning() {
  const { singleWordMode } = React.useContext(Context)

  return (
    (!singleWordMode && <> <LearningMain /> <TextBookCard/></> )
    || (<> <SingleWord /> <TextBookCard/></>)
    
  )

}
