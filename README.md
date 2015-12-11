# Google Vision API Client

Vision API is an early trust preview api provide by Google Cloud. This is a node.js client for using google vision api. 

## Apply for Trust Preview

Please request from Google's request page: https://services.google.com/fb/forms/visionapialpha/

## Install

```
npm install google-vision-api-client
```

## Use

```
var vision = require('google-vision-api-client');
var requtil = vision.requtil;

//Prepare your service account from trust preview certificated project
var jsonfile = '/path-to-your-service-account.json';

//Initialize the api
vision.init(jsonfile);

//Build the request payloads
var d = requtil.createRequests().addRequest(
	requtil.createRequest('/path-to-your-image.jpg')
		.withFeature('FACE_DETECTION', 3)
		.withFeature('LABEL_DETECTION', 2)
		.build());

//Do query to the api server
vision.query(d, function(e, r, d){
	if(e) console.log('ERROR:', e);
  console.log(JSON.stringify(d));
});
``` 

## Sample of Detect Face

Let's to try a sample to highlight the faces from the image you gived...

```
var vision = require('google-vision-api-client');
var requtil = vision.requtil;
var request = require('request');
var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , sizeOf = require('image-size');

var tmpfile = '/tmp/mytmpfile';

var canvas = new Canvas(200, 200)
  , ctx = canvas.getContext('2d')

var jsonfile = '/Users/peihsinsu/.gcpkeys/itri-smart-home/itri-smart-home-33f5a755a360.json';
vision.init(jsonfile);

var outfile = '/tmp/test.jpg';

function getColor(i) {
  var list = ['red', 'yellow', 'pink', 'green', 'blue'];
  return list[i%list.length];
}

exports.draw = draw;
function draw(imgfile, outfile, opts, cb){
	fs.readFile(imgfile, function(err, squid){
		if (err) throw err;
		img = new Image;
		img.src = squid;

    if (opts && opts.filter) {
      opts.filter(ctx);
    }
		ctx.drawImage(img , 0, 0, img.width , img.height );

	  ctx.globalAlpha = .5;

    var i = 0;
    function doit(vec) {
      var color = Math.random()*1000%255;
		  ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(vec[0].x, vec[0].y);
			ctx.lineTo(vec[1].x, vec[1].y);
			ctx.lineTo(vec[2].x, vec[2].y);
			ctx.lineTo(vec[3].x, vec[3].y);
			ctx.closePath();
		  ctx.strokeStyle = getColor(i);//'rgb(255,color,0)';
      i++;
			ctx.stroke();
      //ctx.fill();
    }

    opts.vec.forEach(function(v) {
      doit(v)
    });
		fs.writeFileSync(outfile, canvas.toBuffer());
    cb();
	});
}

function main(imgfile) {
	var d = requtil.createRequests().addRequest(
		requtil.createRequest(imgfile)
			.withFeature('FACE_DETECTION', 50)
			//.withFeature('LABEL_DETECTION', 20)
			.build());

	var imgSize = sizeOf(imgfile);
	console.log(imgSize.width, imgSize.height);

	vision.query(d, function(e, r, d){
		if(e) return console.log('ERROR:', e);
		console.log(JSON.stringify(d));

    if(!d.responses[0].faceAnnotations) return;

		//var v = d.responses[0].faceAnnotations[0].boundingPoly.vertices;
		var v = [];
		d.responses[0].faceAnnotations.forEach(function(o){
			v.push(o.boundingPoly.vertices);
		})
		console.log('-->', v);
		canvas.width = imgSize.width;
		canvas.height = imgSize.height;

		draw(imgfile, outfile, {
				vec: v,
				filter: function(ctx) {
					//ctx.strokeStyle = 'rgba(255,0,0,.5)';
				}
			},
			function(err) {
				if(err) console.log('ERROR:', err);
		});
	});
}

//Do the process
if(process.argv[2].indexOf('http') == 0) {
  var url = process.argv[2];
  var req = request.get(url);
  req.pipe(fs.createWriteStream(tmpfile));
  req.on('end', function(){
    main(tmpfile);
  });
} else {
  main(process.argv[2]);
}
```

Save the code to test.js, then try to excute:

Execute for web resource...

```
$ node test http://www.kevinparker.com.au/people/p7IGM_images/fullsize/shutterstock_48737587_fs.jpg
```

Execute for local resource

```
$ node test /Users/peihsinsu/Pictures/Simon/simon01.jpg
```

View the image that formated...

```
$ open /tmp/test.jpg
```

PS: The sample default output the file to /tmp/test.jpg

## Notes

* Install canvas: https://github.com/Automattic/node-canvas
