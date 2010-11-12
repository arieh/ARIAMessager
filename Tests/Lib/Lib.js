function Fixture(func,args,bind){
    return function(){
       for (var i = args.length -1; i>=0;i--) func.apply(bind,args[i]);    
    }       
}

Create = (function(undef){
	if (Object.create) return function(obj,props){
		var clone = Object.create(obj);
		for (var k in props){
			clone[k] = props[k];
		} 
		return clone;
	}
	
	return function(obj,props){
       function F(){};
       var clone = new F();
       clone.prototype = obj;
       
	   for (var k in obj){
           if (obj.hasOwnProperty(k)){
              if (props && props[k] !== undef){
                clone[k] = props[k];
                delete props[k];
              } else if ('object' === typeof obj[k]) clone[k] = Create(obj[k]);
              else clone[k] = obj[k];
           }        
       }    
       for (var k in props) clone[k] = props[k];
       return clone;
    }
	
})();