---
slug: 2016/02/29/pi-zero-impressions
title: Pi Zero Impressions
date: 2016-02-29 17:54:00
tags:
  - raspberry-pi
description: "First Impressions of the new tiny £5 Raspberry Pi Zero."
---
I brought a Raspberry Pi Zero on Friday because it was really hyped up and it was also very cheap. I brought mine from [The Pi Hut](http://thepihut.com/), I got the [Zero + Essentials Kit](http://thepihut.com/collections/raspberry-pi-zero/products/raspberry-pi-zero?variant=14062725188) variation (which costed £10.25 at the time of purchase).

## First Impressions
My first impression of the Pi Zero was that it was extremely small. The only place I had seen it is in magazines which made it look bigger. When I first booted it up it took a while making me think it was going to be quite slow but once it was booted up it seemed quite snappy (in bash/command line mode).

## Setup
* I first plugged in the HDMI adapter then a (powered) HDMI to VGA adapter as my monitor is VGA.
* Next, I plugged in my OTG cable then plugged that into a powered USB Hub which I had my keyboard, mouse and Wi-Fi dongle connected.
* Then, I inserted my microSD card which I had put [Raspbian](https://www.raspberrypi.org/downloads/raspbian/) on (I used the lite version (which has no desktop GUI) as I like to run my Pi's headless and its more fun to learn bash :))
* I plugged in the power then waited for it to boot up for the first time.
* I typed in `pi` for the username and `raspberry` for the password.
* I then expanded the filesystem to use the whole of my SD card by typing `sudo raspi-config` then selecting 'Expand Filesystem'.
* I then finished by rebooting the Pi.
* I then set up the Wi-Fi by: *(using [this](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) article)*
 * Scanning for networks using `sudo iwlist wlan0 scan` but as I already knew my Wi-Fi SSID and Password it was unnecessary. *The `ESSID` part is the SSID you need for later*
 * Opening the configuration file by typing `sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`. Then going to the bottom of the file and adding:
```conf
network={
    ssid="ssid of your network"
    psk="password of your network"
}
```
* Next, I updated the apt packages by typing `sudo apt-get update`. *You could also do `sudo apt-get upgrade` if your image is a bit old.*
* As I had no desktop, I decided to install Lynx. A web browser that can be used in the command line. You can install it by typing `sudo apt-get install lynx`. Then opening it by typing `lynx`.

Overall the Raspberry Pi Zero is great for the £5 price tag but can set  you back a little more for the adapters. It is very small so can be used for projects when a traditional Pi is too big.
