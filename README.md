# Table of Content

## Introduction

In industrial enviroment, there are many devices with many protocols need to collect data, an IoT Gateway require to read all of them and programmer have to update code to support all of protocols.

This software is design in microservice achitechture to help programmer can easily "attach" new protocol support feature to existing program by running new protocol program in a new process and register them to the `Core` service.

## Feature

- Supported devices protocol:

  - Modbus RTU
  - Modbus TCP

- Supported cloud protocol:

  - MQTT
  - HTTP/HTTPS

- Other feature:

  - Web UI
  - User management
  - Devices management
  - Devices template
  - Microservice management

- Supported microservice IPC protocol:

  - HTTP/HTTPS

## Unfinished feature

<!-- - Supported devices protocol:

- Supported cloud protocol:

- Other feature: -->

- Microservice IPC protocols:
  - Unix socket
  - TCP socket
  - Redis pub/sub

## Supported devices and requirement

Every devices can run Ubuntu 18.04.6 LTS or later and other equivalent Linux distro.
