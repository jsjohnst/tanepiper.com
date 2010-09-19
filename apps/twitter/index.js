var connect = require('connect'),
    express = require('express'),
    YUI = require('yui3').YUI,
    dateFormat = require('libs/dateFormat'),
    tweetFormat = require('libs/tweetFormat')
;

var pageCache = null;

var app = module.exports = express.createServer();

app.mounted(function(parent) {
    YUI({ debug: false }).use('express', 'node', function(Y) {
    
        app.get('/', function(req, res) {    
            YUI({ debug: DEBUG }).use('node', 'io', function(page) {
                var ul = page.one('body').addClass('twitter').appendChild(page.Node.create('<ul></ul>'));
                var sendRequest = function() {
                    res.render('twitter.html', {
                        locals: {
                            instance: page,
                            content: '#content',
                            sub: {
                                title: 'twitter | Tane Piper'
                            },
                            after: function(Y, options, partial) {
                                Y.one('title').set('innerHTML', 'twitter | tanepiper.com');
                            }
                        }
                    });
                };

                if (pageCache) {
                    ul.set('innerHTML', pageCache);
                    sendRequest();
                } else {
                    YUI({ debug: DEBUG }).use('node', function(remotePage) {
                    
                        var url = 'http://twitter.com/statuses/user_timeline/20693.rss';
                    
                        //This will call io under the hood and get the content of the URL,
                        //It will then dump the content of that page into this sandboxed document.
                        remotePage.fetch(url, function() {
                            //Get all the news items from the remote page.
                            var newsItems = remotePage.all('channel item');
                            //Iterate them
                            newsItems.each(function(n) {
                                var li = page.Node.create('<li></li>');
                                // First we need to get the title and the link 
                                // of each item
                                var title = tweetFormat(n.one('title').get('innerHTML'));
                                var link = n.one('guid').get('innerHTML');
                                var pubDate = Date.parse(n.one('pubDate').get('innerHTML'));
                                
                                
                                var tweet = page.Node.create('<div class="tweet">'+title+'</div><br />');
                                
                                var a = page.Node.create('<a target="blank">'+dateFormat(pubDate, 'fullDate')+'</a>');
                                
                                a.set('href', link);
                                
                                tweet.append(a);
                                
                                li.append(tweet);
                                
                                ul.appendChild(li);
                            });

                            pageCache = ul.get('innerHTML');
                        
                            sendRequest();

                            setTimeout(function() {
                                //console.log('clear digg cache');
                                pageCache = null;
                            }, (1000 * 60 * 10));
                        });
                    });
                }            
            });
        });
    });
});
