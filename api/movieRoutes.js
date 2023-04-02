const express = require('express')
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');


const Movie = require('./movieModel');




const storage = multer.diskStorage({
	destination :function(req,file,cb)
	{
		cb(null,'images');
	},
	filename:function(req,file,cb)
	{
		cb(null,uuidv4() + '-' +Date.now()+path.extname(file.originalname));
	}
});

const fileFilter = (req,file,cb) => {
	const allowedFileTypes = ['image/jpeg','image/jpg','image/png','application/pdf'];
	
	if(allowedFileTypes.includes(file.mimetype)){
		cb(null,true);
	}
	else
	{
		cb(null,false);
	}
}

let upload = multer({storage,fileFilter});



router.post('/create1',upload.single('file'),async (req,res) => {	
	console.log('ook');
	console.log(req.body);
	console.log(req.files);
	console.log(req.files.file[0].filename);
	/*var pro_image = "";
if(typeof req.files.file !== 'undefined')
	{
		pro_image = req.files.file[0].filename;
	}
	else
	{
pro_image = "";
	}	
	*/

});


//create
router.post('/create',async (req,res) => {	
	const movie = new Movie({	
		moviename : req.body.moviename,
		rating : req.body.rating,
		genre: req.body.genre,
		//releaseDate: req.body.releaseDate,
		cast:req.body.cast
  });
  
const newMovie = await movie.save();
  
  if (newMovie) {
    return res
      .status(201)
      .send({ message: 'New Movie Inserted', 
	  data: newMovie });
  }
  return res.status(500).send({ message: ' Error in Inserting Movie.' });

});

//Get
router.get("/read",async (req,res) => {
	var findMovie = await Movie.find();
res.json(findMovie);
})


//Delete
router.delete('/:id', async (req, res) => {
  var deletedMovie = await Movie.findById(req.params.id);
  if (deletedMovie) {
     deletedMovie = await deletedMovie.remove();
   res.json( deletedMovie );
  } else {
    res.send('Error in Deletion.');
  }
  
});

//Edit
router.get('/:id', async (req, res) => {
  const movie = await Movie.findOne({ _id: req.params.id });
  if (movie) {
    res.send(movie);
  } else {
    res.status(404).send({ message: 'movie Not Found.' });
  }
});


//Update
router.put("/:id",  async (req, res) => {
	 try {
    let updateMovie = await Movie.findById(req.params.id);
		
	
	
    const data = {
		moviename : req.body.moviename,
		rating : req.body.rating,
		genre: req.body.genre,
		//releaseDate: req.body.releaseDate,
		cast:req.body.cast
    };
		
    updateMovie = await Movie.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updateMovie);
  } catch (err) {
    console.log(err);
  }
	
  
});





module.exports = router