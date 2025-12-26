import type { ArtisanResponseInterface } from 'atomic'
import { apiRequest } from 'atomic'

export async function sendArtisanCommand(
  artisanCommand: string
): Promise<string> {
  try {
    const response = await apiRequest<ArtisanResponseInterface>(
      apiUrl() + '/artisan',
      'POST',
      { command: artisanCommand }
    )

    return response.output
  } catch (error) {
    return `Error: Could not execute artisan command\n${error}`
  }
}
