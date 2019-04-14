var Event=(function(){
    var clientList={},

    listen,trigger,romeve;

	listen=function(key,fn){
		if(!clientList[key]){
			clientList[key]=[]
        }
		clientList[key].push(fn);
    };
	trigger=function(){
        var key=Array.prototype.shift.call(arguments);
        var fns=clientList[key];
        if(!fns||fns.length===0){
            return false;
        }
        for(var i=0;i<fns.length;i++){
            fns[i].apply(this,arguments);
        }
    };
	remove=function(key,fn){
		var fns=clientList[key];
		if(!fns){
			return false;
        }
		if(!fn){
			fns&&(fns.length=0);
        }else{
			for(var i=0;i<fns.length;i++){
				if(fns[i]==fn){
					fns.splice(i,1);
                }
            }      
   		 }
	};

return {
	listen:listen,
	trigger:trigger,
	remove:remove
};
})();

// var installEvent=function(obj){
// 	for(var i in event){
// 		obj[i]=event[i];
//     }
// };

// var login={};
// installEvent(login);



// 此时我们都使用全局的Event来进行发布订阅
// 订阅
Event.listen('tree', t1=function(price) {
  console.log('价格1= ' + price);
});
Event.listen('tree',t2= function(price) {
  console.log('价格2= ' + price);
});

// 发布
Event.trigger('tree', 2000000);
//删除
Event.remove('tree',t1);