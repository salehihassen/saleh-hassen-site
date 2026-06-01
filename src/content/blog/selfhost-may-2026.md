---
title: My Self hosting setup, May 2026
publishDate: 2019-10-02 00:00:00
img: ../../resources/shipping-containers.jpg
img_alt: Soft pink and baby blue water ripples together in a subtle texture.
description: |
  What services I run on my machines and what I'll likely expand into.
tags:
  - Infra
--- 

# Why do I like self hosting?

I prefer Open-Source Software (OSS) and self-hosting since I can control where my data and services live. If I'm dependent on a service, then I want to decide when I upgrade it, including any changes in terms of service affecting my use. If the service no longer serves my interest or maintained, then I can decide how to migrate my data and dependencies.

I'm still dependent on several services I can't self host or aren't OSS, but my hope is to minimize the rug pulls I'm susceptible to while meeting my needs. Once I'm no longer experimenting with a service and relying on it, I try to make regular contributions. I hope once you're dependent on a service, you do the same to keep the service maintained, instead of looking at OSS as the "free" or "cheap" solution.

# My Machines

## NAS

My Network Attached Storage (NAS) at home is several Ironwolf hard disk drives (HDDs) pooled together using [mergerfs](https://github.com/trapexit/mergerfs) and [snapraid](https://www.snapraid.it/) to appear as 1 filesystem w/ parity support similar to RAID. The reason why I went with snapraid over traditional RAID is that if a data loss event occurs (more drives lost than parity drives), I can still recover some files since the storage is partitioned on the file level over the block level.

On my NAS I self host:
- [Immich](https://immich.app/) for backing up my photos on my phone.
- [Kiwix](https://kiwix.org/en/) for offline copies of wiki sites.
- [Samba](https://www.samba.org/samba/donations.html) fileshare to access stored files such as backups remotely.
- [Jellyfin](https://jellyfin.org/) to host my media: Movies, TV Shows, and Music. I use Finamp to listen to my music library on my phone even if I'm not connected to the same LAN as my NAS.
- [Calibre](https://calibre-ebook.com/download) digital manager and library for books. When I installed Calibre, I installed it on my NAS directly but I do eventually want to migrate this to a docker container.

For now these services have been stood up as docker containers using docker compose with manual fetching of image updates.

## Home server

I have a small mini pc that hosts a few services:

- [Pgadmin](https://www.pgadmin.org/) and [postgres](https://www.postgresql.org/) to host and manage small databases for experimental apps.
- [Home Assistant](https://www.home-assistant.io/) for smart home automations with several Kasa, Zigbee, Z-Wave devices at home.
- [zwave-js-ui](https://github.com/hassio-addons/app-zwave-js-ui) (formerly Zwavejs2mqtt) as a communication broker for Home assistant to interact with Z-Wave devices. 
- [Fork](https://github.com/salehihassen/web-app-countdown) of a Countdown timer web app to provide a live countdown until a specific event. 

## Old laptop

I'm experimenting with Virtual machines on [Proxmox](https://www.proxmox.com/en/) using an old laptop. This laptop has a wired connection to my LAN and added to my Tailscale network. The only active VM for now is NixOS to confirm my NixOS configs for my laptop are easy to transfer and setup on a new device.

## M4 Mac Mini

I have a 24 GB M4 mini on my desk for local hosting of small language models (SLMs). I've used llama-server from [llama.cpp](https://github.com/ggml-org/llama.cpp) with it but have largely relied on cloud models and subscriptions for most use cases now (chat, search, coding harness, data extraction).

## Remote VPS

I also rent a small VPS from a cloud provider that hosts a few services via docker compose. These services I want to access not only from a machine in my trusted Tailscale network, but publicly too.

- [Nextcloud AIO](https://nextcloud.com/all-in-one/) for Google drive like file share and backing up contacts. I used to use Nextcloud's calendar, tasks, and photos too. 
- [Caddy](https://caddyserver.com/) is a web server w/ automatic HTTPS and TLS cert renewal to manage websites.


# Networking & Backups

All of my instances are connected together to a private subnet with [Tailscale](https://tailscale.com/). While I'm away from home, if the server is still online and connected to Tailscale, I can still reach the above services from a trusted device.

I also have a cron job every night to run `snapraid sync` to update parity drives with the new state of my pooled storage and to report back on sync success and drive metrics to my Slack workspace.

I also finally stopped putting off automating the backups of the subset of data I really want to avoid losing to Backblaze B2 (Images, most postgres DBs, etc.). This cron job runs a bash script [(example)](https://gist.github.com/salehihassen/38f2dc720207a8aedb59c789e37e04b7) twice a week prior to the snapraid sync operation.

# Future Changes

I want to host a few more services for myself:
- [Prometheus](https://prometheus.io/) for monitoring real time metrics of my servers.
- [Grafana](https://grafana.com/) for visualizations of my server and services metrics.
- [Portainer](https://www.portainer.io/) for a web UI to manage and monitor my servers.
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden) for self hosting my password manager. Likely will avoid making it accessible outside of my tailscale network and stick with Bitwarden for managing my passwords and passkeys outside of my tailnet.

Other changes:
- Docker swarm to orchestrate my servers across my small cluster of servers, assigning labels to keep stateful services on the same machine. 
- I would love to run a local model that can integrate well with an AI coding harness. So far I've tried a couple of models with OpenCode (Devstral small 24B and qwen 2.5 Coder 14B).
- Migrate Zwave integration of home automation server to z-wave-js-ui or direct integration with Home Assistant.
- Experiment more with Linux VMs at home using Proxmox.
- Migrate my [Calibre](https://github.com/linuxserver/docker-calibre) to a docker container managed like the above services.


# Learn More
- Initially inspired by [The Nomad Code](https://thenomadcode.tech/mergerfs-snapraid-is-the-new-raid-5) and several others' posts
- I was inspired to share a blog post of my setup by [AsianDadEnergy's substack](https://asiandadenergy.substack.com/p/stop-paying-for-subscriptions-build)
