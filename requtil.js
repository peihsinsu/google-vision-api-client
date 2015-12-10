var fs = require('fs');

/**
 * Build the base64 image content from path
 */
function imgContent(path) {
	var result = fs.readFileSync(path).toString('base64');
  return process.env['TEST'] ? result.substring(0,50) + '...' : result;
}

/**
 * Create the leaf request
 */
exports.createRequest = createRequest;
function createRequest(path){
  return {
    image: {content: imgContent(path)},
    features: [],
    withFeature: function(type, maxResult) {
      this.features.push({
        type: type,
        maxResults: maxResult
      })
      return this;
    },
    build: function() {
      return {
        image: this.image, 
        features: this.features
      }
    }
  }
}

/**
 * Create the root request
 */
exports.createRequests = createRequests;
function createRequests(){
  return {
		requests:[],
		addRequest: function(req) {
			this.requests.push(req);
			return this;
		},
    build: function(){
			return {requests: this.requests}
    }
	}
}


