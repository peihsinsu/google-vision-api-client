# Google Vision API Client

Vision API is an early trust preview api provide by Google Cloud. This is a node.js client for using google vision api. 

## Apply for Trust Preview

Please request from Google's request page: https://services.google.com/fb/forms/visionapialpha/

## Use

```
var vision = require('./index');
var requtil = vision.requtil;

//Prepare your service account from trust preview certificated project
var jsonfile = '/Users/peihsinsu/.gcpkeys/itri-smart-home/itri-smart-home-33f5a755a360.json';

//Initialize the api
vision.init(jsonfile);

//Build the request payloads
var d = requtil.createRequests().addRequest(
	requtil.createRequest('/Users/peihsinsu/Pictures/Simon/20131109_085327.jpg')
		.withFeature('FACE_DETECTION', 3)
		.withFeature('LABEL_DETECTION', 2)
		.build());

//Do query to the api server
vision.query(d, function(e, r, d){
	if(e) console.log('ERROR:', e);
  console.log(JSON.stringify(d));
});
``` 
