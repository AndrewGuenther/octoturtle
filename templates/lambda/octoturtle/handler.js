/**
 * Builds a function which can be packaged for AWS Lambda
 *
 * @param  {Array}  hooks  The hooks to be evaluated when the endpoint is called.
 * @return {Function}      A function which can be put in a .zip and used as a
 *                         AWS Lambda function connected to an SNS topic.
 */
module.exports = function(hooks) {
  return function(event, context) {
    hooks.forEach(function(hook) {
      hook.eval(event['X-GitHub-Event'], event.payload);
    });
    context.succeed(event);
  };
};
