/* eslint-disable */ 
import {List} from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from '@material-ui/lab';
import { useParams, useHistory } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import styles from './Textbook.module.scss';
import Popup from '../../components/Popup/Popup'
import Labels from '../../components/Labels/Lebels'
import { Context } from '../../context/index'
import React from 'react'
import {getSetting,getWords,setChosedWord} from './responses'
import TextbookList from '../../components/TextbookList/TexbookList'

const TextBook = (props) => {
  const {
    words,
  } = React.useContext(Context)

  const { id } = useParams();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [popup,setPopup] = useState(['none','none'])
  const [checked,setChecked] = useState([false,false,'block','block'])
  const [icon,setIcon] = useState(Array.from({ length: 20 }).map((x) => 0))
  const [delateStyle,SetDelateStyle] = useState(Array.from({ length: 20 }).map((x) => 'block'))
  let [defaultPage, setDefaultPage] = useState(localStorage.getItem('page') || 1);
  if (localStorage.getItem('page') !== id) {
    if(id.length === 3){
      defaultPage = (Number(id[id.length-2]+''+id[id.length-1]))
    }
    else{
      defaultPage = Number(id[id.length-1])
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      let checked = await getSetting()
      setChecked(checked)
      let result;
      if(id.length === 3){
        result = await axios(
          `https://sashan.herokuapp.com/words?group=${id[0]}&page=${`${id[id.length-2]}${id[id.length-1]}`-1}`,
        );
      }else{
        result = await axios(
          `https://sashan.herokuapp.com/words?group=${id[0]}&page=${id[id.length-1]}`,
        );
      }
      setData(result.data)
    };
    fetchData();
    
  }, [id]);
  useEffect(()=>{
    const fetchChosedWords = async () =>{
      if(data.length !==0){
        let userWord = await getWords()
        let choosedWord = userWord.filter((elem)=>elem.difficulty==='easy')
        choosedWord=choosedWord.map((e)=>{
          return e.optional.word
        })
        let newDelateStyle = Array.from({ length: 20 }).map((x) => 'block')
        for(let i = 0;i<choosedWord.length;i++){
          let index = data.findIndex((e)=>{
            return e.id===choosedWord[i].id
          })
          if(index>-1){
            newDelateStyle[index] = 'none'
          }
        }
        SetDelateStyle(newDelateStyle)
      }
    }
    fetchChosedWords()
  },[data,id])
  useEffect(()=>{
    const fetchChosedWords = async () =>{
      let userWord = await getWords()
      let choosedWord = userWord.filter((elem)=>elem.difficulty==='hard')
      choosedWord=choosedWord.map((e)=>{
        return e.optional.word
      })
      let newData = [...data]
      let newIcon = [...icon]
      for(let i = 0;i<choosedWord.length;i++){
        let index = newData.findIndex((e)=>{
          return e.id===choosedWord[i].id
        })
        newIcon[index] = 1;
      }
     setIcon(newIcon)
    }
    fetchChosedWords()
  },[data])
  const handleChangePage = (e) => {
    localStorage.setItem('page', e.target.textContent);
    history.push(`/textbook/${id[0]}${e.target.textContent}`);
  };
  const addMark = async (index) => {
    let newIcon = [...icon]; 
    newIcon[index] = 1
    setIcon(newIcon)
    await setChosedWord(data[index].id,data[index])
   }
  const openSetting = (e) => {
      setPopup(['popup','window'])
  }


  if (isNaN(Number(id))) {
    return (
      <div>Page does not exist</div>
    );
  }
  

  return (
    <div className={styles.page}>
      <Popup popup={popup} setPopup = {setPopup} checked = {checked} setChecked={setChecked} />
      <div className ={`${styles.container} ${styles.containerLabels}`}>
        <div className = {styles.labels}>
       <Labels/>
        </div>
        <SettingsIcon onClick={(e)=>{openSetting(e)}} className = {`${styles.icon} ${styles.setting}`}></SettingsIcon></div>
      <div className={styles.container}>
        <List component="div" >{
        data!==[]&&data.map((elem,index)=>{return(
         <TextbookList key={elem.id} addMark={addMark} delateStyle = {delateStyle} SetDelateStyle = {SetDelateStyle} index ={index} elem={elem} checked ={checked} data={data} icon={icon} setIcon={setIcon}/>
        )})}</List>
        <div className={styles.pagination}><Pagination count={30} defaultPage={Number(defaultPage)} size="large" color="primary" onChange={handleChangePage} /></div>
      </div>
    </div>
  );
};

export default TextBook;
