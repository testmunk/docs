
.. |ios| image:: /_static/img/ios.png
	:height: 20px

.. |android| image:: /_static/img/and.png
	:height: 20px



Teststep library
================

Touching
--------

===============================================================  ==========
    Step                                                          Platform
===============================================================  ==========
Then I touch "accLabel"                                          |ios|
Then I touch the "login" button                                  |ios|
Then I touch button number 1                                     |ios|
Then I touch the "placeholder" input field                       |ios|
Then I touch list item number 1                                  |ios|
Then I toggle the switch                                         |ios|
Then I toggle the "accLabel" switch                              |ios|
Then I touch done                                                |ios|
Then I touch the user location                                   |ios|
Then I touch on screen 100 from the left and 250 from the top    |ios|
Given I press the “login" button                                 |android|
Then I press button number 1                                     |android|
Then I press view with id "home_button"                          |android|
Then I press “signup"                                            |android|
Then I touch the “welcome" text                                  |android|
Then I press list item number 1                                  |android|
Then I long press list item number 1                             |android|
Then I click on screen 20% from the left and 30% from the top    |android|
Then I toggle checkbox number 1                                  |android|
Then I long press “login"                                        |android|
Then I long press “signup" and select item number “1"            |android|
Then I long press “login" and select “welcome"                   |android|
===============================================================  ==========

Assertions
----------

====================================================  ================
    Step                                               Platform
====================================================  ================
Then I should see "text or label"                     |ios| |android|
Then I should not see "text or label"                 |ios| |android|
Then I see the "someview"                             |ios| |android|
Then I should see a "login" button                    |ios|
Then I should not see a "login" button                |ios|
Then I see the text "some text"                       |ios| |android|
Then I don't see the text "text or label"             |ios| |android|
Then I don't see the "someview"                       |ios|
Then I should see a "login" button                    |ios|
Then I should not see a "login" button                |ios|
Then I should see text starting with "prefix"         |ios|
Then I should see text containing "sub text"          |ios| |android|
Then I should see text ending with "suffix"           |ios|
Then I see 2 input fields                             |ios|
Then I should see a "Username" input field            |ios|
Then I should see a "Username" input field            |ios|
Then I should not see a "Username" input field        |ios|
Then I should see the user location                   |ios|
Then I should see a map                               |ios|
Then I don't see “text"                               |ios| |android|
====================================================  ================


Input
-----

============================================================================  ================
    Step                                                                        Platform
============================================================================  ================
Then I enter "text to write" into the "placeholder" input field               |ios|
Then I enter "text" into input field number 1                                 |ios|
Then I clear "placeholder"                                                    |ios|
Then I clear input field number 1                                             |ios|
Given I set the time to "14:00" on TimePicker with index "5"                  |android|
Given I set the "timePickerLabel" time to "14:00"                             |android|
Given I set the "datePickerLabel" date to "11-12-1993"                        |android|
Then I enter "text" into input field number 5                                 |android|
Then I enter text "text" into field with id "fieldId"                         |android|
Then I enter "text" as "accLabel"                                             |android|
Then I enter "text" into "accLabel"                                           |android|
Then I clear input field number 5                                             |android|
Then I clear "accLabel"                                                       |android|
Then I clear input field with id "fieldId"                                    |android|
Then I select "item text" from "spinnerLabel"                                 |android|
============================================================================  ================


Waiting
-------

====================================================================  ================
    Step                                                                Platform
====================================================================  ================
Then I wait to see "text or label"                                    |ios|
Then I wait for "text or label" to appear                             |ios|
Then I wait until I don't see "text or label"                         |ios|
I wait to not see "text or label"                                     |ios|
Then I wait for the "login" button to appear                          |ios|
Then I wait to see a navigation bar titled "title"                    |ios|
Then I wait for the "label" input field                               |ios|
Then I wait for 2 input fields                                        |ios|
Then I wait                                                           |ios| |android|
Then I wait for progress                                              |android|
Then I wait for dialog to close                                       |android|
Then I wait for "text or label" to appear                             |android|
Then I wait to see "text or label"                                    |android|
Then I wait up to 5 seconds for "text or label" to appear             |android|
Then I wait up to 5 seconds to see "text or label"                    |android|
Then I wait for the "accLabel" button to appear                       |android|
Then I wait for the "accLabel" screen to appear                       |android|
Then I wait for the view with id "viewId" to appear                   |android|
Then I wait up to 5 seconds for the "accLabel" screen to appear       |android|
Then I wait upto 5 seconds for the "accLabel" screen to appear        |android|
Then I wait for 1 second                                              |android|
Then I wait for a second                                              |android|
Then I wait for 5 seconds                                             |android|
====================================================================  ================

Buttons
-------

==================================  ================
    Step                              Platform
==================================  ================
Then I go back                      |ios| |android|
Then I press the menu key           |android|
Then I press the enter button       |android|
==================================  ================

Gestures
--------

========================================================  ================
    Step                                                    Platform
========================================================  ================
Then I swipe left                                         |ios| |android|
Then I swipe left on number 2                             |ios|
Then I swipe left on number 2 at x 20 and y 10            |ios|
Then I swipe left on "accLabel"                           |ios|
Then I swipe on cell number 2                             |ios|
Then I pinch to zoom in                                   |ios|
Then I pinch to zoom in on "accLabel"                     |ios|
Then I scroll down                                        |ios| |android|
Then I scroll down on "accLabel"                          |ios|
Then I select "accLabel" from the menu                    |android|
Then I drag from 50:100 to 50:250 moving with 20 steps    |android|
========================================================  ================