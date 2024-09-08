// start global  1

let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let btnAdd = document.getElementById("btnAdd");
let tableBody = document.getElementById("tableBody");
let btnupdate = document.getElementById("btnUpdate");
let btnSearch = document.getElementById("searchBook");

let alertName = document.getElementById("alertName");
let alertUrl = document.getElementById("alertUrl");
let alertExite = document.getElementById("alertExite");



indexUpdate = 0;


//  array for add book 4 
let booksContainer = []


// 13
if(getLocal()!== null){

// 11
booksContainer = getLocal();
// 12
displayData();

}

// Button function to get inputs value 2

btnAdd.addEventListener("click" , addBook);


// function add Book 3

function addBook(){

    // check name && url valid 24 
    if(nameValidation() === true && urlValidation()){

        siteUrl.value = addHttp(siteUrl.value);

        var book = {
            name:siteName.value,
            url:siteUrl.value
        }
    
        booksContainer.push(book);
    
    // display data after push  6
        displayData();
        // set local in array 9
        setLocal();
        // reset form 15
        resetForm()

    }

    
    
}

// function to display data in table  5

function displayData(){

    let tableData = '';
    
    // 21 search
    let term = btnSearch.value.toLowerCase();
    
    for (let i = 0; i < booksContainer.length; i++){

        // 22  if for search
        if(booksContainer[i].name.toLowerCase().includes(term)){

            tableData+= `
            <tr>

                <td>${booksContainer[i].name.toLowerCase().replaceAll(term,`<span class="bg-info">${term}</span>`)}</td>
                <td>${booksContainer[i].url}</td>
                <td>
                    <div class="hstack gap-2 justify-content-center">
                       <a href="${booksContainer[i].url}" target="_blank" class="btn btn-outline-dark">
                        <i class="fa-regular fa-eye"></i>
                       </a>
                       <button class="btn btn-outline-warning" onclick="setUpdateElement(${i})">
                        <i class="fa-regular fa-pen-to-square"></i>
                       </button>
                       <button class="btn btn-outline-danger" onclick="deleteElement(${i})">
                        <i class="fa-solid fa-trash"></i>
                       </button>
                    </div>
                </td>
            </tr>
            
        `
        }

       
    }

    tableBody.innerHTML = tableData;
}


// reset form 14

function resetForm(){
    siteName.value = '';
    siteUrl.value = '';
}

// local storage save data in array 7

function setLocal(){
    localStorage.setItem("booksContainer",JSON.stringify(booksContainer));
}

// get local storage 8

function getLocal(){
  return  JSON.parse(localStorage.getItem("booksContainer"));
}


// delete selected element for talbe 16 

function deleteElement(index){
    booksContainer.splice(index,1);
    setLocal();
    displayData();   
}

// update selected element 17
function setUpdateElement(index){

    indexUpdate = index;

    siteName.value = booksContainer[index].name;
    siteUrl.value = booksContainer[index].url;
    $('#btnAdd').fadeOut(500 , ()=>{
        $('#btnUpdate').fadeIn(500)
    })    

}

// 18
btnupdate.addEventListener('click',updateData)

// update function 19

function updateData(){
    siteUrl.value = addHttp(siteUrl.value);
    var book = {
        name:siteName.value,
        url:siteUrl.value
    }

    booksContainer.splice(indexUpdate,1,book);
    setLocal();
    displayData();
    resetForm();

    $('#btnUpdate').fadeOut(500 , ()=>{
        $('#btnAdd').fadeIn(500)
    })    
}

// search 20 

btnSearch.oninput = searchData;

function searchData(){
    displayData()
}



//  start validation 

// name validation 23

function nameValidation(){
    if(siteName.value === ''){
        // alertName.classList.remove("d-none")
        $("#alertName").fadeIn(1000);
        return false;
    }else{
        // alertName.classList.add("d-none")
        $("#alertName").fadeOut(1000);
        return true
    }
}



// url validation 23

function urlValidation(){
    if(siteUrl.value === ''){
        // alertUrl.classList.remove("d-none")
        $("#alertUrl").fadeIn(1000);
        return false;
    }else{
     
        // alertUrl.classList.add("d-none")
        $("#alertUrl").fadeOut(1000);
        return true;

    }
}


function addHttp(url) {
    if (url.search("https://") == -1 && url.search("http://") == -1)
      return "https://" + url;
    return url;
  }