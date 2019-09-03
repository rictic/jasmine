getJasmineRequireObj().toHaveBeenCalledWith = function(j$) {

  var getErrorMsg = j$.formatErrorMsg('<toHaveBeenCalledWith>', 'expect(<spyObj>).toHaveBeenCalledWith(...arguments)');

  /**
   * {@link expect} the actual (a {@link Spy}) to have been called with particular arguments at least once.
   * @function
   * @name matchers#toHaveBeenCalledWith
   * @since 1.3.0
   * @param {...Object} - The arguments to look for
   * @example
   * expect(mySpy).toHaveBeenCalledWith('foo', 'bar', 2);
   */
  function toHaveBeenCalledWith(util, customEqualityTesters) {
    return {
      compare: function() {
        var args = Array.prototype.slice.call(arguments, 0),
          actual = args[0],
          expectedArgs = args.slice(1),
          result = { pass: false };

        if (!j$.isSpy(actual)) {
          throw new Error(getErrorMsg('Expected a spy, but got ' + j$.pp(actual) + '.'));
        }

        if (!actual.calls.any()) {
          result.message = function() {
            return 'Expected spy ' + actual.and.identity + ' to have been called with:\n' +
              '  ' + j$.pp(expectedArgs) +
              '\nbut it was never called.';
          };
          return result;
        }

        if (util.contains(actual.calls.allArgs(), expectedArgs, customEqualityTesters)) {
          result.pass = true;
          result.message = function() {
            return 'Expected spy ' + actual.and.identity + ' not to have been called with:\n' +
              '  ' + j$.pp(expectedArgs) +
              '\nbut it was.';
          };
        } else {
          result.message = function() {
            var prettyPrintedCalls = actual.calls.allArgs().map(function(argsForCall) {
              return '  ' + j$.pp(argsForCall);
            });

            // var i;
            //
            // for (i = 0; i < Math.max(actualArgs.length, expectedArgs.length); i++) {
            //   diffBuilder.withPath(i, function() {
            //     diffBuilder.record(actualArgs[i], expectedArgs[i]);
            //   });
            // }
            //
            // return diffBuilder.getMessage();

            // return actual.calls.allArgs().map(function(argsForCall) {
            //   var diffBuilder = j$.DiffBuilder();
            //   diffBuilder.record(argsForCall, expectedArgs);
            //   return '*' + diffBuilder.getMessage();
            // }).join('\n');

            debugger;
            if (actual.calls.count() === 1) {
              return 'Expected spy ' + actual.and.identity + ' to have been called with:\n' +
                '  ' + j$.pp(expectedArgs) + '\n' + '' +
                'but the actual call was:\n' +
                prettyPrintedCalls[0] + '.';
            } else {
              var prefix = 'Expected spy ' + actual.and.identity + ' to have been called with:\n' +
                '  ' + j$.pp(expectedArgs) + '\n' + '' +
                'but actual calls were:\n' +
                prettyPrintedCalls.join(',\n') + '.';

              var actualArgs = actual.calls.argsFor(0);
              // var diffBuilder = j$.DiffBuilder();
              // util.equals(actualArgs, expectedArgs, customEqualityTesters, diffBuilder);

              // return prefix + '\n\nArgument difference: ' + diffBuilder.getMessage();

              return prefix + '\n\n' + actual.calls.allArgs().map(function(argsForCall, callIx) {
                for (var i = 0; i < Math.max(actualArgs.length, expectedArgs.length); i++) {
                  var diffBuilder = j$.DiffBuilder();
                  util.equals(argsForCall, expectedArgs, customEqualityTesters, diffBuilder);
                }
                return 'Call ' + callIx + ': ' + diffBuilder.getMessage();
              }).join('\n');
            }
          };
        }

        return result;
      }
    };
  }

  return toHaveBeenCalledWith;
};
