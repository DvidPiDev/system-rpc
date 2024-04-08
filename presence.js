// silly little compute device resources and temp thingy for discord! >.<

const id = ''; // change this to your app's client id
const refreshEvery = 1000; // this is how often the stats update in milliseconds

const discordrpc = require('discord-rpc');
const rpc = new discordrpc.Client({ transport: 'ipc' });
const si = require('systeminformation');
discordrpc.register(id);

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

        rpc.setActivity({
            details: `CPU: ${cpuTemp.main} ˚C - ${cpuUtil.speed} GHz`, // CPU: 0°C - 0 GHz
            state: `RAM: ${memory.toFixed(2)} GB - Processes: ${processes.all}`, // RAM: 0.00 GB - Processes: 0
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
    }, refreshEvery);
});

rpc.login({ clientId: id }).catch(err => console.error(err));
