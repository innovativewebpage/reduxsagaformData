import React ,{useState} from 'react';
import axios from 'axios';



	
const ImageUpload =() => {
	
	const[newUser,setNewAuthor]=useState({
				name:'',
				birthdate:'',
				photo:'',
				file:null
		});
		
		console.log('newUser==',newUser);


const handleChange = (e) => {
	setNewAuthor({...newUser,[e.target.name]:e.target.value})	
}
	
const handlePhoto = (e) => {
	
	console.log(e.target.files[0]);
	
//console.log('sss',e.target.files[0])
setNewAuthor({...newUser,
photo:e.target.files[0].name,
file:e.target.files[0]

});
//console.log(newUser.photo);	

}
	

const handleSubmit = (e) => {
	e.preventDefault();
	const formData = new FormData();
	
	
	
	formData.append('photo',newUser.photo);
	formData.append('birthdate',newUser.birthdate);
	formData.append('name',newUser.name);
	formData.append('file',newUser.file);
	//console.log(newUser.photo);
	
	const options = {
            method: 'post',
            body: formData,
        }
		
		
	
	const res = fetch('http://localhost:5000/api/movie/create1', options)
  
	 /*const options = {
            method: 'POST',
            body: JSON.stringify(formData),
        };
		
		
		
		 const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
*/

/*fetch("http://localhost:5000/app/movie/create1", formData, config)*/

//fetch("http://localhost:5000/app/movie/create1" ,options)	
	
//const url = 'http://localhost:5000/app/movie/create1'

/*axios.post('http://localhost:5000/app/movie/create1',formData)
	.then(res => {
		console.log(res);
	})
	.catch(err => {

		console.log(err)
	})
	*/
	
	/*fetch(url,{	
		method:'POST',
		headers: {'Content-Type':'multipart/form-data'},
		body:formData
		
	})
	.then(response => response.json())
	.then(json => console.log(json))
	.catch(e => { console.log("e",e)})*/
	
	
	
}	

	
  return (
    
	
	<form onSubmit={handleSubmit} >

	<input
		type="file"
		accept=".png, .jpg, .jpeg"
		name="photo"
		onChange={handlePhoto}
	/>

	<input
		type="text"
		placeholder="name"
		name="name"
		value={newUser.name}
		onChange={handleChange}
	/>

	<input 
		type="date"
		name="birthdate"
		value={newUser.birthdate}
		onChange={handleChange}
	/>


	<div className="bg">

	</div>

		
	<input 
		type="submit"
	/>

</form>
	

	
	
  );
}

export default ImageUpload;
