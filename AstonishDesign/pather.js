#!/usr/bin/env node
var fs = require('fs');
var input = process.argv[2];
var output = process.argv[3];
var text = fs.readFileSync(input, "utf8");

var arr = [];
var finalArr = [];
var counter = 0;
var finalArray = [];
var finalString = "";
var hashCoordinate = [];
var y = 0;
var x = 0;

var splitTextFile = function(text) {
	arr.push(text.split('\n'));
	for( var i = 0; i < arr[0].length; i++ ) {
		finalArr.push(arr[0][i].split(''));
	}
};

var hashPosition = function(finalArr) {
	for( var x = 0; x < finalArr.length; x++ ) {
		for( var y = 0; y < finalArr[x].length; y++ ) {
			if( finalArr[x][y] === '#' ) {
				hashCoordinate.push(y,x);
			}
		}
	}
};

var drawVertical = function(finalArr) {
	for( var j = 0; j < hashCoordinate.length; j += 2 ){
		if( hashCoordinate[1 + j] !== hashCoordinate[3 + j] && hashCoordinate[0 + j] === hashCoordinate[2 + j] ) {
			for( var y = hashCoordinate[1 + j] + 1; y < hashCoordinate[3 + j]; y++ ) {
				finalArr[y][hashCoordinate[0 + j]] = '*';
			}
		} else
		if( hashCoordinate[1 + j] !== hashCoordinate[3 + j] && hashCoordinate[0 + j] !== hashCoordinate[2 + j] ) {
			for( var y = hashCoordinate[1 + j] + 1; y < hashCoordinate[3 + j]; y++ ) {
				finalArr[y][hashCoordinate[0 + j]] = '*';
			}
		}
	}
};

var drawHorizontal = function(finalArr) {
	for( var j = 0; j < hashCoordinate.length; j += 2 ){
		if( hashCoordinate[0 + j] !== hashCoordinate[2 + j] && hashCoordinate[1 + j] === hashCoordinate[3 + j] ) {
			for( var x = hashCoordinate[0 + j] + 1; x < hashCoordinate[2 + j]; x++ ) {
				finalArr[hashCoordinate[1 + j]][x] = '*';
			}
		} else
		if( hashCoordinate[0 + j] < hashCoordinate[2 + j] && hashCoordinate[1 + j] !== hashCoordinate[3 + j] ) {
			for( var x = hashCoordinate[0 + j]; x < hashCoordinate[2 + j]; x++ ) {
				finalArr[hashCoordinate[3 + j]][x] = '*';
			}
		} else
		if( hashCoordinate[0 + j] > hashCoordinate[2 + j] && hashCoordinate[1 + j] !== hashCoordinate[3 + j] ) {
			for( var x = hashCoordinate[2 + j] + 1; x <= hashCoordinate[0 + j]; x++ ) {
				finalArr[hashCoordinate[3 + j]][x] = '*';
			}
		}
	}
};

var joinArray = function(finalArr) {
	for( var i = 0; i < finalArr.length; i++ ) {
		finalArray.push(finalArr[i].join(""));
	}
	for ( var n = 0; n <finalArray.length; n++ ) {
		finalString += finalArray[n] + "\r\n";
	}
};

splitTextFile(text);
hashPosition(finalArr);
drawVertical(finalArr);
drawHorizontal(finalArr);
joinArray(finalArr);
console.log(finalString);

fs.writeFileSync(output, finalString);
