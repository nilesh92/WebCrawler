var express = require('express');
var router = express.Router();
var converter = require('rel-to-abs');
var request = require('request');
var fetchlinks = require("crawler");
var url = require('url');
var S = require('string');
var check = require('check-types');
var cheerio = require('cheerio');
var fs = require('fs');

var base;
var absurl;

router.get('/homepage', function(req, res) {
res.render('homepage', {title: 'Welcome page-'});
});

router.get('/results', function(req, res) {
res.render('results', {title: 'Crawled links'});
});

router.post('/results', function(req, res) {

var contents = '';
var link1 = req.body.link;
var count = req.body.count;

var seen = {};

var c = new fetchlinks({
    maxConnections : 10,
	
    callback : function (error, result, $) {                                //to be called for each fetched url
	
	if(count <= 0)                                                          //if no links are remaining to be crawled, then return.
	return ;
	
	if(error)
	console.log(error);
		
		if(check.undefined($))
			{
			//
			}
			else
            $('a').each(function(index, a) {
			if(count>0)
			{
			var new_found_url = $(a).attr('href');
			if(check.undefined(new_found_url))                         
			{
			//console.log('abc');
			}
			else
			if(!seen[new_found_url] && count>0)             //check if this url is already visited and the total no. of links to be fetched is reached or not.
			{
            c.queue(new_found_url);                                        //push the newly found link to the queue.
			seen[new_found_url]=true;
			base = result.request.uri.href;
            absurl = url.resolve(base,new_found_url);                      //convert to absolute url
			//console.log(absurl);
			contents += absurl + "\n";
			
			fs.appendFile('results.txt', absurl+"\r\n", function (err) {
			
            if(err)
			console.log(err);
            });
			
			count =  count-1;                                              //decrease count of no. of links to be fetched by 1.
			}
			}
        });
		
		if(count<=0)
		{
		//res.location('/results');
		res.render('results', {title: 'Crawled links', contents: contents});   //send the results once the total no. of links specified are crawled.
		}
    }
	
}); 

c.queue(link1);                                      //Push the starting link to the queue.

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;