import get from 'lodash.get'

/* This module supports the "lambda" type integration
   for the serverless framework which provides a
   default custom mapping template.

   The sls mapping template is described here:
   https://serverless.com/framework/docs/providers/aws/events/apigateway/#example-lambda-event-before-customization
 */

// const type = 'apiGateway'
const source = 'slsIntegrationLambda'

const keys = ['body', 'method', 'principalId', 'stage']

const keysThatNeedValues = ['identity.userAgent', 'identity.sourceIp', 'identity.accountId']

function eventType(event) {
  if (typeof event === 'object') {
    const keysArePresent = keys.every((s) => s in event)
    const valuesArePresent =
      keysThatNeedValues
        .map((k) => {
          return typeof get(event, k) !== 'undefined'
        })
        .filter(Boolean).length === keysThatNeedValues.length
    return keysArePresent && valuesArePresent ? source : false
  }
  return false
}

export { eventType }
