let cl = console.log;

let forminfo= document.getElementById("forminfo");
let fname= document.getElementById("fname");
let lastn=document.getElementById("lastn");
let contact= document.getElementById("contact");
let gmail=document.getElementById("gmail");
let tableData=document.getElementById("tableData");
let updatebtn= document.getElementById("updatebtn");
let submitbtn= document.getElementById("submitbtn");


//let arry = [
    //{
  //      fname :"asdcvf",
      //  lname :"abcd",
       // contact :"123456",
        //gmail :"abc@gmail.com",
        //stdid:"1"

    //}
//];
let arry =JSON.parse(localStorage.getItem("tableData")) || [];

let onEdit = (edt) =>{
    cl(edt)
    let getid = edt.closest("tr").id;
    cl(getid)
    //let getedtobj = arry.find(stds =>{
      //  return stds.stdid ===getid
    //})
    localStorage.setItem("editid",getid)
    let getedtobj =arry.find(stds=> stds.stdid === getid);
    cl(getedtobj)
     updatebtn.classList.add("d-none");
     submitbtn.classList.remove("d-none");
     fname.value = getedtobj.fname;
     lastn.value = getedtobj.lastn;
     contact.value = getedtobj.contact;
     gmail.value = getedtobj.gmail;

}


const templating = (temp) =>{
    let result = ``;
    temp.forEach((std,i) => {
        result +=
                  `<tr id="${std.stdid}">
                     <td>${i +1}</td>
                     <td>${std.fname}</td>
                     <td>${std.lastn}</td>
                     <td>${std.contact}</td>
                     <td>${std.gmail}</td>
                     <td>
                     <button class="btn btn-primary"onclick="onEdit(this)">edit</button>
                     </td>
                     <td>
                     <button class="btn btn-danger" onclick="ondelet(this)">delet</button>
                     </td>
                  </tr>
                  ` 
    });
    tableData.innerHTML = result;
}
templating(arry)

let onsubmit= (eve) => {
    eve.preventDefault()
    cl("submit")
    let newobj= {
        fname :fname.value,
        lastn :lastn.value,
        gmail :gmail.value,
        contact :contact.value,
        stdid:uuidv4()

    }
    arry.push(newobj);
    localStorage.setItem("tableData",JSON.stringify(arry))
    templating(arry)
    cl(arry)
}

let onupdate =()=>{
    let getid=localStorage.getItem("editid");
    cl(getid)
    arry.forEach(std => {
        if(std.stdid === getid){
            fname.value = getid.fname;
            lastn.value = getid.lastn;
            contact.value = getid.contact;
            gmail.value = getid.gmail;
        }
    })
    localStorage.setItem("tableData",JSON.stringify(arry));
    templating(arry);
}




forminfo.addEventListener("submit",onsubmit);
updatebtn.addEventListener("click",onupdate);

function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0,  
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}
