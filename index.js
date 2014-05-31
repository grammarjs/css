
/**
 * Module dependencies.
 */

var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('css');
var expression = grammar.expression;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

expression('css')
  .match(':selector*', passthrough);

/**
 * Selector.
 */

expression('selector')
  .match(
    ':selector.type', 
    ':ws', 
    ':punctuation.bracket.begin', 
    ':ws',
    ':declaration*',
    ':ws',
    ':punctuation.bracket.end',
    passthrough);

expression('selector.type')
  .match(':selector.type.class', value)
  // .match(':selector.type.id', value)
  // .match(':selector.type.tag', value);

expression('selector.type.class')
  .match(
    ':punctuation.period', 
    ':selector.name', 
    passthrough);

expression('punctuation.bracket.begin')
  .match('{', value);

expression('punctuation.bracket.end')
  .match('}', value);

expression('punctuation.period')
  .match('.', value);

expression('selector.name')
  .match(/[a-z0-9]+/, value);

/**
 * CSS Declaration.
 */

expression('declaration')
  .match(
    ':ws',
    ':declaration.name', 
    ':ws',
    ':punctuation.colon',
    ':ws',
    ':declaration.value', 
    ':ws',
    ':punctuation.semicolon',
    passthrough)

expression('declaration.name')
  .match(/[a-zA-Z\-]+/, value);

expression('punctuation.colon')
  .match(':', value);

expression('punctuation.semicolon')
  .match(';', value);

expression('declaration.value')
  .match(/[a-zA-Z\-]+/, value);

/**
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, value);

function Token(type, content) {
  this.type = type;
  this.content = content;
}

function token(type, val) {
  //return [ type, val ];
  return new Token(type, val);
}

function value(val) {
  return token(this.expression.name, val);
}

function passthrough() {
  var arr = [];
  for (var i = 0, n = arguments.length; i < n; i++) {
    if (Array.isArray(arguments[i])) {
      arr.push.apply(arr, arguments[i]);
    } else {
      arr.push(arguments[i]);
    }
  }
  return token(this.expression.name, arr);
}

function log() {
  console.log('log', arguments)
}