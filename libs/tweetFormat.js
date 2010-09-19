module.exports = function(text) {
    var tweet = text.replace(/(\w+):\/\/[\S]+(\b|$)/gim, '<a href="$&" target="_blank">$&</a>')
    .replace(/([^\/])(www[\S]+(\b|$))/gim, '$1<a href="http://$2" target="_blank">$2</a>');

    tweet = tweet.replace(/(^|\s)@(\w+)/g, '$1@<a href="http://www.twitter.com/$2" target="_blank">$2</a>');
    tweet = tweet.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://search.twitter.com/search?q=%23$2" target="_blank">$2</a>');
    return tweet;
}
