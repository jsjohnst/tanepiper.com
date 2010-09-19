var connect = require('connect'),
    express = require('express'),
    YUI = require('yui3').YUI,
;

YUI({ debug: false }).use('express', 'node', function(Y) {
    var app = module.exports = express.createServer();
    
    app.mounted(function(parent) {
    
        app.get('/', function(req, res) {
            YUI({ debug: DEBUG }).use('yql', 'node', function(page) {
            
                
            
            
            });
        });
    });
});
