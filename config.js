module.exports = {
    hash_secret: 'petcoccomierda',
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || 'mongodb://rankey:rankey@ds143131.mlab.com:43131/heroku_k2rjt2bn'
};