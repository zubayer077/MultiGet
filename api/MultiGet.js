var path = require("path"),
	request = require('request'),
	fs = require('fs');

/**
*	this class takes url, filename, filesize, number of chunks as parameter
*	downloads chunks of file and merge them
*	@url: an url in the format http://XXXXX.XXX/XXX
*	@fileName: a filename in String
*	@fileSize: a file size in Bytes, Number
*	@numberOfChunks: Numbers of chunks the file has to be downloaded, Number
*	@return: undefined
**/

function MultiGet(url,fileName,fileSize,numberOfChunks){

	/* Gets chunks of the file sequentially*/
	function getParts(url, fileName,fileSize,numberOfChunks){

		var chunkSize = Math.floor(fileSize/numberOfChunks),
			loopIndex = 0,
			fileStartsAt=0;

		/* Makes a GET request for each chunk of file*/
		(function getChunk(fileStartsAt, fileEndsAt){
			request(
					{
						method: 'GET',
					    uri: url,
					    headers: {
		    				'Range': "bytes="+fileStartsAt+"-"+fileEndsAt
		  				}
					}, function (error, response, body) {
					  if (!error && response.statusCode == 206) {			
						++loopIndex;
						if (loopIndex<numberOfChunks) {

							var lastExtraBytes = 0;
							if ((loopIndex+1)>=numberOfChunks && (fileSize-1)-(fileEndsAt+chunkSize)>0){
									lastExtraBytes= (fileSize-1)-(fileEndsAt+chunkSize);
							}

							getChunk(fileEndsAt+1, fileEndsAt+lastExtraBytes+chunkSize);
						} else {
							process.stdout.write("Filename "+fileName+" is downloaded \n");
						}
					  }
		  
				}).pipe(fs.createWriteStream(fileName, {'flags': 'a'}));
		})(fileStartsAt, (fileStartsAt+chunkSize)-1);
	}

	/* Public Consctructor*/
	this.constructor = function(url, fileName,fileSize,numberOfChunks){
		getParts(url, fileName,fileSize,numberOfChunks);
	};
	this.constructor(url, fileName,fileSize,numberOfChunks);
};

/**
*	returns an instance of MultiGet class
*/
module.exports = function(url,fileName,fileSize,numberOfChunks){
	return new MultiGet(url,fileName,fileSize,numberOfChunks);
};