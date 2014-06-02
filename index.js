
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
    ':ws',
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
 * Whitespace.
 */

expression('ws')
  .match(/[\s]*/, value);