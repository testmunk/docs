iOS
===

Testmunk iOS enables you to write automated functional testcases that you can run on various iOS devices with different OS versions. Our goal is that you are able to reduce your manual testing time tremendeously. Following the installation you will be able to write testcases and let them run locally on your emulator and iOS device as well as on a variety of iOS devices over the cloud in the testmunk device lab.

Installation
------------

This section will guide you on how to prepare your environment and Xcode project for running Calabash tests on iOS apps locally, and deploy them to testmunk for testing on multiple devices. For this tutorial, we recommend you use `our sample app project <https://github.com/testmunk/TMSample/archive/master.zip>`_.

.. HINT::
	Calabash is a framework that allows you to write automated mobile application tests for iOS and Android. It provides APIs for mimicking input to the devices, and reading its output.

	What is calabash?

Prerequisites
~~~~~~~~~~~~~

You must be using a machine with Mac OS X. This machine must also have Xcode with its command line tool, and Ruby installed.

.. HINT::
	Fill this!

	How do I install Xcode and its command line tools?

.. HINT::
	Fill this!

	How do I install Ruby?


Install Calabash gem
~~~~~~~~~~~~~~~~~~~~

In order to get started with testmunk, you need to install the calabash gem. Simply open your terminal window and execute:

.. code-block:: console

	$ gem install calabash-cucumber

In case you don't have the right permissions, please execute:

.. code-block:: console

	$ sudo gem install calabash-cucumber

.. DANGER:: 
	If you are getting an error that says "clang: error: unknown argument: '-multiply_definedsuppress'", you must run these 2 commands instead:

	.. code-block:: console

		$ sudo -i

		$ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future gem install calabash-cucumber

	This error is due to deprecated arguments for the ``clang`` executable that ``gem`` calls when installing certain extensions.

	'clang error'

Installing framework in Xcode project
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Creating a new build target
***************************

1. Open the testmunk sample project in Xcode.
2. Select the project document on the side bar.
3. Right clic your target in the list of targets. If you do not see the list of targets, you need to press this button '>'. *******TODO******
4. From the dropdown menu, select "Duplicate".
5. Rename the new target from "TestmunkDemo copy" to "TestmunkDemo-tm".
6. Click in the toolbar where it says TestmunkDemo, and from the dropdown menu, select "Manage Schemes".
7. Rename the new scheme from "TestmunkDemo copy" to "TestmunkDemo-tm" and press OK.
8. Click on "Build Settings" and set the "Product Name" to "TestmunkDemo-tm"

.. HINT::
	You want to build your app with the Calabash framework only if you are building your app for testing purposes. That is why we are setting up a target specifically for running tests.

	Why are we creating a new build target?

Link the Calabash framework
***************************

1. Open terminal and run ``calabash-ios download`` to download the latest ``calabash.framework`` file.
2. Drag ``calabash.framework`` from its current location to the project's Frameworks folder in Xcode.
3. In the pop up window that appears, select `Copy items into destination group's folder (if needed)` and make sure "TestmunkDemo-tm" is the only selected target.
4. Link "TestmunkTest-tm" to the CFNetwork so that Calabash can communicate with your app and trigger the tests. Select the "TestmunkTest-tm" target, go to "Build Phases", and in the "Link Binary With Libraries" section, make sure that ``calabash.framework`` is present, and click '+' to add ``CFNetwork.framework``.

Configure the bulid target
**************************

1. Select "Build Settings"
2. Change the filter from "Basic" to "All"
3. Make sure that "Other Linker Flags" contains: ``-force_load "$(SRCROOT)/calabash.framework/calabash" -lstdc++``

Test the configuration
**********************

Launch your application. You should be getting console output similar to this::

	2014-05-30 16:08:07.882 TestmunkDemo-tm[3088:60b] Creating the server: <LPHTTPServer: 0xa0970d0>
	2014-05-30 16:08:07.883 TestmunkDemo-tm[3088:60b] Calabash iOS server version: CALABASH VERSION: 0.9.169
	2014-05-30 16:08:07.889 TestmunkDemo-tm[3088:60b] Started LPHTTP server on port 37265
	2014-05-30 16:08:08.810 TestmunkDemo-tm[3088:1903] Bonjour Service Published: domain(local.) type(_http._tcp.) name(Calabash Server)



