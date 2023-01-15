//let re;
//re = /hello/;

//console.log(re);
//console.log(re.source);

//Functions used to evaluate regexes
//1.exec(): Returns result in an array if there is a match or return null if there is none
//const result =  re.exec('hello world');
//console.log(result);
//This returns the regex that is been match, the index at which the matching starts and the whole input string that is been matched
//console.log(result[0]); //this returns the first instance of the regex
//console.log(result.index); //this returns the index of the regex
//console.log(result.input); //this returns the whole input string that the matching is been performed on

//2.Test(): returns true or false if there is a match
//const result = re.test('Hello');
//console.log(result);

//3.Match(): return results array or null like exec but opposite to how exec is written whereby the regex is pased as parameter to the function
//const str = 'hello There';
//const result = str.match(re);
//console.log(result);

//4. search(): returns the index of the first match and if not found returns -1
//const str = 'hello there';
//const result = str.search(re);
//console.log(result);

//5. replace(): return a new string with some or all matches of a pattern
//const str = 'hello there';
//const newStr = str.replace(re, 'Hi');
//console.log(newStr);


//character SETS using metacharacters
let re;
//Literal characters
re = /hello/;
re = /hello/i;

//Metacharacter Symbols
re = /^h/i;  //Must star with
re = /d$/i;  //Must end with
re = /^hello$/i  //Must begin and end with
re = /h.llo/i;   //matches any one character
re = /h*llo/i;   //matches any character 0 or more times
re = /gre?a?y/i;  //Optional character
re = /gre?a?y\?/i;  //Escape character

//Brackets [] - means character sets
re = /gr[ae]y/i  //must be an a or e;
re = /[GF]ray/   //must be a a G or F;
re = /[^GF]ray/   //matches anthing except a G or F;
re = /^[GF]ray/   //it means it must start with a G or F
re = /[A-Z]ray/   //matches any uppercase letter;
re = /[a-z]ray/   //matches any lowercase letter;
re = /[A-Za-z]ray/   //matches any letter both lower or uppercase letter;
re = /[0-9]ray/   //matches any digit letter;

//Braces {} - Quantifiers
re = /Hel{2}o/i;  //Must occur exactly {m} amount of times
re = /Hel{2,4}o/i;  //Must occur exactly {m to n} amount of times
re = /Hel{2,}o/i;  //Must occur at least {m} amount of times

//parenthesis () - Grouping used in conjunction with brackets and braces for grouping 
re = /^([0-9]x){3}/


//shorthand character Classes
re = /\w/;  //Word character - alphaNumeric which means it can be any letter, number of underscore
re = /\w+/;  //+ equals one or more character
re = /\W/;  // Non-Word characters - anything but alphaNumeric which means it can be any letter, number of underscore
re = /\d/;  //match any digit
re = /\d+/  //match one or more  digits
re = /\D/  //matches any non-digit
re = /\s/  //match whitespace char
re = /\S/  //match non-whitespace char
re = /Hell\b/i //Word boundary


//Assertions: they are like conditionals
re = /x(?=y)/;  //match x only if it is followed by y
re = /x(?!y)/;  //match x only if it not is followed by y

//String to match
const str = 'Hello, welcome to hell xy';

//Logging the result
const result = re.exec(str);
console.log(result);

//Using regex with constom function
function reTest(re, str) {
  if(re.test(str)) {
    console.log(`${str} matches ${re.source}`);
  }else {
    console.log(`${str} does NOT match ${re.source}`)
  }
}

reTest(re, str);