# MCP Server

This repository contains a basic implementation of the MCP (Model Context Protocol) server. It features a server-side connection setup with lightweight and minimal tooling for running basic MCP functionality. The code is intended for practice and experimentation, with simple tools integrated for interaction with the MCP. No complex tooling or advanced features are included—just the essentials for getting started with MCP protocol integration.

<p><span style="font-weight: bold;">Note :</span> <span style="color: yellow;">🧑🏽‍💻 This project is a <em>work in progress</em> and is being actively developed.</span></p>

## Project Structure

- **`/src/prac`**: Contains the practice code files.
  - **`m1-index.ts`**: Implements MCP stdio connection setup (Method 1).
  - **`m2-index.ts`**: Implements MCP stdio connection setup (Method 2).
  - **`sse-server-mcp.ts`**: Implements MCP SSE (Server-Sent Events) connection.


## Build Command
To build the project, run the following command:
```bash
npm run build
```


connection string for-
## MCP Server Configuration

This section outlines the configuration for the MCP server setup in different configuration files (`vscode_mcp`, `claude_desktop_config.json`, and `mcp_config.json`). 

These configuration files allow you to set up and run the MCP server using the `node` command and specify the arguments needed for the correct execution of your project.

add m1-index.js server -
```JSON
{
    "mcpServers": {
        "vinit-mcp": {
            "command": "node",
            "args": ["C:\\Users\\HP VICTUS\\Desktop\\MCPVINIT\\dist\\prac\\m1-index.js"]
        },
        "vinit-mcp-2": {
            "command": "node",
            "args": ["C:\\Users\\HP VICTUS\\Desktop\\MCPVINIT\\dist\\prac\\m2-index.js"]
        }
    }
}

{
    "servers": {
        "test-server": {
            "type": "sse",
            "url": "http://localhost:3001/sse"
       }
    }
}
```
