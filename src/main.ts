require('dotenv').config();
const env = process.env;
import rpc from 'discord-rpc';
import { createServer } from 'http';
const client = new rpc.Client({ transport: 'ipc' })

client.on("ready", () => {
    client.setActivity({
        state: "🤔",
        details: "( ᐛ)",
    });

    const server = createServer((request, response) => {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
    
        request.on('data', (chunk: ArrayBuffer) => {
            const request_JSON = JSON.parse(chunk.toString());

            if (request_JSON.closing == false) {
                client.setActivity({
                    state: request_JSON.AppName,
                    details: `${request_JSON.AppName}をプレイ中`,
                    smallImageKey: GetAppShortName(request_JSON.AppName),
                    startTimestamp: new Date(),
                });
                console.log(`Set RPC to : ${request_JSON.AppName}`);
            }
            else{
                client.setActivity({
                    state: "🤔",
                    details: "( ᐛ)",
                });
            }
        });
    
        const responseMessage = { 'message': 'OK' };
        response.end(JSON.stringify(responseMessage));
    });

    server.listen(8080);
});

function GetAppShortName(appname : string){
    let AppName = '';
    switch (appname){
        case 'パズドラ':
            AppName = 'pad'
            break;
        default:
            break;
    }

    return AppName;
}

client.login({ clientId: `${process.env.DISCORD_CLIENT_TOKEN}` }).catch(console.error);