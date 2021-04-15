/* eslint-disable */
import React from 'react'
import { Context } from '../../context'
import LearningMain from '../../components/LearningMain'
import SingleWord from '../../components/SingleWord'
import TextBookCard from './../TextBookCard/TextBookCard'
import {NavLink} from 'react-router-dom'
export default function Learning() {
  const { singleWordMode } = React.useContext(Context)

  return (
    (!singleWordMode && <> <LearningMain /> <TextBookCard/> <NavLink to = '/vocabulary'>vocabulary</NavLink></> )
    || (<> <SingleWord /> <TextBookCard/> <NavLink to = '/vocabulary'><h1>vocabulary link</h1></NavLink></>)
    
  )

}
