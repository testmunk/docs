
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