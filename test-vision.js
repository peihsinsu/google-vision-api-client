var vision = require('./index');
var requtil = vision.requtil;

var jsonfile = '/Users/peihsinsu/.gcpkeys/itri-smart-home/itri-smart-home-33f5a755a360.json';

vision.init(jsonfile);

var path = '/Users/peihsinsu/Pictures/Simon/20131109_085327.jpg';

var d = requtil.createRequests().addRequest(
	requtil.createRequest(path)
		.withFeature('FACE_DETECTION', 3)
		.withFeature('LABEL_DETECTION', 2)
		.build());

vision.query(d, function(e, r, d){
	if(e) console.log('ERROR:', e);
  console.log(JSON.stringify(d));
});

