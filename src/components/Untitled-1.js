function foo(){
    getName = function(){console.log(1);}
    return this
}

foo.getName = function(){console.log(2);}

foo.prototype.getName = function(){console.log(3);}

var getName = function(){console.log(4);}

function getName(){console.log(5);}

foo.getName()           //2 2
getName()               //4 4
foo().getName()         //1 getName is no a function
getName()               //1 4
new foo.getName()       //2 2
new foo().getName()     //3 3
new new foo().getName() //3 3