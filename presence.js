// config is in .env
require('dotenv').config();
const discordrpc = require('discord-rpc');
const rpc = new discordrpc.Client({ transport: 'ipc' });
const si = require('systeminformation');
discordrpc.register(process.env.DISCORD_ID);

async function getActivity() {
    try {
        const processes = await si.processes();
        const cpuTemp = await si.cpuTemperature();
        const cpuUtil = await si.cpu();
        const mem = await si.mem();
        const memInBytes = mem.active;

        function convertToGB(bytes) {
            return bytes / Math.pow(1024, 3);
        }

        const memory = convertToGB(memInBytes);

        await rpc.setActivity({
            details: `CPU: ${cpuTemp.main} ˚C - ${cpuUtil.speed} GHz`, // CPU: 0°C - 0 GHz
            state: `RAM: ${memory.toFixed(2)} GB - Processes: ${processes.all}` // RAM: 0.00 GB - Processes: 0
        });
    } catch (error) {
        console.error(error);
    }
}

rpc.on('ready', async () => {
    console.log('ready');
    await getActivity();
    setInterval(async () => {
        await getActivity();
    }, process.env.REFRESH);
});

rpc.login({ clientId: process.env.DISCORD_ID }).catch(err => console.error(err));
