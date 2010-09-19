(function() {
    var now = new Date();
    var interval= null;
    var canvas= null;
    var ctx= null;
    var garden= null;
    var time;
    var gradient = null;
    var last = 1;
    
    if (now.getHours() < 5) {
        // Night time
        var skyColors = ["23084D","160630","010003","07020F"]
        var ambientLast = .35;
        var ambient = .05;
        var showFlies = true;
        var showStars = true;
      } else if (now.getHours() < 9) {
        // Dawn
        var skyColors = ["582A46","53385D","4A538B","3399FF"];
        var ambientLast = .05;
        var ambient = .5;
        var showFlies = false;
        var showStars = true;
      } else if (now.getHours() < 17) {
        // Daytime
        var skyColors = ["FBF2DF","D3E3EC","9FBFDF","73A9DF"];
        var ambientLast = .5;
        var ambient = 1;    
        var showFlies = false;
        var showStars = false;
      } else {
        // Dusk
        var skyColors = ["372440","7F2318","D67318","F0B223"];
        var ambientLast = 1;
	    var ambient = .35;
        var showFlies = true;
        var showStars = true;
      }
      
      function init(images) {
    	
        canvas= document.getElementById('headercanvas');
        ctx= canvas.getContext('2d');
        canvas.width= 980;
        canvas.height=90;

        garden= new Garden();
        garden.initialize(canvas.width, canvas.height, 200);
        
        gradient= ctx.createLinearGradient(0,0,0,canvas.height);
    	
    	for( var i=0; i<4; i++ )	{
	    	gradient.addColorStop( i/3, '#' + skyColors[i] );
    	}
    	
    	garden.ambient= (ambientLast-ambient) + ambient;
        
        time= new Date().getTime();
        interval = setInterval(_doit, 30);
    }



    function _doit()    {
    	
    	ctx.fillStyle= gradient;
    	ctx.fillRect(0,0,canvas.width,canvas.height);
    	var ntime= new Date().getTime();
    	var elapsed= ntime-time;
    	garden.paint( ctx, elapsed );
    	
    }
    
    jQuery(document).ready(function(){
        init(null);
    });
    
    
})();
