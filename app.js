#!/usr/bin/env node

require.paths.unshift(__dirname);

var connect = require('connect'),
    express = require('express'),
    YUI = require('yui3').YUI
;

var app = module.exports = express.createServer();

YUI({ debug: false }).use('express', 'node', function(Y) {

    app.configure(function(){
        app.use(express.methodOverride());
        app.use(express.bodyDecoder());
        app.use(express.cookieDecoder());        
        app.use(app.router);
        app.use(express.staticProvider(__dirname + '/static'));
        
        app.use('/blog', require('apps/blog'));
        app.use('/twitter', require('apps/twitter'));
    });
    
    app.configure('development', function(){
        DEBUG = true;
    });
    //Set the production environment to halt all debug logs.
    app.configure('production', function(){
        DEBUG = false;
    });
    
    app.register('.html', YUI);
    
    YUI.partials = [
        {
            name: 'layout_head',
            node: 'head'
        },
        {
            name: 'blog_head',
            node: 'head'
        },
        {
            name: 'layout_footer',
            node: 'footer'
        }
    ];
    
    YUI.configure(app, {
        yui2: '/yui2/',
        yui3: '/yui3/'
    });
    
    
    
    /* Ok, here we configure our front page */
    app.get('/', function(req, res) {
        //Render from ./views/index.html
        res.render('index.html', {
            //Locals used by the YUI renderer
            locals: {
                /**
                * This is the content placeholder in your ./views/layout.html file.
                * The content of index.html will be inserted here.
                */
                content: '#content',
                /**
                * Standard object hash to be passed to Y.Lang.sub after the
                * content has been loaded, but before it's inserted into the YUI
                * instance on render.
                */
                sub: {
                    title: 'Tane Piper'
                },
                /**
                * The after method will be invoked after the layout.html file
                * has been loaded into the instance. This allows you to change
                * the total layout, after all the peices have been assembled.
                */
                after: function(Y, options, partial) {
                    Y.one('title').set('innerHTML', 'tanepiper.com');
                    /* Below doesn't seem to work*/
                    Y.all("a[href^='http']").set('target', '_blank');
                }
            }
        });
    });
    
    // If we are not running spark, we can do the following
    //app.listen(19053);
    //if (DEBUG) {
    //    console.log('Server running at: http://localhost:1337/');
    //}
});
