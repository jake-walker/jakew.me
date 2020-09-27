---
title: Installing a Custom ROM onto the 5th Generation Kindle Fire
date: 2015-12-27 17:36:55
tags:
  - kindle-hacking
description: "Installing a custom Android version onto the 5th Generation Kindle Fire"
---
After playing with my Kindle for a few weeks, I thought how much bloatware was installed and how locked down the device was. I then decided to install a custom ROM.

# Prep
* **Fastboot and ADB**. You may already have this installed but it is very simple to install from scratch. Use this guide written by Lifehacker http://goo.gl/SLpJXX.
* **ROM Image**. You will need to get this from https://goo.gl/UMaqln. Put this (don’t unzip it) onto an SD card in your Kindle.
TWRP (Recovery) Image. You will need to get this from https://goo.gl/AfVCun.
* **Google Apps (gapps)**. You will need to download a version from the list here https://goo.gl/6AKGhp. It is recommended that you download the mini version (I downloaded Slim_mini_gapps.BETA.5.1.build.0.x-20151215.zip, however, it will be most likely outdated so make sure you get the latest. Put this (don’t unzip it) onto an SD card in your Kindle.

# Booting into Recovery
* Once you have downloaded and installed Fastboot and ADB, you will need to plug the Kindle Fire into your Desktop/Laptop and fire up a command prompt.
* Navigate to where you have saved the TWRP Image using `cd` (for Windows) and `ls` (for Linux).
* Turn off the kindle and press down volume button and the power button until there is a little message on the screen saying Fastboot Mode (not Recovery Mode) OR type in the shell adb shell reboot bootloader.
Type in the shell `fastboot boot TWRP_Fire_2.8.7.0_adb.img`

# Installing the ROM
Now you should be in recovery. There should be some buttons on the screen.

* Press the Wipe button and swipe the arrow across to initiate the wipe (make sure you wipe dalvik cache, data, cache and system).
Go back to the main menu and press Install and find the ROM Image. Flash it and when successful go back to the Main Menu and flash Google Apps.
* Reboot (to System)

You should boot up and find a setup menu. I have found some apps won’t install from the Google Play Store (I found Inbox (by Gmail) and Amazon Shopping don’t work), however, if you sideload these apps they work fine.