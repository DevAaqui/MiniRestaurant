window.addEventListener('DOMContentLoaded', async(event)=> {
    const token = localStorage.getItem('token')

    axios.get('http://localhost:3000/all-restaurants', { headers: {"Authorization" : token }})
    .then(res=> {
        console.log(res.data)
        let list = res.data.data
        list.forEach(ele=> { //id, name, address, description, totalReviews
            addNewLine(ele)
        })
    })
})

function addNewLine(elem) {
    let li =`<li id = ${elem.id}>${elem.name}
    <button onclick="showFullDetail(${elem.id})">Show</button>
    </li`
    showOnScreen(li)
}

function showOnScreen(li)
{
    itemlist.innerHTML = itemlist.innerHTML + li  
}

function showFullDetail(restoId){
    const token = localStorage.getItem('token')
    axios.get(`http://localhost:3000/full-detail/${restoId}`, { headers: {"Authorization" : token }})
    .then(res=> {
        console.log(typeof (res.data))
        showFullResto(res.data)
    })
    .catch(err=> {
        console.log(err)
    })
}
let form = document.getElementById('formfield')
function showFullResto(obj){
    console.log(obj)
    let li =`<li id = ${obj.data.id}>${obj.data.name}--${obj.data.address}--${obj.data.description}
    <button onclick="showReviews(${obj.data.id})">Show Reviews-${obj.data.totalReviews}</button>
    </li`
    showDetails(li)
    var newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('name','text');
    formfield.appendChild(newField);
    var btn = `<button onclick="postReview()">submit</button>`
    formfield.appendChild(btn)
}

function showDetails(li)
{
    itemlist.innerHTML = itemlist.innerHTML + li  
}

//Reviews posting and getting
function showReviews(id){
    console.log('Working')
    postReview(id)
}


function postReview(){
    let r = document.getElementById('review').value

    let reviewObj = {
        review: r.value
    }

    const token = localStorage.getItem('token')
    axios.post(`http://localhost:3000/full-detail/${restoId}`, reviewObj, { headers: {"Authorization" : token }})
    .then(res=> {
        console.log(res)
    })
}