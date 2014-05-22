iOS
===

Getting Started
---------------

We started Testmunk with the goal of streamlining our mobile app testing process. Keeping setup and maintenance work as lean as possible is as important for us as it is for you.

Your first time experience basically consists of 5 easy steps.

1. Download the mac app
2. Drag it to project folder
3. Write testcases
4. Upload app
5. Start testrun and check results

Video: Getting started
~~~~~~~~~~~~~~~~~~~~~~

VIDEO HERE

1 – Install test framework in 3 minutes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We developed a mac app so that you don’t have to deal with the manual hurdle of integrating the test framework. Just drag the project folder into the mac app, and you’re ready to go.

The mac app installs a new folder under “frameworks,” and we create a “-tm” scheme that connects your app with the testing solution. We don’t change any code.

IMAGE HEREEEE: http://testmunk-docs.herokuapp.com/wp-content/uploads/2013/04/drag_and_drop.png

After you have integrated the test framework, you just need to upload the new .ipa file by clicking on `Upload App` for further test runs. Please also ensure that your latest testcases are uploaded by clicking on `Upload Testcases`.

By the way, you can also upload your ipa file and testcases over the web after accessing your testmunk account. An upload directly through XCode is also possible when you go through the Product > Archive process.

The Mac app has a Navigation Panel that helps you for the following steps:

IMAGE HEREEEE http://testmunk-docs.herokuapp.com/wp-content/uploads/2013/04/mac_menu.png

2 – Inspect app and write testcases
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the Inspect app option in the Testmunk status menu to launch your app in the simulator with the Accessibility Inspector enabled. You can then click on different elements in your app to find their accessibility labels.

The mac app automatically installs a “features” folder. Click on `Edit Testcases` in the mac app to open the folder. The “my_first.feature” is the file where you need to enter your testcases.

Have a look at `our predefined steps <http://docs.testmunk.com/reference/>`_ to see what kind of steps we support. If you want to extend your test steps, you can write custom steps in Ruby. Use the file `my_first_steps.rb` to enter your custom Ruby code.

3 – Test locally

Before you submit your testcases, you should try them out locally. Select `Start local Testrun` in the mac app, and the simulator will start.

4 – Upload testcases and app

You can upload your app and testcases either over the web or using the mac app. We also integrate an automatic upload function when you create a new build in Xcode.

5 – Run your test

Log in through `testmunk.com <http://testmunk.com>`_, navigate to your dashboard, and click on Start. Depending on how many test steps you included, it will take roughly 1-2 minutes per testcase to be executed.