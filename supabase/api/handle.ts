import { readBody } from 'h3'

import type {
  ApiContext,
  ApiHandlerResult,
  Json,
} from '../../../../nuxt/server/api/_types'
import { gatewayUserFromJwt } from '../../../../nuxt/server/api/gateway_auth'
import { executeTerminalCommand } from './execute_terminal_command'

export async function handleTerminalApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  const { segments, method, supabase, ok } = ctx
  if (segments[0] !== 'terminal' && segments[0] !== 'artisan')
    return { handled: false }
  if (method !== 'POST')
    return { handled: true, status: 405, body: { error: 'Method not allowed' } }

  const auth = await gatewayUserFromJwt(supabase, ctx.event)
  if ('error' in auth)
    return {
      handled: true,
      status: auth.status,
      body: { error: auth.error },
    }

  const body = (await readBody(ctx.event)) as Json
  const command =
    body && typeof body === 'object' && 'command' in body
      ? String((body as Record<string, unknown>).command ?? '')
      : ''

  try {
    const output = await executeTerminalCommand(supabase, auth.user, command)
    return { handled: true, body: ok({ output }) }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return { handled: true, status: 500, body: { error: msg } }
  }
}
