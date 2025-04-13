import app from "./app";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import OAuthProvider from "@cloudflare/workers-oauth-provider";
import * as WorkspaceTool from './flows/workspaces.js'

export class MyMCP extends McpAgent {
	server = new McpServer({
		name: "Demo",
		version: "1.0.0",
	});

	async init() {
    WorkspaceTool.addTool(this.server)
	}
}

// Export the OAuth handler as the default
export default new OAuthProvider({
	apiRoute: "/sse",
	// TODO: fix these types
	// @ts-ignore
	apiHandler: MyMCP.mount("/sse"),
	// @ts-ignore
	defaultHandler: app,
	authorizeEndpoint: "/authorize",
	tokenEndpoint: "/token",
	clientRegistrationEndpoint: "/register",
});
