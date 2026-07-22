import { apiRequest } from '../../nuc_api/utils/api_request'
import type { ArtisanResponseInterface } from '../types/interfaces'

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
