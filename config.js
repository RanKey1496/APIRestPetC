module.exports = {
    hash_secret: 'petcoccomierda',
	port: process.env.PORT || 8080,
	db: process.env.MONGODB_URI || 'mongodb://localhost:27017/petcoccolati'
};