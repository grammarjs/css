
var assert = require('assert');
var grammar = require('./index');
var Parser = require('grammarjs-recursive-parser');
var parser = new Parser(grammar);

describe('css', function(){
  it('selector', function(){
    var str = '.content { color: green; }';
    var val = parser.parse(str);
    console.log(JSON.stringify(val, null, 2));
  });
});