import { apiRequest } from 'nucleify'

import type { ArtisanResponseInterface } from '../types'

export async function sendTerminalCommand(command: string): Promise<string> {
  try {
    const response = await apiRequest<ArtisanResponseInterface>(
      apiUrl() + '/terminal',
      'POST',
      { command }
    )
    const output = 'data' in response ? response.data.output : response.output

    return output
  } catch (error) {
    return `Error: Could not run terminal command\n${error}`
  }
}

/** @deprecated Użyj `sendTerminalCommand` (Laravel artisan został zastąpiony gatewayem Supabase). */
export async function sendArtisanCommand(
  artisanCommand: string
): Promise<string> {
  return sendTerminalCommand(artisanCommand)
}
