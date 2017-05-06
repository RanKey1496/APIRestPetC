module.exports = {
    hash_secret: 'petcoccomierda',
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || 'mongodb://rankey:rankey@ds133418.mlab.com:33418/heroku_kbwv90n5'
};