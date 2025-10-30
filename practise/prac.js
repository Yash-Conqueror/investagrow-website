 function isFunctionValid(s){
    if(s.length % 2 ===1)return false;
    const matchingOpen=new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}']
    ])
    const stack=[];

    for(const ch of s){
        if(matchingOpen.has(ch)){
            if(stack.length===0||stack.pop()!==matchingOpen.get(ch)) {return false;}
        }else{
            stack.push(ch);
        }
    }
    return stack.length===0;

    }
console.log(isFunctionValid("()"));
console.log(isFunctionValid("()[]{}"));
console.log(isFunctionValid("(]"));
console.log(isFunctionValid("([)]"));
console.log(isFunctionValid("{[]}"));   





