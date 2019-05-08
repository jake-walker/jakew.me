---
title: Raspberry Pi PVR
date: 2014-10-26 20:59:00
tags: raspberry-pi
description: "[OLD] Creating a digital TV recorder and viewer with a Raspberry Pi and OpenELEC."
---
> This post is quite old, so the formatting insn't as fabulous as some of my newer posts.

In this project I used a Raspberry Pi (I used a model B) with OpenELEC on the SD card, a USB TV Receiver and a cheap Indoor Ariel to create a PVR.

These instructions were done on Windows.

This is what I did: I burnt OpenELEC on the SD card. I got the OpenELEC diskimage build from here and I followed the instructions to install fromhere. Once I was done I plugged in a monitor, keyboard and mouse into the Pi and booted it up. Once I was on the Main Menu I went to the Add-on Menu in Settings and got two add-ons: TVheadend (which I found under Get Add-ons > services) and TVheadend HTSP Client (which I found under Disabled Add-ons > PVR Clients). Once I had done that I went into the TVheadend configuration interface on my laptop which was at: `http://[Pi IP]:9981`. Then I went to the Configuration > TV Adapters menu. Then I selected the dropdown menu and selected my TV receiver and then I clicked the ‘Add DVB Network by Location’ button. I selected where my closest TV repeater was and clicked the 'Add DVB network’ button at the bottom of the menu. At the side there is some text. Under the 'Muxes awaiting initial scan:’ heading there is a number and I waited for it to go to 0. It took a couple of minutes. After it had finished I clicked the 'Map DVB services to channels’ button and opened the console at the bottom. After it looked like it was finished I configured the frontend. On OpenELEC I went to Settings > Live TV and checked the 'Live TV Enabled’ option.

I have added a hard drive to record to. It has a USB connection to the raspberry Pi. I have had lots of power issues but got there in the end. Also I have brought the MPEG2 codec to decode the video. I have to wait for a reply from the raspberry Pi team...