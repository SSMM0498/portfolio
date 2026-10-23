import { initializePostHogLogCapture } from '~~/server/utils/posthog-log-capture'

export default defineNitroPlugin((nitroApp) => {
  const runtimeConfig = useRuntimeConfig()
  const projectToken = runtimeConfig.public.posthog.publicKey
  const host = runtimeConfig.public.posthog.host

  if (!projectToken || !host) {
    if (import.meta.dev) {
      const missingVariable = !projectToken
        ? 'NUXT_PUBLIC_POSTHOG_PROJECT_TOKEN'
        : 'NUXT_PUBLIC_POSTHOG_HOST'

      throw new Error(
        `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
      )
    }

    return
  }

  const provider = initializePostHogLogCapture(projectToken, host)
  nitroApp.hooks.hook('close', () => provider.shutdown())
})
