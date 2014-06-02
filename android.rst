Android
=======

Testmunk Android enables you to write automated functional testcases that you can run on various Android devices with different OS versions. Our goal is that you are able to reduce your manual testing time tremendeously. Following the installation you will be able to write testcases and let them run locally on your emulator and Android device as well as on a variety of Android devices over the cloud in the testmunk device lab.

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
	Calabash is a framework that allows you to write automated mobile application tests for iOS and Android. It provides APIs for mimicking input to the devices, and reading its output.

	What is calabash?

.. DANGER:: 
	If you are getting an error that says "clang: error: unknown argument: '-multiply_definedsuppress'", you must run these 2 commands instead:

	.. code-block:: console

		$ sudo -i

		$ ARCHFLAGS=-Wno-error=unused-command-line-argument-hard-error-in-future gem install calabash-android

	This error is due to deprecated arguments for the ``clang`` executable that ``gem`` calls when installing certain extensions.

	'clang error'

Download and Install Android SDK
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Android SDK is the essential tool to build Android apps; by downloading it you will have access to a few tools that you need to test the app.

`Download the latest Android SDK <https://developer.android.com/sdk/index.html>`_

After your download please copy paste both folders (``sdk`` and ``eclipse``) into your Applications folder.

Configure Bash profile
~~~~~~~~~~~~~~~~~~~~~~

The Bash profile .bash_profile is a hidden file in your personal folder that you will need to configure for your Android SDK. After having moved the sdk and eclipse folder in your Applications folder, you can copy paste the following 2 lines into your .bash_profile::

	export ANDROID_HOME=/Applications/sdk 
	export PATH=$PATH:$ANDROID_HOME:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/add-ons

After you have configured your bash profile, please close all terminal windows to affect your changes.

.. HINT::
	.bash_profile is a shell script that gets executed every time you open a new Terminal window. It deals with configuration for all of your Terminal commands. It can be found in your user folder, ``~/``.

	Take into account that this file might not exist; in that case, create a new empty one.

	Also consider that, since the filename begins with a period, this file is hidden. In order to see hidden files in a Finder window, run these commands in OS X Mavericks:

	.. code-block:: console

		$ defaults write com.apple.finder AppleShowAllFiles TRUE
		$ killall Finder

	or these commands in OS X versions prior to Mavericks:

	.. code-block:: console

		$ defaults write com.apple.Finder AppleShowAllFiles TRUE
		$ killall Finder

	What is a .bash_profile? Where can I find it?

Plug in your Android device

After you have plugged in your android device into your mac, open a new terminal window and execute:

.. code-block:: console

	$ adb devices

You should see output similar to the following, which confirmes that your device was recognized::

	List of devices attached
	605A000600000001015F3E001200C00B     device

In case you don't see any output please confirm that you activated the "USB debugging" mode for your device. You can activate it by going to "Settings".

.. VIDEO HEREEEEEEE

Preparing testcases
-------------------

After you have downloaded the files open a new terminal window and navigate via cd to the TestmunkAndroidDemo folder that you just downloaded. Then execute:

.. code-block:: console

	$ calabash-android run TestmunkTest_debug.apk --verbose

.. DANGER::
	If this command returns an error that says "No keystores found. Please create one or run calabash-android setup to configure calabash-android to use an existing keystore," then, run the following commands before continuing:

	.. code-block:: console

		$ keytool -genkey -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"

		$ calabash-android run TestmunkTest_debug.apk

	No keystores found


You should get prompted to resign the app. Follow the terminal instructions to resign the app. After resigning please again execute:

.. code-block:: console

	$ calabash-android run TestmunkTest_debug.apk --verbose

This should install the app on your device, and after a minute or two it should get launched and our sample testcases should get executed. It will ca. 3-5 min for the testcases to get completed, you can also exit the terminal to stop the testrun. Simply enter ``exit`` into the terminal.

In the following we'd like to show you how you can easily write your own testcase.

Inspect app for elements
~~~~~~~~~~~~~~~~~~~~~~~~

Please tap on the app on your device so that it is launched. Open a new terminal window and execute:

.. code-block:: console

	$ uiautomatorviewer

.. HINT::

	In case you need to install an ``APK`` file on your device, you can ``cd`` into the folder that contains it and use this command:

	.. code-block:: console

		$ adb install NameofTheFile.apk

	Installing APKs

On the newly opened window, please click on the device icon on the upper left corner to get an actual screenshot from the device.

.. image:: /_static/img/uiautoss.png

This inspection is important to identify the right elements that you later will need for your testcases. For example the ``resource_id`` is needed when you use the teststep ``Then I touch view with id...``. 

.. IMPORTANT::
	If you use an Android version lower than API level 18 / Jelly Bean you will not be able to interact with the ``resource-id`` of the element.

	Early versions of Android

.. VIDEO HEREEE

A more advanced way of inspecting elements on the view is using the console. Open a new terminal window, ``cd`` into the folder that contains your ``APK`` file, and enter:

.. code-block:: console
 
	$ calabash-android console TestmunkTest_debug.apk
 
and then enter these commands:

.. code-block:: console
 
	> start_test_server_in_background

	> query("*")
 
You should see a list of all visible elements.

Writing testcases
~~~~~~~~~~~~~~~~~

Within the sample app that you just downloaded, please open the ``my_first.feature`` file within the ``feature`` folder. These are some sample testcases that we scripted for a demo application. One testcase looks like this:

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

.. HINT::
	For writing testcases, we recommend using `Sublime Text 2 <http://www.sublimetext.com/>`_ with the `Cucumber syntax highlighting plugin <http://makandracards.com/ninjaconcept/9233-how-to-use-cucumber-together-with-sublime-text-2-editor>`_.

	Text editor suggestion

In case you were wondering where these steps come from, have a look at the `Teststep library <steps.html>`_. These are all steps that you can be using right away. In case you'd like to extend and write your own steps, have a look into the .rb file in the ``step_definitions`` folder and the Calabash Ruby API.

Calabash Ruby API
-----------------

Calabash offers a Ruby API that we support for defining special teststeps.

A new teststep is defined in the following way:

.. code-block:: ruby
	
	# Define a regular expression to catch the step
	Then(/^"(.*?)" radio button should be selected$/) do |arg1|
	  # Use calls to the Calabash API to get information
	  if(!query("RadioButton text:'#{arg1}'", :checked).first())
	    # Act on that information
	    fail("The radio button with text #{arg1} should be selected")
	  end
	end

A teststep is considered succesful if the execution of its codeblock runs with neither explicit fails nor uncaught errors.

A nice way to try the different commands on this API is to run the Calabash console and test them.

Useful methods
~~~~~~~~~~~~~~

This are some useful functions that the Calabash API provides. You can see more about them on the `Calabash GitHub documentation <https://github.com/calabash/calabash-android/blob/master/documentation/ruby_api.md>`_.

query(uiquery, \*args)
**********************

Query returns an array with the views on the screen that match it. 

.. code-block:: ruby

	> query("FrameLayout index:0")

	[
	    [0] {
	                        "id" => "content",
	                   "enabled" => true,
	        "contentDescription" => nil,
	                     "class" => "android.widget.FrameLayout",
	                      "rect" => {
	            "center_y" => 617.0,
	            "center_x" => 384.0,
	              "height" => 1134,
	                   "y" => 50,
	               "width" => 768,
	                   "x" => 0
	        },
	               "description" => "android.widget.FrameLayout{41f40dc0 V.E..... ........ 0,50-768,1184 #1020002 android:id/content}"
	    }
	]

Each result is a Ruby hash map object.

.. code-block:: ruby

	> query("FrameLayout index:0").first.keys

	[
	    [0] "id",
	    [1] "enabled",
	    [2] "contentDescription",
	    [3] "class",
	    [4] "rect",
	    [5] "description"
	]

	> query("FrameLayout index:0")[0]["id"]
	
	"content"

wait_for_elements_exist(elements_arr, options={})
*************************************************

Waits for all queries in the ``elements_arr`` array to return results before continuing the test.

.. code-block:: ruby

	wait_for_elements_exist( ["button marked:'OK'", "* marked:'Cancel'"], :timeout => 2)

touch(uiquery, options={})
**************************

Touches the first result of the query ``uiquery``.

.. code-block:: ruby

	touch("FrameLayout index:0")
	touch(query("FrameLayout"))

.. VIDEO HEREEEEEE on how to use the console

Running testruns
----------------

General
~~~~~~~

Testmunk Android enables you to run your testcases on:

 1. the virtual emulator
 2. on your plugged in Android device
 3. on a variety of Android devices with different OS versions in the testmunk device lab.

Running locally on the emulator
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Go to applications and start "Eclipse". In the menu bar click click on `Window > Android Virtual Device Manager` and create an emulator you want to test on.

.. VIDEO HEREEEEEE

Running on your local device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure that your device is being recognised by starting a terminal window and executing adb devices.
 
In order to run your tests on your device, please navigate via ``cd`` to your project folder and execute:

.. code-block:: console
 
	$ calabash-android run sample.apk --verbose
 
Your testrun should get executed on your device. It's important that you use an apk file that is in debug mode.

Running on multiple Android devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to run your testcases on testmunk's devices and see a report with your test results and screenshots, simply create an account, upload your apk file and testcases.

.. VIDEO HEREEEEE

Image Comparison in Calabash
----------------------------

The goal of this post is to show how we can do basic image recognition using Calabash Android library.

Image comparison is another way that allows you to assert your tests using calabash cucumber. However, calabash cucumber does not support it by default. So, we have created some custom steps that you can include in your features folder, and you’ll have image comparison working in a short time.

Image comparison is a tricky topic. Some comparisons are as simple as pixel by pixel checking; very advanced scenarios may compare a small image within a bigger image, or even images which are slightly shifted or compressed.

We’ve chosen the simple approach for now, which means a pixel by pixel check. This check uses a difference blend, which is the same thing Github uses to diff images.

If we have pixelation, or an image that is slightly lighter or darker, the steps will still be able to make the comparison. Another benefit is that it returns a more realistic readout of percentage changed, and allows us to set maximum thresholds while testing.

If you want to compare an image (local or remote) with the current screen shot, it needs to match the resolution in order to be effective. The best use case is testing the app on a device that you already have the screenshots for.

To get up and running, we will need to install an extra gem to handle the image manipulation. We can do that using:

.. code-block:: console

	$ gem install oily_png

This is in addition to the calabash-android gem, which should already be installed and configured.

Once you have the gem installed, create a new file under features/step_definitions folder (with any name). Paste in the following code:

.. code-block:: ruby

	require 'oily_png'
	require 'open-uri'
	include ChunkyPNG::Color
	 
	def starts_with(item, prefix)
	  prefix = prefix.to_s
	  item[0, prefix.length] == prefix
	end
	 
	# compares two images on disk, returns the % difference
	def compare_image(image1, image2)
	  images = [
	    ChunkyPNG::Image.from_file("screens/#{image1}"),
	    ChunkyPNG::Image.from_file("screens/#{image2}")
	  ]
	  count=0
	  images.first.height.times do |y|
	    images.first.row(y).each_with_index do |pixel, x|
	 
	      images.last[x,y] = rgb(
	        r(pixel) + r(images.last[x,y]) - 2 * [r(pixel), r(images.last[x,y])].min,
	        g(pixel) + g(images.last[x,y]) - 2 * [g(pixel), g(images.last[x,y])].min,
	        b(pixel) + b(images.last[x,y]) - 2 * [b(pixel), b(images.last[x,y])].min
	      )
	      if images.last[x,y] == 255
	        count = count + 1
	      end
	    end
	  end
	 
	  100 - ((count.to_f / images.last.pixels.length.to_f) * 100);
	end
	 
	# find the file
	def get_screenshot_name(folder, fileName)
	  foundName = fileName
	  Dir.foreach('screens/') do |item|
	  next if item == '.' or item == '..'
	    if item.start_with? fileName.split('.')[0]
	      foundName = item
	    end
	  end
	 
	  foundName
	end
	 
	def setup_comparison(fileName, percentageVariance, forNotCase = false)
	  screenshotFileName = "compare_#{fileName}"
	  screenshot({ :prefix => "screens/", :name => screenshotFileName })
	 
	  screenshotFileName = get_screenshot_name("screens/", screenshotFileName)
	  changed = compare_image(fileName, screenshotFileName)
	  FileUtils.rm("screens/#{screenshotFileName}")
	 
	  assert = true
	  if forNotCase
	    assert = changed.to_i < percentageVariance
	  else
	    assert = changed.to_i > percentageVariance
	  end
	 
	  if assert
	    fail(msg="Error. The screen shot was different from the source file. Difference: #{changed.to_i}%")
	  end
	 
	end
	 
	def setup_comparison_url(url, percentageVariance)
	  fileName = "tester.png"
	  open("screens/#{fileName}", 'wb') do |file|
	    file << open(url).read
	  end
	 
	  setup_comparison(fileName, percentageVariance)
	  FileUtils.rm("screens/#{fileName}")
	end
	 
	Then(/^I compare the screen with "(.*?)"$/) do |fileName|
	  setup_comparison(fileName, 0)
	end
	 
	Then(/^I compare the screen with url "(.*?)"$/) do |url|
	  setup_comparison_url(url, 0)
	end
	 
	Then(/^the screen should not match with "(.*?)"$/) do |fileName|
	  setup_comparison(fileName, 0, true)
	end
	 
	Then(/^I expect atmost "(.*?)" difference when comparing with "(.*?)"$/) do |percentageVariance, fileName|
	  setup_comparison(fileName, percentageVariance.to_i)
	end
	 
	Then(/^I expect atmost "(.*?)" difference when comparing with url "(.*?)"$/) do |percentageVariance, url|
	  setup_comparison_url(url, percentageVariance.to_i)
	end

If you are using local screen shots, add the source images to a “screens” folder at the same level as the features folder. You will use the name of these images in your test steps.

The following steps are available after injecting the library:

.. code-block:: cucumber

	Then I compare the screen with "login_screen.png"
	Then I expect atmost "2%" difference when comparing with "login_screen_fail.png"
	 
	Then I compare the screen with url "http://testmunk.com/login_screen.png"
	Then I expect atmost "2%" difference when comparing with url "http://testmunk.com/login_screen_fail.png"
	 
	Then the screen should not match with "screen2.png"

You have three different types of steps. One asserts an exact match, another asserts an approximate match (i.e. up to 2%), and the final one reads if the image does not match (asserting if a particular view-changing action has happened or not). You can also use local files (which should be present in the /screens folder) or remotely uploaded files.

If there is a match failure, you will get the percentage difference in the output so you know how much of the screenshot was to the source.

Sources:

- http://jeffkreeftmeijer.com/2011/comparing-images-and-creating-image-diffs/

Note:

- This will work with Calabash iOS as well. However, for games using OpenGL, the screenshot utility of Calabash does not work.