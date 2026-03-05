import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const API = import.meta.env.VITE_API_URL;

const AdminBookPage = () => {

const [book,setBook] = useState({
title:"",
description:"",
image:"",
amazonLink:""
});

const [uploading,setUploading] = useState(false);

/* FETCH */
useEffect(()=>{

axios.get(`${API}/api/book`)
.then(res=>{
if(res.data) setBook(res.data)
})

},[]);

/* IMAGE UPLOAD */
const handleUpload = async (e:any)=>{

const file = e.target.files[0];
if(!file) return;

setUploading(true);

const formData = new FormData();

formData.append("file",file);
formData.append("upload_preset",import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const res = await fetch(
`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
{
method:"POST",
body:formData
}
);

const data = await res.json();

setBook({...book,image:data.secure_url});

setUploading(false);
};

/* SAVE */
const handleSave = async ()=>{

await axios.post(`${API}/api/book`,book);

alert("Saved");

};

return(

<div className="flex">

<Sidebar/>

<div className="flex-1 p-8 text-black">

<h1 className="text-2xl font-bold mb-6 text-white ">Book Section</h1>

<input
className="border p-2 w-full mb-4"
placeholder="Title"
value={book.title}
onChange={(e)=>setBook({...book,title:e.target.value})}
/>

<textarea
className="border p-2 w-full mb-4"
placeholder="Description"
value={book.description}
onChange={(e)=>setBook({...book,description:e.target.value})}
/>

<input
className="border p-2 w-full mb-4"
placeholder="Amazon Link"
value={book.amazonLink}
onChange={(e)=>setBook({...book,amazonLink:e.target.value})}
/>

<input type="file" onChange={handleUpload}/>

{uploading && <p>Uploading...</p>}

{book.image && (

<img src={book.image} className="w-40 mt-4"/>

)}

<button
onClick={handleSave}
className="bg-blue-600 text-white px-6 py-2 mt-4 rounded"
>

Save

</button>

</div>

</div>

);

};

export default AdminBookPage;