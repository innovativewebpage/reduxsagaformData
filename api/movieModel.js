const mongoose = require('mongoose');





const movieSchema = new mongoose.Schema({
  
		name: { type: String },
		photo:{type:String},
		birthdate:{type:String},
		file:{type:String}
		
		 
});


const movieModel = mongoose.model('Movie', movieSchema);

module.exports = movieModel;



