/* eslint-disable */ 
import styles from './Popup.module.scss'
import CloseIcon from '@material-ui/icons/Close';
import {setSetting} from '../../pages/TextBook/responses'
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Switch 
  } from '@material-ui/core';
const Popup = ({popup,checked,setChecked,setPopup}) => {
     const exitSetting = () => {
    setPopup(['none','none'])
  }

  const removeTranslate = async (e) =>{
      if(checked[0]){
        let newChecked =  [...checked];
        newChecked[0] = false
        newChecked[2] = 'block'
        setChecked(newChecked)
        setSetting(newChecked)
      }else{
        let newChecked =  [...checked];
        newChecked[0] = true
        newChecked[2] = 'none'
        setChecked(newChecked)
        setSetting(newChecked)
      }
  }
  const removeButtons = (e) =>{
    if(checked[1]){
      let newChecked =  [...checked];
      newChecked[1] = false;
      newChecked[3] = 'block'
      setChecked(newChecked)
      setSetting(newChecked)
    }else{
      let newChecked =  [...checked];
      newChecked[1] = true
      newChecked[3] = 'none'
      setChecked(newChecked)
      setSetting(newChecked)
    }
  }
    return(
        <>
        <div className = {popup[0]}>
        <CloseIcon  className = {styles.exit} onClick = {()=>{exitSetting()}}></CloseIcon>
        <h2 className={styles.title}>Settings</h2>
        <List component='div'>
          <ListItem component='div'>
            <ListItemText primary = 'Remove translation of words'/>
            <ListItemIcon><Switch onChange={(e)=>removeTranslate(e)} checked={checked[0]} color='primary'/> </ListItemIcon>
          </ListItem>
          <ListItem component='div'>
            <ListItemText primary = 'Remove delete and add buttons'/>
            <ListItemIcon><Switch onChange={(e)=>removeButtons(e)} checked={checked[1]} color='primary'/> </ListItemIcon>
          </ListItem>
        </List>
    </div>
    <div className = {popup[1]}></div>
    </>
    )
};
export default Popup
