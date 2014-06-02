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
	Download them from `here <https://itunes.apple.com/us/app/xcode/id497799835>`_!

	How do I install Xcode and its command line tools?

.. HINT::
	Your machine must have at least version 1.8.7 for Ruby to ensure compatibility for the gems we will install in the next section. By default, your Mac OS X 10.8 installation comes with Ruby 1.8.7 installed. You can check your version by running ``ruby -v`` in Terminal. If you still need to upgrade, you can try the following steps:

	1. Start Terminal. This can be found in the Applications folder -> Utilities folder.
	2. Check if you have RVM. This can be done by typing ``rvm`` into the Terminal and pressing Enter.
	3. If you do not have RVM, install RVM using the following command in Terminal: ``curl -L get.rvm.io | bash -s``
	4. If you have RVM, install a newer version of Ruby using the following command: ``rvm install 1.9.3``.
	5. Once Ruby is installed, you can verify the update using ``ruby -v`` in Terminal.

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
5. Rename the new target from "TestmunkDemo copy" to "TestmunkDemo-tm" by clicking on it and pressing Enter.
6. Click in the toolbar where it says TestmunkDemo, and from the dropdown menu, select "Manage Schemes".
7. Rename the new scheme from "TestmunkDemo copy" to "TestmunkDemo-tm" and press OK.
8. Click on "Build Settings" and under `Packaging` set the "Product Name" to "TestmunkDemo-tm"

.. HINT::
	You want to build your app with the Calabash framework only if you are building your app for testing purposes. That is why we are setting up a target specifically for running tests.

	Why are we creating a new build target?

Link the Calabash framework
***************************

1. Open terminal and run ``calabash-ios download`` to download the latest ``calabash.framework`` file.
2. Run the command ``open .``.
3. Drag ``calabash.framework`` from its current location to the project's Frameworks folder in Xcode.
4. In the pop up window that appears, select `Copy items into destination group's folder (if needed)` and make sure "TestmunkDemo-tm" is the only selected target.
5. Select the "TestmunkTest-tm" target, go to "Build Phases", and in the "Link Binary With Libraries" section, make sure that ``calabash.framework`` is present. Link the CFNetwork framework so that Calabash can communicate with your app, by clicking '+', and selecting ``CFNetwork.framework``.

Configure the bulid target
**************************

1. Select "Build Settings"
2. Change the filter from "Basic" to "All"
3. Make sure that "Other Linker Flags" contains: ``-force_load "$(SRCROOT)/calabash.framework/calabash" -lstdc++``

Test the configuration
**********************

Build and run your application on the simulator. You should be getting console output similar to this::

	2014-05-30 16:08:07.882 TestmunkDemo-tm[3088:60b] Creating the server: <LPHTTPServer: 0xa0970d0>
	2014-05-30 16:08:07.883 TestmunkDemo-tm[3088:60b] Calabash iOS server version: CALABASH VERSION: 0.9.169
	2014-05-30 16:08:07.889 TestmunkDemo-tm[3088:60b] Started LPHTTP server on port 37265
	2014-05-30 16:08:08.810 TestmunkDemo-tm[3088:1903] Bonjour Service Published: domain(local.) type(_http._tcp.) name(Calabash Server)

Preparing testcases
-------------------

After your Xcode project has been set up, and you have ran your app on the simulator for the first time, you are ready to make and run your own testcases.

Inspect app for elements
~~~~~~~~~~~~~~~~~~~~~~~~

To be able to test, you need to have a way to reference different elements in your application. 

A more advanced way of inspecting elements on the view is using the Calabash console to see a list of the app's visible elements. Inside the folder you downloaded, go to ``TMSample/`` and run this Terminal command:

.. code-block:: console

	$ calabash-ios console
	> start_test_server_in_background

This will start our test application in the iOS simulator. then enter:

.. code-block:: console
 
	> query("*")

You should see a list of all visible elements.

Writing testcases
~~~~~~~~~~~~~~~~~

We have installed a feature folder in your project folder. Inside the folder you downloaded, go to ``TMSample/features/``, and open the ``myfirst.feature`` file to write your testcases. You can ignore the folders step_definitions and support at this point.

The my_first.feature file is structured in the following way:

.. code-block:: cucumber

	# Scenario name
	Scenario: Login
	  Given I am on the Welcome Screen # Teststeps
	  Then I touch the "Email" input field
	  Then I use the keyboard and type "test@testname.com"
	  Then I touch the "Password" input field
	  Then I use the keyboard and type "testmunk"
	  Then I touch "SIGN IN"
	  Then I wait
	  Then I should see "Hello world"

.. HINT::
	For writing testcases, we recommend using `Sublime Text 2 <http://www.sublimetext.com/>`_ with the `Cucumber syntax highlighting plugin <http://makandracards.com/ninjaconcept/9233-how-to-use-cucumber-together-with-sublime-text-2-editor>`_.

	Text editor suggestion

You can write as many testcases as you want in your ``myfirst.feature`` file. Don’t delete the feature title line, since it is needed for a successful execution of your testcase.

Good to know: Ensure that each testcase starts from the beginning. We call it testcase independency. When you run your app on our devices, we clear the app data before each testcase. So, if your app always starts with the login process, you will need to have teststeps that cover the login process at the beginning of each testcase. Testcase independency makes your testcases more robust, and it means every testcase can be tested independently.

Our teststep library can come in handy as a reference as you’re writing your testcases.

If you run your app over our device lab, we automatically take screenshots after each teststep – you don’t need to worry about it at all.



