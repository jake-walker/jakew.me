---
slug: 2021/06/01/elecrow-5inch-balena
title: Using the Elecrow 5" TFT display with Balena
date: 2021-06-01 18:30:00
tags:
  - raspberry-pi
  - small
---
Balena is a really cool cloud platform for managing your IoT projects. Essentially, you can write some code, and Balena will manage your devices, keeping track of versions and automatically updating your devices.

There are a few Balena projects that make use of displays, there's lots of documentation for the official Raspberry Pi display, but for other displays it's a little hard to find the right things to change. This post should help you quickly get your Elecrow 5" TFT display working with Balena with touch support.

Under your device, go to 'Device Configuration'.

- Set 'Define DT overlays' to `"ads7846,cs=1,penirq=25,penirq_pull=2,speed=50000,keep_vref_on=0,swapxy=0,pmax=255,xohms=150,xmin=200,xmax=3900,ymin=200,ymax=3900"`
- Set 'Define a custom CVT mode for the HDMI' to `800 480 60 6 0 0 0`
- Set 'Force the HDMI hotplug signal' to on
- Set 'Define the HDMI output group' to 2
- Set 'Define the HDMI output format' to 87
- Set 'Define the rotation or flip of the display' to 0

Underneath in the 'Custom Configuration Variables' section, add the following:

| Name | Value |
| ---- | ----- |
| `BALENA_HOST_CONFIG_hdmi_drive` | `1` |
| `BALENA_HOST_CONFIG_max_usb_current` | `1` |

And that's it, wait for the changes to propogate to your device (which includes a restart) and enjoy!
