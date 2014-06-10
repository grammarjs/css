
/**
 * Module dependencies.
 */

var Token = require('grammarjs-token');
var Grammar = require('grammarjs-grammar');
var grammar = new Grammar('css');
var rule = grammar.rule;
var value = Token.value;
var passthrough = Token.passthrough;

/**
 * Expose `grammar`.
 */

module.exports = grammar;

/**
 * Start.
 */

rule('css')
  .match(':block*', passthrough);

/**
 * All major CSS object types.
 */

rule('block')
  .match(':selector', passthrough)
  .match(':comment', passthrough)
  .match(':import', passthrough);

/**
 * Selector.
 */

rule('selector')
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

rule('selector.type')
  .match(':selector.type.class', value)
  // .match(':selector.type.id', value)
  // .match(':selector.type.tag', value);

/**
 * Class selector.
 */

rule('selector.type.class')
  .match(
    ':punctuation.period', 
    ':selector.name',
    passthrough);

/**
 * Selector name.
 */

rule('selector.name')
  .match(/[a-z0-9]+/, value);

/**
 * CSS Declaration.
 */

rule('declaration')
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

rule('declaration.name')
  .match(/[a-zA-Z\-]+/, value);

/**
 * Declaration value.
 */

rule('declaration.value')
  .match(/[a-zA-Z\-]+/, value);

/**
 * Import.
 */

rule('import')
  .match(
    ':punctuation.at',
    ':import.name',
    ':ws',
    ':import.content',
    ':ws',
    ':punctuation.semicolon',
    ':ws',
    passthrough);

/**
 * Import name.
 */

rule('import.name')
  .match('import', value);

/**
 * Import content.
 *
 * TODO: need better pattern.
 */

rule('import.content')
  .match(/[^;]+/, value);

/**
 * Comment.
 */

rule('comment')
  .match(
    ':comment.start',
    ':comment.body',
    ':comment.end',
    passthrough);

/**
 * Comment start.
 */

rule('comment.start')
  .match('/*', value);

/**
 * TODO: need better patterns.
 * Maybe add not operator for subrules?
 */

rule('comment.body')
  .match(/[^*\/]+/, value);

/**
 * Comment end.
 */

rule('comment.end')
  .match('*/', value);

/**
 * Opening bracket.
 */

rule('punctuation.bracket.begin')
  .match('{', value);

/**
 * Closing bracket.
 */

rule('punctuation.bracket.end')
  .match('}', value);

/**
 * Period.
 */

rule('punctuation.period')
  .match('.', value);

/**
 * Colon.
 */

rule('punctuation.colon')
  .match(':', value);

/**
 * Semicolon.
 */

rule('punctuation.semicolon')
  .match(';', value);

/**
 * At symbol.
 */

rule('punctuation.at')
  .match('@', value);

/**
 * Whitespace.
 */

rule('ws')
  .match(/[\s]*/, value);