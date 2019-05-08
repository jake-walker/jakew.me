---
title: Hacking the 5th Generation Kindle Fire
date: 2015-10-04 21:05:00
tags:
  - kindle-hacking
description: "[OLD] Adding Google Apps, Rooting, Removing Bloatware and Changing the Launcher of a 5th Generation Kindle Fire"
---
> This post is quite old, so the formatting isn't as fabulous as some of my newer posts.

On Black Friday I bought a Kindle Fire (5th Gen) for £35. I decided to hack it. My main aim was to install Google Play, change the launcher and remove the bloatware, however, to achieve this I also needed to root the device.

Prerequisites: ADB and Fastboot (guide: http://goo.gl/SLpJXX), Drivers (http://goo.gl/sqJgpL)

# 1. Google Apps (no root required)
*Source: http://goo.gl/btPy9W*

* Install ES File Explorer from Amazon’s Appstore for free on the Kindle Fire.
* Open Settings > Security > Unknown Sources and check it or turn it on.
* Download the Google Core APK .zip archive here: https://goo.gl/ansjr1 to the device and find it in ES File Explorer under the internal sd card in the Downloads folder
Install each of the below in order by tapping on the particular file name in ES File Explorer. 
 * com.android.vending-5.9.12-80391200-minAPI9.apk
 * com.google.android.gms-6.6.03_(1681564-036)-6603036-minAPI9.apk 
 * GoogleLoginService.apk 
 * GoogleServicesFramework.apk
* Reboot the Kindle Fire
Open Settings > Device Options and repeatedly tap the Serial Number until it says something like “No need you are already a developer”.
Open Settings > Device Options > Developer Options and check or turn the option saying Enable ADB
* Plug the device into the computer you have ADB and Fastboot installed on.
* Open a prompt and type adb devices. If nothing show up in the list something is wrong with your drivers. If everything is correct you should get a code with numbers and letters then ‘device’ after.
* Type `adb shell pm grant com.google.android.gms android.permission.INTERACT_ACROSS_USERS`. There will be no text returned after running this
* Check if Google Play works by finding it in the apps list. If it immediately closes after opening it follow step 12 if not you’re done!
Reinstall ‘com.android.vending-5.9.12-80391200-minAPI9.apk’ in ES File Explorer.
# 2. Rooting
*Source: http://goo.gl/FQhGl0*

* Enable ADB on the Device (see section 1, steps 6 and 7)
* Download the .zip archive of all the tools used for rooting from here: http://goo.gl/wvUMgI.
* Unzip the file and plug in the Kindle Fire to your PC.
Windows: Double click root.bat and follow instructions. Linux: Open a terminal and navigate to the place you unzipped the archive and type `sh root.sh` and wait for the script to complete. The Kindle Fire will restart multiple times, don’t worry this is normal. The Kindle Fire may say Installing Firmware, this is also normal and just means it it is optimising apps.
* You should be rooted you can try this by installing a Root Checker app from the Google Play Store.
# 3. Remove Bloat (root required)
*Source: http://goo.gl/ud7HWU*

* Install an app called “System App Remover (ROOT)” from the Google Play Store.
* Remove any app in the list below by opening the app and checking the apps and tapping remove at the bottom of the app.
 * com.amazon.webapp | Bookstore
 * com.amazon.zico | Documents | 2.0_205111610
 * com.amazon.mp3 | Amazon music
 * com.android.music |Music | 10.0.51-D-20151009-NA-7
 * com.amazon.kindle.ottercom.amazon.kindle | Kindle Reader
 * com.audible.application.kindle | Audible
 * com.amazon.tahoe | FreeTime | 1.5.345.26-FreeTimeForTabletGen6_201365610
 * com.amazon.kindle.otter.oobe | Device Setup | 1.0.171.0_3337310
 * com.amazon.client.metrics | Amazon Metrics Service Application | 1.0.175.0_9610
 * com.amazon.device.backup | Amazon Backup and Restore | 5.0.410.0_5107610
 * com.amazon.platform | Amazon platform | 1.0.9.2_1009710
 * com.amazon.photos | photos FOS | 20115210 (Needed to change the wallpaper)
 * com.nuance.edr.androidservice.service
 * com.amazon.whisperlink.core.android | Whisperlinkplay Daemon | 2.0.100021.00
 * com.amazon.camera | Camera | 1.0.088.0_1002120310
 * com.amazon.csapp | Help App
 * com.amazon.legalsettings | Legal Settings App
 * com.amazon.venezia | Amazon App Store
 * com.amazon.h2settingsfortablet | Profiles & Family Library App
 * com.amazon.weather | Weather App
 * com.goodreads.kindle | Goodreads | 1.6.1+1060100710
 * com.android.calendar | Calendar App
 * com.amazon.kindle.kso	| Special Offers / Ads (lockscreen ads)
 * com.android.email | Email App
 * com.amazon.kindle.personal_video | Video App
 * com.amazon.avod | Video App
 * com.amazon.contacts | Contacts App
 * com.amazon.windowshop | Amazon Windowshop (Amazon Shopping App)
 * com.amazon.cloud9	| Silk Browser App
 * com.amazon.ags.app | Amazon Game Circle App
 * com.amazon.kindle.otter.settings	| Amazon Registration Service
* Restart the Device.
# 4. Changing Launcher (requires root)
* Make sure you have another launcher before continuing.
* Open ES File Explorer and open the side menu and open the Tools part then turn on the Root Explorer option
* Navigate to the root of the device and open the system folder then the priv-app folder [ /system/priv-app/ ]
* Copy the folder called com.amazon.firelauncher to the sdcard of the device and then go back to the priv-app folder and delete the folder you just copied. You should then end up with no folder called  com.amazon.firelauncher in the priv-app folder and a folder called  com.amazon.firelauncher in the sdcard.
* Restart the device.

---
Thanks for reading. I hope this helped you enhance your £50 Kindle Fire. I found some more articles at: http://goo.gl/cITO3g including the articles below.

* Remove Lock Screen Ads (no root required): http://goo.gl/xlxQrp

In the future I hope to install CyanogenMod when a stable release comes out.