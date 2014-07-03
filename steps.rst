
.. |ios| image:: /_static/img/ios.png
	:height: 20px

.. |android| image:: /_static/img/and.png
	:height: 20px



Teststep library
================

Touching
--------


.. admonition:: teststep ios

	Touches any element with the accessibility label “label”. This is usually the title of the element, or can be set manually in Xcode.

	Examples:

	.. code-block:: cucumber

		Then I touch "login"
		Then I touch "settings_button"

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) "([^\"]*)"$/ do |name|
		  touch("view marked:'#{name}'")
		  sleep(STEP_PAUSE)
		end

	Then I touch "accLabel"


.. admonition:: teststep ios

	Touches the button with the accessibility label “label”. This is usually the button [UIButton] title, or can be set manually in Xcode.

	Examples:
	
	.. code-block:: cucumber

		Then I touch the "login" button

	Related Teststeps:

	- Then I touch button number 1
	- Then I touch "label"

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) the "([^\"]*)" button$/ do |name|
		  touch("button marked:'#{name}'")
		  sleep(STEP_PAUSE)
		end

	Then I touch the "login" button


.. admonition:: teststep ios

	This macro will touch the first button [UIButton] it can find. If there is no button on that index, it will return an error.

	Examples:
	
	.. code-block:: cucumber

		Then I touch button number 1

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) button number (\d+)$/ do |index|
		  index = index.to_i
		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
		  touch("button index:#{index-1}")
		  sleep(STEP_PAUSE)
		end

	Then I touch button number 1


.. admonition:: teststep ios

	This macro will touch (and activate) the input field [UITextField] with the label string passed.

	Examples:

	.. code-block:: cucumber

		Then I touch the "Email Address" input field

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) the "([^\"]*)" (?:input|text) field$/ do |name|
		  placeholder_query = "textField placeholder:'#{name}'"
		  marked_query = "textField marked:'#{name}'"
		  if !query(placeholder_query).empty?
		    touch(placeholder_query)
		  elsif !query(marked_query).empty?
		    touch(marked_query)
		  else
		    screenshot_and_raise "could not find text field with placeholder '#{name}' or marked as '#{name}'"
		  end
		  sleep(STEP_PAUSE)
		end

	Then I touch the "placeholder" input field


.. admonition:: teststep ios

	This macro will touch the table cell [UITableViewCell] by number. It only works on visible cells.

	Examples:

	.. code-block:: cucumber

		Then I touch list item number 1

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) list item number (\d+)$/ do |index|
		   index = index.to_i
		   screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
		   touch("tableViewCell index:#{index-1}")
		   sleep(STEP_PAUSE)
		end

	Then I touch list item number 1


.. admonition:: teststep ios

	This macro will toggle the switch (UISwitch) available in the current view. This macro only works if there is one switch in view. [See related for multiple switches]

	Examples:

	.. code-block:: cucumber

		Then I touch the switch

	Related Teststeps:

	+ Then I toggle the "label" switch

	Implementation:

	.. code-block:: ruby

		Then /^I toggle the switch$/ do
		  touch("switch")
		  sleep(STEP_PAUSE)
		end

	Then I toggle the switch


.. admonition:: teststep ios

	This macro will toggle the switch which is tagged by the label provided.

	Examples:

	.. code-block:: cucumber

		Then I toggle the "Weekly Reminder" switch

	.. code-block:: ruby

		Then /^I toggle the "([^\"]*)" switch$/ do |name|
		  touch("switch marked:'#{name}'")
		  sleep(STEP_PAUSE)
		end

	Then I toggle the "accLabel" switch


.. admonition:: teststep ios

	Touching the done button in the keyboard.

	Implementation:

	.. code-block:: ruby

		Then /^I (?:touch|press) (?:done|search)$/ do
		  done
		  sleep(STEP_PAUSE)
		end

	Then I touch done


.. admonition:: teststep ios

	This macro will touch the user’s pin – the blue dot [MKUserLocation].

	Examples:

	.. code-block:: cucumber

		Then I touch the user location

	Implementation:

	.. code-block:: ruby

		Then /^I touch (?:the)? user location$/ do
		  touch("view:'MKUserLocationView'")
		  sleep(STEP_PAUSE)
		end

	Then I touch the user location


.. admonition:: teststep ios

	This macro will attempt to touch the screen on the points provided. Please be careful when using this since it the elements positions might differ on different devices.

	Examples:

	.. code-block:: cucumber

		Then I touch on screen 200 from the left and 100 from the top

	Implementation:

	.. code-block:: ruby

		Then /^I (?:press|touch) on screen (\d+) from the left and (\d+) from the top$/ do |x, y|
		  touch(nil, {:offset => {:x => x.to_i, :y => y.to_i}})
		  sleep(STEP_PAUSE)
		end

	Then I touch on screen 100 from the left and 250 from the top


.. admonition:: teststep android

	Taps the button containing the specified text.

	Examples:

	.. code-block:: cucumber

		Given I press the "login" button

	Implementation:

	.. code-block:: ruby

		Given /^I press the "([^\"]*)" button$/ do |text|
		  tap_when_element_exists("android.widget.Button {text CONTAINS[c] '#{text}'}")
		end

	Given I press the “login" button


.. admonition:: teststep android

	Taps the button with the specified index.

	Examples:

	.. code-block:: cucumber

		Then I press button number 1

	Implementation:

	.. code-block:: ruby

		Then /^I press button number (\d+)$/ do |index|
		  tap_when_element_exists("android.widget.Button index:#{index.to_i-1}")
		end

	Then I press button number 1


.. admonition:: teststep android

	Taps the view with the given ID.

	Examples:

	.. code-block:: cucumber

		Then I press view with id "home_button"

	Implementation:

	.. code-block:: ruby

		Then /^I press view with id "([^\"]*)"$/ do |id|
		  tap_when_element_exists("* id:'#{id}'")
		end

	Then I press view with id "home_button"


.. admonition:: teststep android

	Taps the view marked by the specified identifier.

	Examples:

	.. code-block:: cucumber

		Then I press “signup"

	Implementation:

	.. code-block:: ruby

		Then /^I press "([^\"]*)"$/ do |identifier|
		  tap_when_element_exists("* marked:'#{identifier}'")
		end

	Then I press “signup"


.. admonition:: teststep android

	Taps the specified text.

	Examples:

	.. code-block:: cucumber

		Then I touch the “welcome" text

	Implementation:

	.. code-block:: ruby

		Then /^I touch the "([^\"]*)" text$/ do |text|
		  tap_when_element_exists("* {text CONTAINS[c] '#{text}'}")
		end

	Then I touch the “welcome" text


.. admonition:: teststep android

	Taps the list item with the specified index in the first visible list.

	Examples:

	.. code-block:: cucumber

		Then I press list item number 1

	Implementation:

	.. code-block:: ruby

		Then /^I press list item number (\d+)$/ do |index|
		  tap_when_element_exists("android.widget.ListView index:0 android.widget.TextView index:#{index.to_i-1}")
		end

	Then I press list item number 1


.. admonition:: teststep android

	Long presses the list item with the specified index in the first visible list.

	Examples:

	.. code-block:: cucumber

		Then I long press list item number 1

	Implementation:

	.. code-block:: ruby

		Then /^I long press list item number (\d+)$/ do |index|
		  long_press_when_element_exists("android.widget.ListView index:0 android.widget.TextView index:#{index.to_i-1}")
		end

	Then I long press list item number 1


.. admonition:: teststep android

	Taps the screen at the specified location.

	Examples:

	.. code-block:: cucumber

		Then I click on screen 20% from the left and 30% from the top

	Implementation:

	.. code-block:: ruby

		Then /^I click on screen (\d+)% from the left and (\d+)% from the top$/ do |x, y|
		  perform_action('click_on_screen', x, y)
		end

	Then I click on screen 20% from the left and 30% from the top


.. admonition:: teststep android

	Toggles the checkbox with the specified index.

	Examples:

	.. code-block:: cucumber

		Then I toggle checkbox number 1

	Implementation:

	.. code-block:: ruby

		Then /^I toggle checkbox number (\d+)$/ do |index|
		  tap_when_element_exists("android.widget.CheckBox index:#{index.to_i-1}")
		end

	Then I toggle checkbox number 1


.. admonition:: teststep android

	Long presses the view containing the specified text.

	Examples:

	.. code-block:: cucumber

		Then I long press “login"

	Implementation:

	.. code-block:: ruby

		Then /^I long press "([^\"]*)"$/ do |text|
		  long_press_when_element_exists("* {text CONTAINS[c] '#{text}'}")
		end

	Then I long press “login"


.. admonition:: teststep android

	Description coming soon!

	Then I long press “signup" and select item number 1


.. admonition:: teststep android

	Description coming soon!

	Then I long press “login" and select “welcome"


Assertions
----------

.. admonition:: teststep ios android

	This teststep will check the view for the provided parameter as an accessibility label or text in a UILabel. If calabash is unable to find the label or text, then this teststep fails.

	Examples:

	.. code-block:: cucumber

		Then I should see "Welcome"

	Then I should see "text or label"


.. admonition:: teststep ios android

	This is the inverse of the “Then I should see text”, this will check all the views to make sure that this particular label is not in the view. If it is, this teststep will fail. It is useful if you want to make sure you have left a certain screen.

	Examples:

	.. code-block:: cucumber

		Then I should not see "Logout"
	
	Related Teststeps:

	- Then I should see "text or label"

	Then I should not see "text or label"


.. admonition:: teststep ios

	Description coming soon!

	Then I see the "someview"


.. admonition:: teststep ios

	Description coming soon!

	Then I should see a "login" button


.. admonition:: teststep ios

	Description coming soon!

	Then I should not see a "login" button


.. admonition:: teststep ios android

	Description coming soon!

	Then I see the text "some text"


.. admonition:: teststep ios android

	Description coming soon!

	Then I don't see the text "some text"


.. admonition:: teststep ios

	This will check all the views to make sure that the view with the provided accessibility label “view” is not available. It will fail if it finds such a view.

	Examples:

	.. code-block:: cucumber

		Then I don't see the "Logout"
	
	Related Teststeps:

	- Then I should not see "text or label"

	Then I don't see the "someview"


.. admonition:: teststep ios

	Description coming soon!

	Then I should see a "login" button


.. admonition:: teststep ios

	Description coming soon!

	Then I should not see a "login" button


.. admonition:: teststep ios

	Looks for a label [UILabel] with text which contains the provided prefix

	Examples:

	.. code-block:: cucumber

		Then I should see text starting with "Welcome"

	Related Teststeps:

	- Then I should see text ending with "suffix"

	- Then I should see text containing "sub text"

	Then I should see text starting with "prefix"


.. admonition:: teststep ios android

	Will look for a label [UILabel] which contains the text provided

	Examples:

	.. code-block:: cucumber

		Then I should see text containing "available"

	Related Teststeps:

	- Then I should see text ending with "suffix"

	- Then I should see text starting with "prefix"

	Then I should see text containing "sub text"


.. admonition:: teststep ios

	Checks all labels [UILabel] for text that ends with the provided suffix

	Examples:

	.. code-block:: cucumber

		Then I should see text ending with "suffix"
	
	Related Teststeps:

	- Then I should see text containing "sub text"
	
	- Then I should see text starting with "prefix"

	Then I should see text ending with "suffix"


.. admonition:: teststep ios

	Checks to see if the view contains 2 input fields, the input fields can be replaced with buttons, or other types of views.

	Examples:

	.. code-block:: cucumber

		Then I see 2 buttons
		Then I see 4 input fields

	Then I see 2 input fields


.. admonition:: teststep ios

	Description coming soon!

	Then I should see a "Username" input field


.. admonition:: teststep ios

	Description coming soon!

	Then I should not see a "Username" input field


.. admonition:: teststep ios

	Checks the views to see if there is a user location (blue dot) [MKUserLocation] inside a map [UIMapView].

	Examples:

	.. code-block:: cucumber

		Then I should see the user location

	Then I should see the user location


.. admonition:: teststep ios

	This step checks if a mapview is on the screen.

	Examples:

	.. code-block:: cucumber

		Then I should see a map

	Then I should see a map


.. admonition:: teststep android

	Description coming soon!

	Then I don't see “text"


Input
-----

.. admonition:: teststep ios

	Enters “text” into the input / text field [UITextField] which has the placeholder text set as “label”

	Examples:

	.. code-block:: cucumber

		Then I enter "user@testmunk.com" into the "Email Address" input field

	Then I enter "text to write" into the "placeholder" input field


.. admonition:: teststep ios android

	Enters “text” into the relevant input / text field [UITextField]. If there are several input fields you will need to check which input field number is correct.

	Examples:

	.. code-block:: cucumber

		Then I enter "First name" into input field number 1

	Then I enter "text" into input field number 1


.. admonition:: teststep ios android

	Clears the text field [UITextField][UITextView].

	Examples:

	.. code-block:: cucumber

		Then I clear "Email Address"

	Then I clear "placeholder"


.. admonition:: teststep ios android

	Description coming soon!

	Then I clear input field number 1


.. admonition:: teststep android

	Description coming soon!

	Given I set the time to "14:00" on TimePicker with index "5"


.. admonition:: teststep android

	Description coming soon!

	Given I set the "timePickerLabel" time to "14:00"


.. admonition:: teststep android

	Description coming soon!

	Given I set the "datePickerLabel" date to "11-12-1993"


.. admonition:: teststep android

	Description coming soon!

	Then I enter text "text" into field with id "fieldId"


.. admonition:: teststep android

	Description coming soon!

	Then I enter "text" as "fieldId"


.. admonition:: teststep android

	Description coming soon!

	Then I enter "text" into "fieldId"


.. admonition:: teststep android

	Description coming soon!

	Then I clear input field with id "fieldId"


.. admonition:: teststep android

	Description coming soon!

	Then I select "item text" from "spinnerLabel"


Waiting
-------

.. admonition:: teststep ios

	This teststep will make the testrun wait until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.

	Examples:

	.. code-block:: cucumber

		Then I wait to see "Welcome"
		Then I wait to see "Please log in:"

	Then I wait to see "text or label"


.. admonition:: teststep ios

	Description coming soon!

	Then I wait for "text or label" to appear


.. admonition:: teststep ios

	Description coming soon!

	Then I wait until I don't see "text or label"


.. admonition:: teststep ios

	This will wait until an element with the label or text provided has disappeared.

	Examples:

	.. code-block:: cucumber

		Then I wait to not see "text or label"

	Then I wait to not see "text or label"


.. admonition:: teststep ios

	Description coming soon!

	Then I wait for the "login" button to appear


.. admonition:: teststep ios

	This teststep will wait until the title in the navgation bar [UINavigationBar] changes to the provided text (ie. when the view changes), or the timeout occurs.

	Examples:

	.. code-block:: cucumber

		Then I wait to see a navigation bar title "Welcome"
		Then I wait to see a navigation bar title "Login"

	Then I wait to see a navigation bar titled "title"


.. admonition:: teststep ios

	This will wait until the specific input field appears.

	Examples:

	.. code-block:: cucumber

		Then I wait for the "Username" input field

	Then I wait for the "label" input field


.. admonition:: teststep ios

	This will wait until the relevant number of textfields are loaded.

	Examples:

	.. code-block:: cucumber

		Then I wait for 2 input fields

	Then I wait for 2 input fields


.. admonition:: teststep ios android

	Description coming soon!

	Then I wait


.. admonition:: teststep android

	Description coming soon!

	Then I wait for progress


.. admonition:: teststep android

	Description coming soon!

	Then I wait for dialog to close


.. admonition:: teststep android

	Description coming soon!

	Then I wait for "text or label" to appear


.. admonition:: teststep android

	This teststep will make the testrun wait until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.

	Examples:

	.. code-block:: cucumber

		Then I wait to see "Welcome"
		Then I wait to see "Please log in:"

	Then I wait to see "text or label"


.. admonition:: teststep android

	Description coming soon!

	Then I wait up to 5 seconds for "text or label" to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait up to 5 seconds to see "text or label"


.. admonition:: teststep android

	Description coming soon!

	Then I wait for the "id" button to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait for the "id" screen to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait for the view with id "viewId" to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait up to 5 seconds for the "id" screen to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait upto 5 seconds for the "id" screen to appear


.. admonition:: teststep android

	Description coming soon!

	Then I wait for a second


.. admonition:: teststep android

	This teststep will make the testrun wait for X seconds.

	Examples:

	.. code-block:: cucumber

		Then I wait for 1 second
		Then I wait for 2 seconds
		Then I wait for 2.4 seconds

	Then I wait for 5 seconds


Buttons
-------

.. admonition:: teststep ios android

	Description coming soon!

	Then I go back


.. admonition:: teststep android

	Description coming soon!

	Then I press the menu key


.. admonition:: teststep android

	Description coming soon!

	Then I press the enter button


Gestures
--------

.. admonition:: teststep ios android

	Performs a swipe gesture arbitrarily on the screen.

	Examples:

	.. code-block:: cucumber

		Then I swipe left

	Options:

	You can use left, right up or down as parameters.

	Then I swipe left


.. admonition:: teststep ios

	Description coming soon!

	Then I swipe left on number 2


.. admonition:: teststep ios

	Description coming soon!

	Then I swipe left on number 2 at x 20 and y 10


.. admonition:: teststep ios

	Swipes in the direction given, on the object which contains the mentioned accessibility label.

	Examples:

	.. code-block:: cucumber

		Then I swipe left/right on "Morocco"

	Options:

	Direction can be left, right, up and down

	Related Teststeps:

	- Then I swipe left/right

	Then I swipe left on "accLabel"


.. admonition:: teststep ios

	Description coming soon!

	Then I swipe on cell number 2


.. admonition:: teststep ios

	Performs a pinch gesture on the screen.

	Examples:

	.. code-block:: cucumber

		Then I pinch to zoom in
		Then I pinch to zoom out

	Options:

	Parameter (zoom in) can also be zoom out

	Then I pinch to zoom in


.. admonition:: teststep ios

	Description coming soon!

	Then I pinch to zoom in on "accLabel"


.. admonition:: teststep ios android

	Attempts to arbitrarily scroll down on the view.

	Examples:

	.. code-block:: cucumber

		Then I scroll down
		Then I scroll up

	Options:

	The last parameter (down) can also be up, left and right.

	Then I scroll down


.. admonition:: teststep ios

	Description coming soon!

	Then I scroll down on "accLabel"


.. admonition:: teststep android

	Description coming soon!

	Then I select "id" from the menu


.. admonition:: teststep android

	Description coming soon!

	Then I drag from 50:100 to 50:250 moving with 20 steps
