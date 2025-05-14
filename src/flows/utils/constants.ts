import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

export const FLOWS_API_BASE = 'https://macho-dropkick-stun.flows.pstmn.io/api/default'

export function toolCallError(msg?: string): CallToolResult {
    return {
        content: [
            {
                type: 'text',
                text: msg || 'An error occurred while processing your request.',
            },
        ],
        isError: true,
    }
}

export function toolCallText(str: string): CallToolResult {
    return {
        content: [
            {
                type: 'text',
                text: str,
            },
        ],
    }
}

export function toolCallJson(json: object): CallToolResult {
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(json, null, 2),
            },
        ],
    }
}
