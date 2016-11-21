#!/usr/bin/env node
var path = require("path"),
	multiGet = require(path.join(__dirname, "api", "MultiGet"));
	program = require('commander');

/**
*	This class parses the command line arguments 
*	calls multiGet to download from URL specified and merge all the chunks 
*/

/* Default values*/
var OUTPUT_FILENAME = "default",
	OUTPUT_FILESIZE = 4194304,
	NUMBER_OF_CHUNKS = 4;

/**
*	processArguments function parses arguments passed from
*	sets the optional arguments
*	call multiGet method to download chunks of file and merge them
*/
(function processArguments(arguments){
	/*parse command line inputes*/
	program
		.option('-o <string>', 'Write output to <file> instead of default (optional)')
		.option('-s, --size <Number>', 'File download size in MB (optional)', parseInt)
		.option('-c, --chunks <Number>', 'Number of chunks (optional)', parseInt)
		.usage('[options] <url>')
		.parse(arguments);


	/*regular expression for checking if a valid url is passed*/
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi,
		urlRegex = new RegExp(expression);


	/*
	*	This code below checks for the correctess of arguments.
	*	First it checks if an url is passed as argument, then it checks whether the url is lexically correct
	*	then sets the optional values from the ones passed from the command line
	*	Note that command line values are sanitized when they are parsed with appropritate parser
	*	
	*	this calls multiGet to Get the chunks of file and merge them
	*	After this step, it is expected that the arguments passed to multiGet has a proper value
	*/
	if (!program.args.length) {
		program.help();
	} else if (urlRegex.test(program.args[0])){

		if (program.O) OUTPUT_FILENAME = ""+program.O;
		if (program.size) {
			OUTPUT_FILESIZE = program.size *1024*1024;
		}
		if (program.chunks && program.chunks<OUTPUT_FILESIZE){
			NUMBER_OF_CHUNKS = program.chunks;
		}

		multiGet(program.args[0], OUTPUT_FILENAME, OUTPUT_FILESIZE, NUMBER_OF_CHUNKS);
	} else {
		process.stdout.write("A valid URL is required \n");
	}
})(process.argv);