require('dotenv').config();
const env = process.env;
import rpc from 'discord-rpc';
import { createServer, ServerResponse } from 'http';
const client = new rpc.Client({ transport: 'ipc' })

client.on("ready", () => {
    client.setActivity(GetDefaultStatus());

    const server = createServer((request, response) => {    
        request.on('data', (chunk: ArrayBuffer) => {
            const request_JSON = JSON.parse(chunk.toString());

            if (request_JSON.closing == false && request_JSON.AppName != undefined) {
                client.setActivity({
                    state: request_JSON.AppName,
                    details: `${request_JSON.AppName}をプレイ中`,
                    smallImageKey: GetAppShortName(request_JSON.AppName),
                    startTimestamp: new Date(),
                }).catch(((error : Error)=>{
                    ErrorResponce(response);
                    return;
                }));

                console.log(`Set RPC to : ${request_JSON.AppName}`);

                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                const responseMessage = { 'message': `Set RPC to : ${request_JSON.AppName}` };
                response.end(JSON.stringify(responseMessage));
            }
            else{
                client.setActivity(GetDefaultStatus()).catch((error : Error)=>{
                    ErrorResponce(response);
                    return;
                });

                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                const responseMessage = { 'message': 'Set to default' };
                response.end(JSON.stringify(responseMessage));
            }
        });
    });

    server.listen(8080);
});

function ErrorResponce(response : ServerResponse){
    response.writeHead(201, {
        'Content-Type': 'application/json'
    });

    const responseMessage = { 'message': 'Error occured' };
    response.end(JSON.stringify(responseMessage));
}


function GetDefaultStatus(){
    const rpcstatus : rpc.Presence = {
        state: "🤔",
        details: "( ᐛ)",
    }

    return rpcstatus;
}

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