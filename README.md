# MultiGet

This application is in response to Pravala Coding Check: Multi-GET

This is a command line application, which speeds up downloads by requesting files in multiple pieces simultaneously

The following requirements are met by this application

	1) Source URL should be specified with a required command-line option
	2) File is downloaded in 4 chunks (4 requests made to the server)
	2) Only the first 4 MiB of the file should be downloaded from the server
	3) Output file may be specified with a command-line option (but may have a default if not set)
	4) No corruption in file - correct order, correct size, correct bytes (you don’t need to verify correctness, but it should not introduce errors)
	5) File is retrieved with GET requests
	6) Support files smaller than 4 MiB or different file size
	7) Configurable number of chunks

Given Javascript is a single threaded process, parallel download is not attempted.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

This application uses node and npm. After cloning this repository, at least three steps are required

	1) Locate the folder 'MultiGet' and 'npm install'
	2) Set the execute permission of app.js 'chmod +x app.js'
	3) Execute the app.js either via './app.js' or 'node app.js'

## Usage
This application has usage pattern of

	./app.js [options] <url>
	
where <url> is a required url string

  Options:

    -h, --help             output usage information
    -o <string>            Write output to <file> instead of default (optional)
    -s, --size <Number>    File download size in MB (optional)
    -c, --chunks <Number>  Number of chunks (optional)

One example of usage is 
	
	./app.js http://028eed10.bwtest-aws.pravala.com/384MB.jar

or

	./app.js -o 384MB.jar -s 2 -c 3 http://028eed10.bwtest-aws.pravala.com/384MB.jar 


A filename set by -o will be downloaded. If -o is not set, a filename 'default' will be downloaded in the same folder where app.js is.

## Contribute

PRs accepted.

## License

MIT © Hossan Zubayer
