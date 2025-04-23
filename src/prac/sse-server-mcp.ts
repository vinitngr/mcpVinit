import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import cors from "cors";

const server = new McpServer({
  name: "example-server",
  version: "1.0.0"
});
const app = express();
app.use(cors());
server.tool(
  "my-details",
  "this tool shows my name and profession",
  {
    name: z.string(),
    profession: z.enum(["developer", "designer", "manager"]),
  }, //the input parameters for the tool , use zod to define the input parameters
  async ({name , profession}) => {
    return {
      content: [{
        type: "text",
        text: `my name is ${name} and i am a ${profession}`,
      }]
    };
  }
);

const transports = new Map<string, SSEServerTransport>();

app.get("/sse", async (_: Request, res: Response) => {
  const transport = new SSEServerTransport('/messages', res);

  const sessionId = transport.sessionId;
  transports.set(sessionId, transport);

  res.on("close", () => {
    transports.delete(sessionId);
  });

  await server.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
  const sessionId = req.query.sessionId as string;
  const transport = transports.get(sessionId);
  if (transport) {
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(3001 , () => {
  console.log("Server is running on port 3001");
});


//client
// {
//     "servers": {
//         "test-server": {
//             "type": "sse",
//             "url": "http://localhost:3001/sse"
//        }
//     }
// },