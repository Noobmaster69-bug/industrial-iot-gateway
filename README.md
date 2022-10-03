# Table of Content

## Introduction

In the industrial environment, there are many devices with many protocols that need to collect data, an IoT Gateway requires reading all of them and programmers have to update code to support all of the protocols.

This software is designed in microservice architecture to help programmer can easily "plug" new protocol support features into the existing program by running a new protocol program in a new process and registering them to this program.

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
