Android
=======

Testmunk android enables you to write automated functional testcases that you can run on various android devices with different OS versions. Our goal is that you are able to reduce your manual testing time tremendeously. Following the installation you will be able to write testcases and let them run locally on your emulator and android device as well as on a variety of android devices over the cloud in the testmunk device lab.

Installation
------------

Install Calabash gem
~~~~~~~~~~~~~~~~~~~~

In order to get started with testmunk, you need to install the calabash gem. Simply open your terminal window and execute:

.. code-block:: console

	$ gem install calabash-android

In case you don't have the right permissions, please execute:

.. code-block:: console

	$ sudo gem install calabash-android

.. HINT::
	What is calabash?

.. WARNING:: 
	If you are getting an error that says "clang: error: unknown argument: '-multiply_definedsuppress'", you must run these 2 commands instead:

	.. code-block:: console

		$ sudo -i

		$ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future gem install calabash-android

	This error is due to deprecated arguments for the `clang` executable that `gem` calls when installing certain extensions.

Download and Install Android SDK
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Android SDK is the essential tool to build Android apps; by downloading it you will have access to a few tools that you need to test the app.

`Download the latest Android SDK <https://developer.android.com/sdk/index.html>`_

After your download please copy paste both folders (sdk and eclipse) into your Applications folder.

Configure Bash profile
~~~~~~~~~~~~~~~~~~~~~~

The Bash profile .bash_profile is a hidden file in your personal folder that you will need to configure for your Android SDK. After having moved the sdk and eclipse folder in your Applications folder, you can copy paste the following 2 lines into your .bash_profile::

	export ANDROID_HOME=/Applications/sdk 
	export PATH=$PATH:$ANDROID_HOME:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/add-ons

After you have configured your bash profile, please close all terminal windows to affect your changes.

.. HINT::
	What is a .bash_profile?

Plug in your Android device

After you have plugged in your android device into your mac, open a new terminal window and execute:

.. code-block:: console

	$ adb devices

You should see output similar to the following, which confirmes that your device was recognized::

	List of devices attached
	605A000600000001015F3E001200C00B     device

In case you don't see any output please confirm that you activated the "USB debugging" mode for your device. You can activate it by going to "Settings".

VIDEO HEREEEEEEE

Writing testcases
-----------------

After you have downloaded the files open a new terminal window and navigate via cd to the TestmunkAndroidDemo folder that you just downloaded. Then execute:

.. code-block:: console

	$ calabash-android run TestmunkTest_debug.apk --verbose

.. WARNING::
	If this command returns an error that says "No keystores found. Please create one or run calabash-android setup to configure calabash-android to use an existing keystore," then, run the following commands before continuing:

	.. code-block:: console

		$ keytool -genkey -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"

		$ calabash-android run TestmunkTest_debug.apk


You should get prompted to resign the app. Follow the terminal instructions to resign the app. After resigning please again execute:

.. code-block:: console

	$ calabash-android run TestmunkTest_debug.apk --verbose

After a minute or two the app should get launched on your device and our sample testcases should get executed. It will ca. 3-5 min for the testcases to get completed, you can also exit the terminal to stop the testrun. Simply enter `exit` into the terminal.

In the following we'd like to show you how you can easily write your own testcase.

Inspect app for elements
~~~~~~~~~~~~~~~~~~~~~~~~

Please tap on the app on your device so that it is launched. Open a new terminal window and execute:

.. code-block:: console

	$ uiautomatorviewer

On the newly opened window, please click on the device icon on the upper left corner to get an actual screenshot from the device.


IMAGE HEREEEEE

This inspection is important to identify the right elements that you later will need for your testcases. For example the `resource_id` is needed when you use the teststep `Then I touch view with id...`. 

.. IMPORTANT::
	If you use an Android version lower than API level 18 / Jelly Bean you will not be able to interact with the `resource-id` of the element.

VIDEO HEREEE

A more advanced way of inspecting elements on the view is using the console. While your app is running on the device, open a new terminal window and enter:

.. code-block:: console
 
	$ calabash-android console TestmunkTest_debug.apk
 
and then enter these commands:

.. code-block:: console
 
	> start_test_server_in_background

	> query "android.view.View"
 
You should see all elements on the view.

Writing testcases
~~~~~~~~~~~~~~~~~

Within the sample app that you just downloaded, please open the `my_first.feature` file within the `feature` folder. These are some sample testcases that we scripted for a demo application. One testcase looks like this:

.. code-block:: cucumber

	Feature: Testapp V.1.2

	Scenario: 1) Going to next screen and back
		When I enter "Something" into input field number 1
		Then I press the "See details" button
		Then I wait
		Then I should see text containing "Something"
		Then I go back
		Then I should see text containing "test app"
	

In order to write a second testcase write a new testscenario. For example:

.. code-block:: cucumber

	Scenario: 1) Going to next screen and back
		When I enter "Something" into input field number 1
		Then I press the "See details" button
		Then I wait
		Then I should see text containing "Something"
		Then I go back
		Then I should see text containing "test app"

	Scenario: 2) Clear the input field
		When I enter "Something" into input field number 1
		Then I clear input field number 1
		Then I press the "See details" button
		Then I should not see "Something"

In case you were wondering where these steps come from, have a look at the `teststep` library. These are all steps that you can be using right away. In case you'd like to extend and write your own steps, have a look into the .rb file in the `step_definitions` folder and the Calabash Ruby API.

Ruby API
--------

--- there has to be an explanation about the ruby api -- 

High level explanation

-- detailed explanation --

video on how to use the console

Running testruns
----------------

General
~~~~~~~

Testmunk Android enables you to run your testcases on:
 1. the virtual emulator
 2. on your plugged in Android device
 3. on a variety of Android devices with different OS versions in the testmunk device lab.

Running locally on the emulator
-------------------------------

Go to applications and start "Eclipse". In the menu bar click click on `Window > Android Virtual Device Manager` and create an emulator you want to test on.

VIDEO HEREEEEEE

Running on your local device
----------------------------

Ensure that your device is being recognised by starting a terminal window and executing adb devices.
 
In order to run your tests on your device, please navigate via `cd` to your project folder and execute:

.. code-block:: console
 
	$ calabash-android run sample.apk --verbose
 
Your testrun should get executed on your device. It's important that you use an apk file that is in debug mode.

Running on multiple android devices
-----------------------------------

In order to run your testcases on testmunk's devices and see a report with your test results and screenshots, simply create an account, upload your apk file and testcases.

VIDEO HEREEEEE