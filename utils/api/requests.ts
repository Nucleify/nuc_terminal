import type { ArtisanResponseInterface } from 'nucleify'
import { apiRequest } from 'nucleify'

const TERMINAL_URL = '/terminal'

export async function sendTerminalCommand(command: string): Promise<string> {
  try {
    const response = await apiRequest<ArtisanResponseInterface>(
      TERMINAL_URL,
      'POST',
      { command }
    )
    const output = 'data' in response ? response.data.output : response.output

    return output
  } catch (error) {
    return `Error: Could not run terminal command\n${error}`
  }
}
