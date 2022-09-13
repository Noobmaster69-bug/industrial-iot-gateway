# Setup gateway

## Connect to Moxa gateway

**On your linux computer**

1. Install minicom:
   ```bash
   sudo apt install minicom
   ```
2. Connect Moxa getway console port to computer
3. Find path to serial port
   ```bash
   sudo dmesg -wH
   ```
4. Config minicom
   ```bash
   sudo minicom -s
   ```
5. Select `Serial port setup`

6. Setup parameters

   Setup parameters like this table

   | Serial Console Settings |            |
   | :---------------------- | :--------- |
   | Baudrate                | 115200 bps |
   | Parity                  | None       |
   | Data bits               | 8          |
   | Stop bits               | 1          |
   | Flow Control            | None       |
   | Terminal                | VT100      |

7. Save setup as dfl
8. Exit from minicom
9. Access to console port
   ```bash
   sudo minicom
   ```
10. Login

    **User:** moxa

    **Password:** moxa

## Config ip address

1. Open configuration file

   ```bash
   sudo nano /etc/network/interfaces
   ```

2. Change parameters:

   | Parameter | Description              | Example         |
   | :-------- | :----------------------- | :-------------- |
   | address   | gateway static ip        | `192.168.1.127` |
   | netmarks  | subnet mark.             | `255.255.255.0` |
   | network   | first address network.   | `192.168.1.0`   |
   | broadcast | last address of network. | `192.168.1.255` |
   | gateway   | default gateway ip.      | `192.168.1.1`   |

   Note: If you don't know what to do with these things, just follow the example

3. Restart Network Service
   ```bash
   sudo systemctl restart networking
   ```
4. Test
   ```bash
   ping 8.8.8.8
   ```
   If ping not working, go back to step 1

## Allow non-root user access serialport

1. Add user to dialout group
   ```bash
   sudo usermod -a -G dialout $USER
   ```
2. Reboot
   ```bash
   sudo reboot
   ```

## Change default uart mode

1. Create mx-uart-ctl
   ```bash
   sudo ln -s /sbin/mx-uart-ctl /usr/local/bin/
   ```
   Warning: `mx-uart-ctl` will available to run as a non-root user
2. Create startup script
   ```bash
   echo '#!/bin/sh' | sudo tee -a /usr/local/bin/startup.sh
   echo 'mx-uart-ctl -p 0 -m 1' | sudo tee -a /usr/local/bin/startup.sh
   ```
3. Allow startup.sh run directly from terminal
   ```bash
   sudo chmod +x /usr/local/bin/startup.sh
   ```
4. Create gateway service

   ```bash
    echo '[Unit]' | sudo tee -a /lib/systemd/system/gateway.service
    echo 'Description=Enable RS485 2-W Mode' | sudo tee -a /lib/systemd/system/gateway.service
    echo 'After=uc2100-base-system.service' | sudo tee -a /lib/systemd/system/gateway.service
    echo | sudo tee -a /lib/systemd/system/gateway.service
    echo '[Service]' | sudo tee -a /lib/systemd/system/gateway.service
    echo 'Type=oneshot' | sudo tee -a /lib/systemd/system/gateway.service
    echo 'ExecStart=/bin/bash startup.sh' | sudo tee -a /lib/systemd/system/gateway.service
    echo | sudo tee -a /lib/systemd/system/gateway.service
    echo '[Install]' | sudo tee -a /lib/systemd/system/gateway.service
    echo 'WantedBy=multi-user.target' | sudo tee -a /lib/systemd/system/gateway.service
   ```

5. Enable service on boot
   ```bash
   sudo systemctl enable gateway
   ```
6. Reboot
   ```bash
   sudo reboot
   ```

## Update glibc and glibcxx:

1. Check for glibc version
   ```bash
   ldd --version
   ```
2. Change source list

   ```bash
   sudo nano /etc/apt/sources.list
   ```

   Replace all `stretch` to `bullseye`

3. Update and install libc6
   ```bash
   sudo apt update
   sudo apt install libc6/bullseye libstdc++6/bullseye -y
   ```
   Some service ask for restart during installation process. Just choose yes
4. [!Importance] Change source list

   ```bash
   sudo nano /etc/apt/sources.list
   ```

   Replace all `bullseye` to `stretch`

   ```bash
   sudo apt update
   ```

# Deloying

**From your computer**

## Build project

```bash
npm run build
```

## Copy executable file to target

```bash
scp ./dist/modbus [target-username]@[target-ip]:[target-location]
```

## SSH and test

**SSH and forwarding port to localhost**

```bash
ssh -L 33334:locaslhost:33334 [target-username]@[target-ip]
```

```
cd [target-location]
./modbus
```

**Use postman or curl or browser from your computer**

1. Check application status

   **_URL:_**

   ```http
   GET http://localhost:33334/status/
   ```

2. Check serial port
   **_URL:_**

   ```http
   GET http://localhost:33334/RTU/Serialport
   ```

## Add appliaction to startup script

```bash
    echo '[Unit]' | sudo tee -a /lib/systemd/system/core.service
    echo 'Description=Core Service' | sudo tee -a /lib/systemd/system/core.service
    echo 'After=uc2100-base-system.service' | sudo tee -a /lib/systemd/core.service
    echo | sudo tee -a /lib/systemd/system/core.service
    echo '[Service]' | sudo tee -a /lib/systemd/system/core.service
    echo 'Type=simple' | sudo tee -a /lib/systemd/system/core.service
    echo 'ExecStart=/home/moxa/core' | sudo tee -a /lib/systemd/system/core.service
    echo | sudo tee -a /lib/systemd/system/core.service
    echo '[Install]' | sudo tee -a /lib/systemd/system/core.service
    echo 'WantedBy=multi-user.target' | sudo tee -a /lib/systemd/system/core.service
```

```bash
    echo '[Unit]' | sudo tee -a /lib/systemd/system/mqtt.service
    echo 'Description=Up Service MQTT' | sudo tee -a /lib/systemd/system/mqtt.service
    echo 'After=uc2100-base-system.service' | sudo tee -a /lib/systemd/mqtt.service
    echo | sudo tee -a /lib/systemd/system/mqtt.service
    echo '[Service]' | sudo tee -a /lib/systemd/system/mqtt.service
    echo 'Type=simple' | sudo tee -a /lib/systemd/system/mqtt.service
    echo 'ExecStart=/home/moxa/mqtt' | sudo tee -a /lib/systemd/system/mqtt.service
    echo | sudo tee -a /lib/systemd/system/mqtt.service
    echo '[Install]' | sudo tee -a /lib/systemd/system/mqtt.service
    echo 'WantedBy=multi-user.target' | sudo tee -a /lib/systemd/system/mqtt.service
```

```bash
    echo '[Unit]' | sudo tee -a /lib/systemd/system/modbus.service
    echo 'Description=Down Service MODBUS' | sudo tee -a /lib/systemd/system/modbus.service
    echo 'After=uc2100-base-system.service' | sudo tee -a /lib/systemd/modbus.service
    echo | sudo tee -a /lib/systemd/system/modbus.service
    echo '[Service]' | sudo tee -a /lib/systemd/system/modbus.service
    echo 'Type=simple' | sudo tee -a /lib/systemd/system/modbus.service
    echo 'ExecStart=/home/moxa/modbus' | sudo tee -a /lib/systemd/system/modbus.service
    echo | sudo tee -a /lib/systemd/system/modbus.service
    echo '[Install]' | sudo tee -a /lib/systemd/system/modbus.service
    echo 'WantedBy=multi-user.target' | sudo tee -a /lib/systemd/system/modbus.service
```
