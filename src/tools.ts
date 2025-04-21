import { Tool } from "@modelcontextprotocol/sdk/types.js";

const tools : Tool[] = [
    {
      name: "calculate_sum",
      description: "Add two numbers together",
      inputSchema: {
        type: "object",
        properties: {
          a: { type: "number" },
          b: { type: "number" },
        },
        required: ["a", "b"],
      },
    },
  ];
  
export default tools;
  