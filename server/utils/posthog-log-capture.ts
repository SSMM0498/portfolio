import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { BatchLogRecordProcessor, LoggerProvider } from '@opentelemetry/sdk-logs'
import type { Logger } from '@opentelemetry/api-logs'

let logProvider: LoggerProvider | undefined
let posthogLogger: Logger | undefined

export function initializePostHogLogCapture(projectToken: string, host: string) {
  const exporter = new OTLPLogExporter({
    url: `${host.replace(/\/$/, '')}/i/v1/logs`,
    headers: {
      Authorization: `Bearer ${projectToken}`,
    },
  })

  logProvider = new LoggerProvider({
    resource: resourceFromAttributes({
      'service.name': 'portfolio-contact-api',
    }),
    processors: [
      new BatchLogRecordProcessor({ exporter }),
    ],
  })
  posthogLogger = logProvider.getLogger('posthog-contact-log-exporter')

  return logProvider
}

export async function capturePostHogLog(
  severityText: 'info' | 'error',
  body: string,
  attributes: Record<string, string>,
) {
  if (!posthogLogger || !logProvider) return

  try {
    posthogLogger.emit({ severityText, body, attributes })
    await logProvider.forceFlush()
  } catch {
    // Log delivery must not affect the contact form response.
  }
}
