let cl = console.log;

let forminfo= document.getElementById("forminfo");
let fname= document.getElementById("fname");
let lastn=document.getElementById("lastn");
let contact= document.getElementById("contact");
let gmail=document.getElementById("gmail");
let tableData=document.getElementById("tableData");
let updateBtn= document.getElementById("updateBtn");
let submitBtn= document.getElementById("submitBtn");


//let arry = [
    //{
  //      fname :"asdcvf",
      //  lname :"abcd",
       // contact :"123456",
        //gmail :"abc@gmail.com",
        //stdid:"1"

    //}
//];
let arry =JSON.parse(localStorage.getItem("forminfo")) || [];

let onEdit = (edt) => {
    cl(edt)
    let getid = edt.closest("tr").id;
    cl(getid)
    //let getedtobj = arry.find(stds =>{
      //  return stds.stdid ===getid
    //})
    localStorage.setItem("editid",getid)
    let getedtobj = arry.find(std=> std.stdid === getid);
    cl(getedtobj)
     updateBtn.classList.remove("d-none");
     submitBtn.classList.add("d-none");
            fname.value = getedtobj.fname;
            lastn.value = getedtobj.lastn;
            contact.value =getedtobj.contact;
            gmail.value = getedtobj.gmail;

                     }

const templating = (temp) =>{
    let result = ``;
    temp.forEach((std, i) => {
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
        if(std.stdid === getid) {
            std.fname = fname.value;
            std.lastn = lastn.value;
            std.contact = contact.value;
             std.gmail = gmail.value;
        }
    })
    localStorage.setItem("tableData",JSON.stringify(arry));
    templating(arry);
    let getTr =document.getElementById(getid).children;
    cl(getTr)
}




forminfo.addEventListener("submit",onsubmit);
updateBtn.addEventListener("click",onupdate);

function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0,  
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}
