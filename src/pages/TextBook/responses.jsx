export const getSetting = async (checked) => {
    try
   { let token = localStorage.getItem('token')
     let userId = localStorage.getItem('userID')
     const rawResponse = await fetch(`https://sashan.herokuapp.com/users/${userId}/settings`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    const content = await rawResponse.json();
    let data = content.optional.status.split(',')
    for(let i =0;i<data.length;i++){
        if(i===0||i===1){
            if(data[i]=== 'false'){
                data[i] = false;   
            } else{
                data[i] = true;
            }
        }}
    return data
  }catch(e){
     let token = localStorage.getItem('token')
     let userId = localStorage.getItem('userID')
    const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/settings`, {
      method: 'PUT',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        "accept": "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "optional": {
          "status": 'false,false,block,block'
        } ,
        "wordsPerDay": 2
      })
    });
    const PutContent = await putRespnd.json();
    let data = PutContent.optional.status.split(',');
    for(let i =0;i<data.length;i++){
        if(i===0||i===1){
            if(data[i]=== 'false'){
                data[i] = false;   
            } else{
                data[i] = true;
            }
        }}
    return data
}
}

export const setSetting = async(status) => {
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userID')
    let statusString = status.join(',')
    console.log(statusString)
   const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/settings`, {
     method: 'PUT',
     withCredentials: true,
     headers: {
       'Authorization': `Bearer ${token}`,
       "accept": "application/json",
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "optional": {
         "status": `${status}`
       } ,
       "wordsPerDay": 2
     })
   });
   const PutContent = await putRespnd.json();
   let data = PutContent.optional.status.split(',');
   for(let i =0;i<data.length;i++){
       if(i===0||i===1){
           if(data[i]=== 'false'){
               data[i] = false;   
           } else{
               data[i] = true;
           }
       }}
   return data
}

export const getWords= async() =>{

      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userID')
      const rawResponse = await fetch(`https://sashan.herokuapp.com/users/${userId}/words`, {
       method: 'GET',
       withCredentials: true,
       headers: {
         'Authorization': `Bearer ${token}`,
         'Accept': 'application/json',
       }
     });
     const content = await rawResponse.json();
     return content
}
export const setChosedWord =async(wordId,word,action)=>{
     try{ let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userID')
      const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/words/${wordId}`, {
       method: 'Post',
       withCredentials: true,
       headers: {
         'Authorization': `Bearer ${token}`,
         "accept": "application/json",
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "optional": {
            "word": word
         } ,
         "difficulty": 'hard'
       })
     });
     const PutContent = await putRespnd.json();
     console.log(PutContent)
     return PutContent}
     catch(e){
      let token = localStorage.getItem('token')
      let userId = localStorage.getItem('userID')
      const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/words/${wordId}`, {
       method: action,
       withCredentials: true,
       headers: {
         'Authorization': `Bearer ${token}`,
         "accept": "application/json",
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         "optional": {
            "word": word
         } ,
         "difficulty": 'hard'
       })
     });
     const PutContent = await putRespnd.json();
     console.log(PutContent)
     return PutContent
     }
}
export const delateMark = async(wordId)=>{
  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('userID')
 const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/words/${wordId}`, {
   method: 'DELETE',
   withCredentials: true,
   headers: {
     'Authorization': `Bearer ${token}`,
     "accept": "application/json",
     'Content-Type': 'application/json'
   },
 });
 const PutContent = await putRespnd.json();
 return PutContent
}
export const delateWord =async(wordId,word)=>{
  try{
  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('userID')
  const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/words/${wordId}`, {
   method: 'Post',
   withCredentials: true,
   headers: {
     'Authorization': `Bearer ${token}`,
     "accept": "application/json",
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     "optional": {
        "word": word
     } ,
     "difficulty": 'easy'
   })
 });
 const PutContent = await putRespnd.json();
 console.log(PutContent)
 return PutContent}
 catch(e){
  let token = localStorage.getItem('token')
  let userId = localStorage.getItem('userID')
 const putRespnd = await fetch(`https://sashan.herokuapp.com/users/${userId}/words/${wordId}`, {
   method: 'DELETE',
   withCredentials: true,
   headers: {
     'Authorization': `Bearer ${token}`,
     "accept": "application/json",
     'Content-Type': 'application/json'
   },
 });
 const PutContent = await putRespnd.json();
 return PutContent
 }
}