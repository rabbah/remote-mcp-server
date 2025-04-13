import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'
import { z } from 'zod'
import {
  FLOWS_API_BASE,
  toolCallError,
  toolCallJson,
} from './utils/constants.js'
import { getRequest } from './utils/request.js'

const ActionInputSchema = z.object({})

const ActionOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['personal', 'team']),
  visibility: z.enum(['personal', 'team', 'public', 'partner']),
  createdBy: z.string(),
})

type ActionInputType = z.infer<typeof ActionInputSchema>
type ActionOutputType = z.infer<typeof ActionOutputSchema>

export function addTool(server: McpServer) {
  server.tool(
    'Postman_Get_All_Workspaces',
    'Get all Postman Workspaces',
    ActionInputSchema.shape,
    action,
  )
}

async function action({}: ActionInputType): Promise<CallToolResult> {
  const api = `${FLOWS_API_BASE}/get-workspaces`
  const response = await getRequest<ActionOutputType[]>(api)
  return response
    ? toolCallJson(response)
    : toolCallError('Failed to retrieve Postman workspaces')
}
