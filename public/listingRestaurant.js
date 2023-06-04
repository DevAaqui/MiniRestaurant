function onClicking(){
    let n = document.getElementById('name')
    let a = document.getElementById('address')
    let d = document.getElementById('description')

    let obj = {
        name: n.value,
        address: a.value,
        description: d.value
    }
    console.log(obj)
    const token = localStorage.getItem('token')

    axios.post('http://localhost:3000/listing-restaurant',  obj, { headers: {"Authorization" : token }})
    .then(response=> {
        console.log(response)
    })
}