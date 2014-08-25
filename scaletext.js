/**
 * Steven Masala
 * 
 * jQuery Plugin
 * 
 * Scale Text JS
 * Scale the text inside a container to that of its height and width!
 * 
 * 
 *  Usage: $(".mydiv").scaletext()
 *  
 *  html:
 *  
 *  <div class="some selector">
 *  	<span></span>
 *  </div>
 * 
 */


$.fn.scaletext = function(){
	
	var testDimensions = function($line, maxWidth, maxHeight){
		
		var cWidth = $line.width();
		
		if($line.height() <= maxHeight){
			
			if($line.width() > maxWidth){
				if($line.html().trim().indexOf(" ") >= 0){
					$line.css("width", maxWidth);
					var newHeight = $line.height();
					var spanWidth = $line.find("span").width();
					if(spanWidth > maxWidth){
						return false;
					}
					$line.css("width", "auto");
					if(newHeight > maxHeight){
						return false;
					}
				}else{
					return false;
				}
			}
			
			
			return true;
		}
		
		
		
		return false;
	};
	
	this.each(function(){
		var $t = $(this).addClass('scaletext'),
        maxWidth = $t.width(),
        maxHeight = $t.height();
		var $clone = $t.clone()
						.addClass("scaletext-cloned")
						.removeAttr('id')
				        .css({
				            position: 'absolute',
				            left: 0,
				            top: 200,
				            padding: $t.css("padding") || 0,
				            margin:0,
				            width:"auto",
				            height:"auto"
				        }).appendTo(document.body);
		
		var fontSize = 1;
		var prevFontSize = fontSize;
		var previousFit = false;
		var fit = false;
		var increment = 1;
		
		var foundFont = false;
		//TODO: better method than incrementing to 999?
		for(fontSize; fontSize<999;fontSize++){
			fontSize += increment;
			$clone.css("font-size", fontSize + "px");
			fit = testDimensions($clone, maxWidth, maxHeight);
			
			
			if(previousFit && !fit){
				fontSize = prevFontSize;
				foundFont = true;
				break;
			}
			
			if(!previousFit && !fit){
				//error
				break;
			}
			
			previousFit = fit;
			prevFontSize = fontSize;
		}
		
		$clone.remove();
		
		if(foundFont){
			var currentInline = $t.attr("style") || "";
			currentInline = currentInline.replace(/font-size:([0-9]+)px;/g, "");
			$t.attr("style", currentInline + "font-size:" + fontSize + "px;");
		}
		
		
	})
	
}
