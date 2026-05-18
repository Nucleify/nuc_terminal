import { readBody } from 'h3'

import {
  apiMethodNotAllowed,
  apiNotHandled,
  apiOk,
  fromSupabaseError,
  requireGatewayUser,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult, Json } from 'nuc_server'

import { executeTerminalCommand } from './execute_terminal_command'

export async function handleTerminalApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'terminal' && ctx.segments[0] !== 'artisan')
    return apiNotHandled()
  if (ctx.method !== 'POST') return apiMethodNotAllowed()

  const auth = await requireGatewayUser(ctx)
  if ('handled' in auth) return auth

  const body = (await readBody(ctx.event)) as Json
  const command =
    body && typeof body === 'object' && 'command' in body
      ? String((body as Record<string, unknown>).command ?? '')
      : ''

  try {
    const output = await executeTerminalCommand(
      ctx.supabase,
      auth.user,
      command
    )
    return apiOk(ctx, { output })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    return fromSupabaseError({ message: msg })
  }
}
