var multer = require('multer');

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] == obj) {
            return true;
        }
    }

    return false;
}

function saveFile(){
	var storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'uploads/')
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now() + '.jpg')
	  }
	});
	var upload = multer({ storage: storage }).single('file');

	return upload;
}

module.exports = {
	containsObject,
	saveFile
};