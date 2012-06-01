var fs = require("fs");
var fileExtensions = [];

exports.setFileExtensions = function(extensions) {
	fileExtensions = extensions;
}

var recursiveDirectoryIterator = function(dir, ext, callback) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return callback(err);
		var pending = list.length;
		if (!pending) return callback(null, results);
		list.forEach(function(file) {
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					recursiveDirectoryIterator(file, ext, function(err, res) {
						results = results.concat(res);
						if (!--pending) callback(null, results);
					});
				} else {
					if (file.match(ext)) results.push(file);
					if (!--pending) callback(null, results);
				}
			});
		});
	});
};

exports.recursiveDirectoryIterator = recursiveDirectoryIterator;