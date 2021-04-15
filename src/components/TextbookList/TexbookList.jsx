
import {
    ListItem,
    ListItemText,
    ListItemIcon,
  } from '@material-ui/core';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import styles from './TextbookList.module.scss'
import {useState} from 'react'
import {delateWord,delateMark,setChosedWord} from '../../pages/TextBook/responses'
const TextbookList = ({delateStyle,SetDelateStyle,index,elem,checked,data,icon,setIcon,addMark}) => {
    const [display, setDisplay] = useState(Array.from({ length: 20 }).map((x) => '0px'));
    const playWord=(e) => {
        const index = Number(e.currentTarget.getAttribute('data-name'));
        let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audio}`)
        audio.play()
      }
      const playMeaning=(e) => {
        const index = Number(e.currentTarget.getAttribute('data-name'));
        let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audioMeaning}`)
        audio.play()
      }
      const playExample=(e) => {
        const index = Number(e.currentTarget.getAttribute('data-name'));
        let audio = new Audio(`https://sashan.herokuapp.com/${data[index].audioExample}`)
        audio.play()
      }
      function openInfo(e) {
        const index = Number(e.currentTarget.getAttribute('data-name'));
        if (display[index] === '0px') {
          const newDisplay = [...display];
          newDisplay[index] = '370px';
          setDisplay(newDisplay);
        } else {
          const newDisplay = [...display];
          newDisplay[index] = '0px';
          setDisplay(newDisplay);
        }
      }
      const removeWord = async (index) => {
        let newDelateStyle = [...delateStyle];
        newDelateStyle[index] = 'none';
        SetDelateStyle(newDelateStyle)
        await delateWord(data[index].id,data[index])
      }
      const removeMark = async (index) =>{
        let newIcon = [...icon]; 
        newIcon[index] = 0
        setIcon(newIcon)
        await delateMark(data[index].id)
       }
       
    return(
        <div style={{display:delateStyle[index]}}  >
        <ListItem component="div"> 
          <ListItemIcon><div className={styles.image} style={{ backgroundImage: `url(https://sashan.herokuapp.com/${elem.image})` }} /></ListItemIcon>
          <ListItemIcon><VolumeUpIcon data-name={index} onClick={(e) => { playWord(e); }} className={styles.icon} /></ListItemIcon>
          <ListItemText primary={(
            <div>
              <div className={styles.word}>{elem.word}</div>
              <div style={{display:checked[2]}} className={styles.translate}>{elem.wordTranslate}</div>
            </div>)}
          />
          <ListItemIcon><MenuBookIcon data-name={index} onClick={(e) => { openInfo(e); }} className={styles.icon} /></ListItemIcon>
          <ListItemIcon style={{display:checked[3]}}><DeleteIcon onClick={()=>{removeWord(index)}} className={styles.icon} /></ListItemIcon>
          <ListItemIcon style={{display:checked[3]}}>
             {icon[index]?<BookmarkIcon onClick={()=>{removeMark(index)}} className={styles.icon} />:
             <BookmarkBorderIcon onClick={()=>{addMark(index)}} className={styles.icon} />}
          </ListItemIcon>
        </ListItem>
        <div className={styles.info} style={{ height: display[index] }}>
          <ListItem className={styles.sentences} component="div">
            <ListItemText primary={elem.transcription} />
          </ListItem>
          <div className={styles.meaning}>
            Meaning
          </div>
          <ListItem className={styles.sentences} component="div">
            <ListItemText className={styles.doEqual} primary={
                <div className = {styles.listItem}>
                  <ListItemIcon>
                    <VolumeUpIcon data-name={index} onClick={(e) => { playMeaning(e); }} className={styles.icon} />
                  </ListItemIcon> 
                <div>{elem.textMeaning.replace('<i>', '').replace('</i>', '')}</div></div>} />
            <ListItemText className={styles.doEqual} style={{ textAlign: 'end',display:checked[2] }} primary={ 
                elem.textMeaningTranslate.replace('<i>', '').replace('</i>','')} />
          </ListItem>
          <div className={styles.meaning}>
            Example
          </div>
          <ListItem className={styles.sentences} component="div">
            <ListItemText className={styles.doEqual} primary={
              <div className = {styles.listItem}>
                <ListItemIcon>
                  <VolumeUpIcon data-name={index} onClick={(e) => { playExample(e); }} className={styles.icon} />
                </ListItemIcon> 
                <div>{elem.textExample.replace('<b>', '').replace('</b>', '')}</div>
              </div>} />
            <ListItemText className={styles.doEqual} style={{ textAlign: 'end' ,display:checked[2] }} primary={elem.textExampleTranslate.replace('<b>', '').replace('</b>', '')} />
          </ListItem>
        </div>
      </div>
    )
}
export default TextbookList;