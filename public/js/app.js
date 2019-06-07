// async function getresults(){
//     try{
//         const result=await fetch(`http://localhost:3000/weather?address=kharghar`);
//         const data= await result.json()
//         console.log(data)

//     }catch(error){
//         console.log(error)

//     }
// }
// getresults();


// const a=document.querySelector('h1').textContent;
// console.log(a)

const weatherForm=document.querySelector('form');
const serchPlace=document.querySelector('input')
const msg1=document.getElementById('message1');
const msg2=document.getElementById('message2');
// document.querySelector('button').addEventListener('click',()=>{
//     const serchPlace1=document.querySelector('input').value
//     console.log(serchPlace1)

// })

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing');
    // console.log(sercg)
    msg1.textContent='loading...'
    msg2.textContent=''
    fetch(`http://localhost:3000/weather?address=${serchPlace.value}`)
    .then(result=>{
        // console.log(result)
        return result.json()
    })
    .then(swa=>{
        if (swa.error)
        {
            console.log(swa.error)
            msg1.textContent=swa.error;
        }
        else{
            console.log(swa)
            msg1.textContent=swa.place
            msg2.textContent=swa.temperature
        }
    })
})