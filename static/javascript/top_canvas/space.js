(function() {

    Space = function() {
        return this;
    };
    
    Space.prototype = {
        stars: null,
        num_stars: 1000,
        width: 0,
        height: 0,
    
        init: function(width, height) {
            this.width = width;
			this.height = height;
        
            this.stars = [];
			for( i = 0; i<this.num_stars; i++ )	{
				this.stars.push( Math.floor( Math.random()*(width-10)+5  ) );
				this.stars.push( Math.floor( Math.random()*(height-10)+5 ) );
			}
        },
        
        paint: function(ctx, time) {
            ctx.save();
            
            ctx.globalAlpha = 1;
            ctx.strokeStyle = 'rgb(240,240,240)';
            for( var j = 0; j < this.stars.length; j += 2 )	{
                var inc = 1;
                if ( j % 3 == 0 ) {
						inc = 1.5;
					} else if ( j % 11 == 0 ) {
						inc = 2.5;
					}					
				this.stars[j]= (this.stars[j]+.1*inc)%this.width;
				var y= this.stars[j+1];
				ctx.strokeRect(this.stars[j],this.stars[j+1],1,1);
			}
			ctx.restore();
        }
    };
})();
