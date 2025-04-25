import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import tools from "./tools.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "vinit-mcp2",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools }
  }
);

server.setRequestHandler( CallToolRequestSchema , async (request) => {
  if (request.params.name === "calculate_sum") {
    if (!request.params.arguments) {
      throw new Error("Arguments are required");
    }
    const { a, b } = request.params.arguments as { a: number; b: number };
    return {
      content: [
        {
          type: "text",
          text: String(a + b),
        },
      ],
    };
  }
  throw new Error("Tool not found");
});


const main = async () => {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.warn("Minimal MCP Server running on stdio - m2 running");

}

main().catch((error) => {
  console.error("Failed to initialize MCP server:", error);
  process.exit(1);
});
