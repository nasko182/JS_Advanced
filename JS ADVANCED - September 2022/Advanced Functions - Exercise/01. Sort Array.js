function solve(input,str){
    if(str===`asc`){
        return input.sort((a,b)=>a-b);
    }
    else{
        return input.sort((a,b)=>b-a);
    }
}