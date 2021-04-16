/* eslint-disable */ 
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './TextBookCard.module.scss'

const TextBookCard = () => {
    const [height,setHeight] = useState([['95px'],['80px'],['80px'],['80px'],['80px'],['80px']])
    const history = useHistory()
    const changeLevel = (e) => {
        let text = e.currentTarget.textContent;
        let index = Number(text[text.length-1] - 1);
        let newHeight = [...height.map((item,i)=>{
            if(item===height[index]){
               return item = ['95px']
            }else{
               return item = ['80px']
            }
        })]
        setHeight(newHeight)
    }
    const open = () => {
       height.forEach((elem,index)=>{
           console.log(elem)
           if(elem[0]=='95px'){
            history.push(`/textbook/${index}1`)   
           }
       })
       
    }
    return (
        
        <div className = {styles.card}>
            <div className ={styles.labels}>
           { ['#5ad13e','#31dbf0','#8e39f7','#f739cb','rgb(238 57 247)','red'].map((item,index)=>(
            <div key = {item} className = {styles.label}>
 
                    <div onClick={(e)=>changeLevel(e)} className={styles.text} style={{height:height[index][0],backgroundColor:item}}>
                        {`Page ${index+1}`}
                    </div>
                    <div className={styles.triangle}>
                        <div style={{borderTop: `10px solid ${item}`}} className={styles.arrowDown}></div>
                    </div>
                </div>
        ))}
            </div>
            <div className = {styles.title}>
                <h2>Учебник</h2>
            </div>
            <div onClick={(e)=>open(e)} className = {styles.open}><h3>Open</h3></div>
        </div>
    )
}

export default TextBookCard;