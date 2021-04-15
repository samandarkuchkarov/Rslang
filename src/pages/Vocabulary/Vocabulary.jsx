import { useState,useEffect } from 'react'
import styles from './Vocabulary.module.scss'
import { List } from '@material-ui/core';
import TextbookList from '../../components/TextbookList/TexbookList'
import {setChosedWord,getWords} from '../TextBook/responses'
const Vocabulary = ()=>{
    const [icon,setIcon] = useState(Array.from({ length: 20 }).map((x) => 0))
    const [data,setData] = useState([])
    const [active,setActive]= useState(['#407df4','#939ba5','#939ba5'])
    const [delateStyle,SetDelateStyle] = useState(Array.from({ length: 20 }).map((x) => 'block'))
    const checked = [false,false,'block','block']
    const [Button,SetButton] = useState([1])
    const learning = ()=>{
        setActive(['#407df4','#939ba5','#939ba5'])
    }
    const hard = ()=>{
        setActive(['#939ba5','#407df4','#939ba5'])
    }
    const delated = ()=>{
        setActive(['#939ba5','#939ba5','#407df4'])
    }
    const addMark = async (index) => {
        let newIcon = [...icon]; 
        newIcon[index] = 1
        setIcon(newIcon)
        await setChosedWord(data[index].id,data[index],'PUT')
    }
    const changePage = async(e)=>{
        let index = active.findIndex((e)=>e==='#407df4')
        let words =await getWords()
        let deletedWords = words.filter(e=>e.difficulty==='easy');
        let HardWords = words.filter(e=>e.difficulty==='hard');
        if(e===2){
            if(index===1){
                HardWords=HardWords.map(e=>e.optional.word);
                HardWords.splice(0,Math.ceil(HardWords.length/2))
                setData(HardWords)
              }
              if(index===2){
                  deletedWords=deletedWords.map(e=>e.optional.word);
                  deletedWords.splice(0,Math.ceil(deletedWords.length/2))
                  setData(deletedWords)
                }
                if(index===3){
                  HardWords.splice(0,Math.ceil(HardWords.length/2))
                  setData(HardWords)
                }
        }
    }
    useEffect(()=>{
        const fetchWord = async() =>{
            let index = active.findIndex((e)=>e==='#407df4')
            let words =await getWords()
            console.log(words)
            let deletedWords = words.filter(e=>e.difficulty==='easy');
            let HardWords = words.filter(e=>e.difficulty==='hard');
            if(index===1){
                HardWords=HardWords.map(e=>e.optional.word);
                let numberofPage = Math.ceil(deletedWords.length/20)
                SetButton(Array.from({ length: numberofPage }).map((x,i) => i+1))
                if(numberofPage>1){
                    HardWords.splice(Math.ceil(HardWords.length/numberofPage),HardWords.length)
                    setData(HardWords)
                }else{
                    setData(HardWords)
                } 
                setIcon( Array.from({ length: HardWords.length }).map((x) => 0))
            }
            if(index===2){
                deletedWords=deletedWords.map(e=>e.optional.word);
                let numberofPage = Math.ceil(deletedWords.length/20)
                SetButton(Array.from({ length: numberofPage }).map((x,i) => i+1))
                console.log(numberofPage)
                if(numberofPage>1){
                    console.log(Math.ceil(deletedWords.length/numberofPage))
                    deletedWords.splice(Math.ceil(deletedWords.length/numberofPage),deletedWords.length)
                    setData(deletedWords)
                }else{
                    setData(deletedWords)
                } 
                setIcon( Array.from({ length: deletedWords.length }).map((x) => 0))
             }
        }   
        fetchWord()
    },[active])
    return(
        <div className ={styles.page}>
            <div className ={styles.container}>
                <div className={styles.label}>
                    <div onClick={learning} style={{color:active[0],borderBottom:`4px solid ${active[0]}`}} className={styles.labelText}>Изученные</div>
                    <div onClick={hard} style={{color:active[1],borderBottom:`4px solid ${active[1]}`}} className={styles.labelText}>Сложные</div>
                    <div onClick={delated} style={{color:active[2],borderBottom:`4px solid ${active[2]}`}} className={styles.labelText}>Удаленные</div>
                </div>
                <List component="div">
                {data!==[]&&data.map((elem,index)=>{return(
                   <TextbookList key={elem.id} addMark={addMark} delateStyle = { delateStyle } checked={checked} SetDelateStyle = { SetDelateStyle } index = { index } elem = { elem } data ={data} icon={icon} setIcon={setIcon} />
                )})}
                </List>
                {Button.map(e=><button key = {e} onClick={()=>changePage(e)}>{e}</button>)}
            </div>
        </div>
    )
}
export default Vocabulary