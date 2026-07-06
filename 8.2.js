function name(a) {
    return function(b){
        return a*b;
    }
}

console.log(name(5)(6));