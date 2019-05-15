import _ from 'lodash'
import { getAccessKeyForTenant, getDeployProfile } from '@serverless/platform-sdk'
import { hookIntoVariableGetter } from './variables'

export const configureDeployProfile = async (ctx) => {
  const accessKey = await getAccessKeyForTenant(ctx.sls.service.tenant)
  const deploymentProfile = await getDeployProfile({
    accessKey,
    stage: ctx.provider.getStage(),
    ..._.pick(ctx.sls.service, ['tenant', 'app', 'service'])
  })
  if (deploymentProfile.providerCredentials) {
    ctx.provider.cachedCredentials = deploymentProfile.providerCredentials.secretValue
    ctx.provider.cachedCredentials.region = ctx.provider.getRegion()
  }
  ctx.safeguards = deploymentProfile.safeguardPolicies
  hookIntoVariableGetter(
    ctx,
    _.fromPairs(
      deploymentProfile.secretValues.map(({ secretName, secretProperties: { value } }) => [
        secretName,
        value
      ])
    )
  )
}