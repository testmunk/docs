Android
=======

Testmunk android enables you to write automated functional testcases that you can run on various android devices with different OS versions. Our goal is that you are able to reduce your manual testing time tremendeously. Following the installation you will be able to write testcases and let them run locally on your emulator and android device as well as on a variety of android devices over the cloud in the testmunk device lab.

Installation
------------

Install Calabash gem
~~~~~~~~~~~~~~~~~~~~

In order to get started with testmunk, you need to install the calabash gem. Simply open your terminal window and execute::

	$ gem install calabash-android

In case you don't have the right permissions, please execute::

	$ sudo gem install calabash-android

.. HINT::
	What is calabash?

.. WARNING:: 
	If you are getting an error that says "clang: error: unknown argument: '-multiply_definedsuppress'", you must run these 2 commands instead::

		$ sudo -i

		$ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future gem install calabash-android

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
	What is calabash?