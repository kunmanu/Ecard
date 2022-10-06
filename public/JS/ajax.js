

let form = document.querySelector('.form')



form.addEventListener('submit', async  (e) => {
    e.preventDefault()

    let url = "../mail/index.php" ;
    let canvasFrame = document.querySelector("canvas")

    
    let canvasData  = document.querySelector("#canvasData")
    canvasData.value = canvasFrame.toDataURL();
    
    let formData = new FormData(form)
    
    console.log(formData);
    
    let option = {
        method :'POST',
        body : formData

    
    }
    let promise =  await fetch(url, option)
    console.log('promise :',promise);
    promise.status != "200" ? alert("didnt send, tough luck") : alert('votre message à bien été envoye')
    
})


