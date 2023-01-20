
# ARP Spoofer

This is a command-line tool that allows you to perform ARP spoofing on a network. It uses the arpjs library to send spoofed ARP packets to a target IP address, effectively changing the ARP table on the target device.

## What it does
The script sends spoofed ARP packets to the target IP address with the spoof IP address as the source, effectively changing the ARP table on the target device. The script runs an infinite loop that continues to send spoofed ARP packets to the target IP address every 2 seconds. The loop is interrupted when the user presses the CTRL + C key. The script then uses the arpjs library to restore the ARP tables on the target and spoofed devices by sending ARP packets with the correct source and destination IP and MAC addresses.

## Warning
This script should be used for educational and testing purposes only as it can be used to launch a Man-in-the-Middle(MITM) attack. This type of attack can be harmful and illegal. If you use this script, you should have permission from the network administrator and all parties involved.

## Prevention
* Use a firewall to block unauthorized ARP packets
* Use ARP inspection to validate ARP packets
* Use secure protocols such as ARPsec and DHCP snooping
* Use a VPN for remote connections
* Use static ARP entries for critical devices
* Regularly check the ARP cache
* Keep the system and software up-to-date

## Disclaimer
This tool is intended for educational and testing purposes only. Using this tool without proper authorization may be illegal in some jurisdictions. Use this tool at your own risk.
