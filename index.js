
/**
 * Module dependencies.
 */

var Token = require('languagejs-token');
var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('css');
var expression = grammar.expression;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

expression('css')
  .match(':block*', passthrough);

/**
 * All major CSS object types.
 */

expression('block')
  .match(':selector', passthrough)
  .match(':comment', passthrough)
  //.match(':import', passthrough);

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
    ':ws',
    passthrough);

/**
 * Selector types.
 */

expression('selector.type')
  .match(':selector.type.class', value)
  // .match(':selector.type.id', value)
  // .match(':selector.type.tag', value);

/**
 * Class selector.
 */

expression('selector.type.class')
  .match(
    ':punctuation.period', 
    ':selector.name',
    passthrough);

/**
 * Selector name.
 */

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
    passthrough);

/**
 * Declaration name.
 */

expression('declaration.name')
  .match(/[a-zA-Z\-]+/, value);

/**
 * Declaration value.
 */

expression('declaration.value')
  .match(/[a-zA-Z\-]+/, value);

/**
 * Comment.
 */

expression('comment')
  .match(
    ':comment.start',
    ':comment.body',
    ':comment.end',
    passthrough);

/**
 * Comment start.
 */

expression('comment.start')
  .match('/*', value);

/**
 * TODO: need better patterns.
 * Maybe add not operator for subexpressions?
 */

expression('comment.body')
  .match(/[^*\/]+/, value);

/**
 * Comment end.
 */

expression('comment.end')
  .match('*/', value);

/**
 * Opening bracket.
 */

expression('punctuation.bracket.begin')
  .match('{', value);

/**
 * Closing bracket.
 */

expression('punctuation.bracket.end')
  .match('}', value);

/**
 * Period.
 */

expression('punctuation.period')
  .match('.', value);

/**
 * Colon.
 */

expression('punctuation.colon')
  .match(':', value);

/**
 * Semicolon.
 */

expression('punctuation.semicolon')
  .match(';', value);

/**
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, value);