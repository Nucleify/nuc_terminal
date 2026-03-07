import type { ArtisanResponseInterface } from 'nucleify'
import { apiRequest } from 'nucleify'

export async function sendArtisanCommand(
  artisanCommand: string
): Promise<string> {
  try {
    const response = await apiRequest<ArtisanResponseInterface>(
      apiUrl() + '/artisan',
      'POST',
      { command: artisanCommand }
    )
    const output = 'data' in response ? response.data.output : response.output

    return output
  } catch (error) {
    return `Error: Could not execute artisan command\n${error}`
  }
}
