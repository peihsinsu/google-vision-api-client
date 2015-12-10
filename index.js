var auth = require('google-api-utility')
  , request = auth.request
  , util = require('util')
  , requtil = require('./requtil');

var baseurl = 'https://vision.googleapis.com/v1alpha1/images:annotate';

/**
 * Initialize api with service account json file
 */
exports.init = function(jsonfile) {
	auth.init({
		scope: ['https://www.googleapis.com/auth/cloud-platform'].join(' '),
		json_file: jsonfile
	});
}

/**
 * Do the vision api query from given data
 */
exports.query = function(d, cb) {
	request({
		url: baseurl, 
		method: 'post',
		json: d 
	}, cb);
}

/**
 * The the requst utility for build request data
 */
exports.requtil = requtil;
