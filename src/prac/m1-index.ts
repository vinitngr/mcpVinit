#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import z from "zod";

const server = new McpServer({
  name: "vinit-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "my-details",
  "this tool shows my name and profession",
  {}, //the input parameters for the tool , use zod to define the input parameters
  async ({}) => {
    return {
      content: [{
        type: "text",
        text: "my name is vinit Nagar and i am a developer",
      }]
    };
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.warn("Minimal MCP Server running on stdio - m1 running");
}

main()