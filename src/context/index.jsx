import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


export const Context = React.createContext(null);

export default function MainContext({ children }) {
  const [words, setWords] = React.useState([])
	const [isAuth, setAuth] = React.useState(localStorage.getItem('isAuth') || false)
  //! Should be FALSE
  const [singleWordMode, setSingleWordMode] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(localStorage.getItem('currentIndex') || 0)
  const [corrects, setCorrects] = React.useState(JSON.parse(localStorage.getItem('corrects')) || [])
  const [errors, setErrors] = React.useState([])
  const [currentGroup, setCurrentGroup] = React.useState([])
  const learnWordsCount = corrects.length
  React.useEffect(() => {
    axios({
      url: 'https://sashan.herokuapp.com/words?group=0&page=10',
      method: 'GET',
    })
      .then(res => setWords(res.data))
      .catch(err => console.log(err))
  }, [])


  React.useEffect(() => {
    localStorage.setItem('isAuth', isAuth)
  }, [isAuth])

  console.log(words)

  

  React.useEffect(() => {
    localStorage.setItem('learnWordsCount', learnWordsCount)
    localStorage.setItem('currentIndex', currentIndex)
    localStorage.setItem('corrects', JSON.stringify(corrects))
  }, [corrects, learnWordsCount, currentIndex])


  return (
    <Context.Provider
      value={{
        words,
				isAuth,
				setAuth,
        singleWordMode, 
        setSingleWordMode,
        currentIndex,
        setCurrentIndex,
        corrects,
        setCorrects,
        currentValue,
        setCurrentValue,
        errors,
        setErrors,
        learnWordsCount,
        setCurrentGroup,
        currentGroup
      }}
    >
      {children}
    </Context.Provider>
  );
}
MainContext.propTypes = {
  children: PropTypes.node.isRequired,
};
