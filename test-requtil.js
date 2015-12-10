var requtil = require('./requtil');
var path = '/Users/peihsinsu/Pictures/Simon/20131109_085327.jpg';

var out = requtil.createRequests().addRequest(
	requtil.createRequest(path)
		.withFeature('FACE_DETECTION', 3)
		.withFeature('LABEL_DETECTION', 2)
		.build());

console.log(JSON.stringify(out.build()));

