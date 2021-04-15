/* eslint-disable */ 
import styles from './Lebels.module.scss'
import { useParams, useHistory } from 'react-router-dom';
import {useState} from 'react'
const Labels = () => {
    const { id } = useParams();
    const history = useHistory();
    
    let [height,setHeight] = useState([['95px'],['80px'],['80px'],['80px'],['80px'],['80px']])
    let text = id;
    let index = Number(text[0]);
    height = height.map((item)=>{
        if(item===height[index]){
           return item = ['95px']
        }else{
           return item = ['80px']
        }
    })

    const changeLevel = (e) => {
        let text = e.target.textContent;
        let index = Number(text[text.length-1]-1);
        let newHeight = [...height.map((item,i)=>{
            if(item===height[index]){
               return item = ['95px']
            }else{
               return item = ['80px']
            }
        })]
        console.log(newHeight)
        if(id.length===3){
          history.push(`/textbook/${index}${id[1]}${id[2]}`)
        }
        else{
          history.push(`/textbook/${index}${id[1]}`)
        }
        setHeight(newHeight)
    }
    return(
          ['#5ad13e','#31dbf0','#8e39f7','#f739cb','rgb(238 57 247)','red'].map((item,index)=>(
            <div key = {item} className = {styles.label}>
 
                    <div onClick={(e)=>changeLevel(e)} className={styles.text} style={{height:height[index][0],backgroundColor:item}}>
                        {`Page ${index+1}`}
                    </div>
                    <div className={styles.triangle}>
                        <div style={{borderTop: `10px solid ${item}`}} className={styles.arrowDown}></div>
                    </div>
                </div>
        ))
    )
}
export default Labels