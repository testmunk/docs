
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

	Touches the first button [UIButton] it can find. If there is no button on that index, it will return an error.

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

	Touches (and activates) the input field [UITextField] with the label string passed.

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

	Touches the table cell [UITableViewCell] by number. It only works on visible cells.

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

	Toggles the switch (UISwitch) available in the current view. This macro only works if there is one switch in view. [See related for multiple switches]

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

	Toggles the switch which is tagged by the label provided.

	Examples:

	.. code-block:: cucumber

		Then I toggle the "Weekly Reminder" switch

	Implementation:

	.. code-block:: ruby

		Then /^I toggle the "([^\"]*)" switch$/ do |name|
		  touch("switch marked:'#{name}'")
		  sleep(STEP_PAUSE)
		end

	Then I toggle the "accLabel" switch


.. admonition:: teststep ios

	Touches the done button on the keyboard.

	Examples:

	.. code-block:: cucumber

		Then I touch done

	Implementation:

	.. code-block:: ruby

		Then /^I (?:touch|press) (?:done|search)$/ do
		  done
		  sleep(STEP_PAUSE)
		end

	Then I touch done


.. admonition:: teststep ios

	Touches the user’s pin – the blue dot [MKUserLocation].

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

	This macro will attempt to touch the screen on the points provided. Please be careful when using this as elements' positions may change on different devices.

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

	Taps the image button with the specified index.

	Examples:

	.. code-block:: cucumber

		Then I press image button number 2

	Implementation:

	.. code-block:: ruby

		Then /^I press image button number (\d+)$/ do |index|
 		  tap_when_element_exists("android.widget.ImageButton index:#{index.to_i-1}")
		end

	Then I press image button number 2


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

	Long presses the view containing the specified text and then selects an item from the menu that appears.

	Examples:

	.. code-block:: cucumber

		Then I long press “signup" 
		Then I select "item number 1" from the menu

	Implementation:

	.. code-block:: ruby

		Then /^I long press "([^\"]*)"$/ do |text|
		  long_press_when_element_exists("* {text CONTAINS[c] '#{text}'}")
		end

		Then /^I select "([^\"]*)" from the menu$/ do |identifier|
  		  select_options_menu_item(identifier)
		end

	Then I long press “signup" and select item number 1


.. admonition:: teststep android

	Long presses the view containing the specified text and then selects an item from the menu that appears.

	Examples:

	.. code-block:: cucumber

		Then I long press “login" 
		Then I select "welcome" from the menu

	Implementation:

	.. code-block:: ruby

		Then /^I long press "([^\"]*)"$/ do |text|
		  long_press_when_element_exists("* {text CONTAINS[c] '#{text}'}")
		end

		Then /^I select "([^\"]*)" from the menu$/ do |identifier|
  		  select_options_menu_item(identifier)
		end

	Then I long press “login" and select “welcome"


Assertions
----------

.. admonition:: teststep ios android

	This teststep will check the view for the provided parameter as an accessibility label or text in a UILabel. If calabash is unable to find the label or text, then this teststep fails.

	Examples:

	.. code-block:: cucumber

		Then I should see "Welcome"

	Implementation iOS:

	.. code-block:: ruby

		Then /^I should see "([^\"]*)"$/ do |expected_mark|
  		  res = (element_exists( "view marked:'#{expected_mark}'" ) or
         	 element_exists( "view text:'#{expected_mark}'"))
         	 if not res
    		screenshot_and_raise "No element found with mark or text: #{expected_mark}"
  		  end
		end

	Implementation Android:

	.. code-block:: ruby

		Then /^I should see "([^\"]*)"$/ do |text|
  		  wait_for_text(text, timeout: 10)
		end

	Then I should see "text or label"


.. admonition:: teststep ios android

	This is the inverse of the “Then I should see text”, this will check all the views to make sure that this particular label is not in the view. If it is, this teststep will fail. It is useful if you want to make sure you have left a certain screen.

	Examples:

	.. code-block:: cucumber

		Then I should not see "Logout"

	Implementation iOS:

	.. code-block:: ruby

		Then /^I should not see "([^\"]*)"$/ do |expected_mark|
		  res = query("view marked:'#{expected_mark}'")
		  res.concat query("view text:'#{expected_mark}'")
		   unless res.empty?
		   screenshot_and_raise "Expected no element with text nor accessibilityLabel: #{expected_mark}, found #{res.join(", ")}"
	 	  end
		end

	Implementation Android:

	.. code-block:: ruby

		Then /^I should not see "([^\"]*)"$/ do |text|
 		  wait_for_text_to_disappear(text, timeout: 10)
		end

	Related Teststeps:

	- Then I should see "text or label"

	Then I should not see "text or label"


.. admonition:: teststep ios

	Checks all the views to make sure that the view with the provided accessibility label “view” is available. It will fail if it does not find such a view.

	Examples:

	.. code-block:: cucumber

		Then I see the "Logout"

	Implementation:

	.. code-block:: ruby

		Then /^I see the "([^\"]*)"$/ do |text|
  		  macro %Q|I should see "#{text}"|
		end
	
	Related Teststeps:

	- Then I should not see "text or label"

	- Then I don't see the "someview"

	Then I see the "someview"


.. admonition:: teststep ios

	Checks all the views to make sure that the view with the provided accessibility label “view” is not available. It will fail if it finds such a view.

	Examples:

	.. code-block:: cucumber

		Then I don't see the "Logout"

	Implementation: 

	.. code-block:: ruby
		
		Then /^I don't see the "([^\"]*)"$/ do |text|
  		  macro %Q|I should not see "#{text}"|
		end
	
	Related Teststeps:

	- Then I should not see "text or label"

	Then I don't see the "someview"


.. admonition:: teststep ios

	Checks the view for the existence of a specified button. If Calabash is unable to find the button, then the teststep fails. 

	Examples:

	.. code-block:: cucumber

		Then I should see a "login" button

	Implementation:

	.. code-block:: ruby

		Then /^I should see a "([^\"]*)" button$/ do |expected_mark|
  		  check_element_exists("button marked:'#{expected_mark}'")
		end

	Then I should see a "login" button


.. admonition:: teststep ios

	Checks the view for the existence of a specified button. If Calabash is able to find the button, then the teststep fails. 

	Examples:

	.. code-block:: cucumber

		Then I should not see a "login" button

	Implementation:

	.. code-block:: ruby

		Then /^I should not see a "([^\"]*)" button$/ do |expected_mark|
  		  check_element_does_not_exist("button marked:'#{expected_mark}'")
		end

	Related teststeps:

	- Then I should see a "login" button

	Then I should not see a "login" button


.. admonition:: teststep ios android

	Asserts that specified text can be found. If Calabash is not able to find the text, then the teststep fails. 
	
	Examples:

	.. code-block:: cucumber

		Then I see the text "Hello"

	Implementation:

	.. code-block:: ruby

		Then /^I see the text "([^\"]*)"$/ do |text|
  		  macro %Q|I should see "#{text}"|
		end

	Then I see the text "some text"


.. admonition:: teststep ios android

	Asserts that specified text can not be found. If Calabash is able to find the text, then the teststep fails. 
	
	Examples:

	.. code-block:: cucumber

		Then I don't see the text "Hello"

	Implementation:

	.. code-block:: ruby

		Then /^I don't see the text "([^\"]*)"$/ do |text|
  		  macro %Q|I should not see "#{text}"|
		end

	Then I don't see the text "some text"


.. admonition:: teststep ios

	Looks for a label [UILabel] with text which contains the provided prefix

	Examples:

	.. code-block:: cucumber

		Then I should see text starting with "Welcome"

	Implementation: 

	.. code-block:: ruby

		Then /^I (?:should)? see text starting with "([^\"]*)"$/ do |text|
	  	  res = query("view {text BEGINSWITH '#{text}'}").empty?
	  	  if res
			screenshot_and_raise "No text found starting with: #{text}"
	  	  end
		end

	Related Teststeps:

	- Then I should see text ending with "suffix"

	- Then I should see text containing "sub text"

	Then I should see text starting with "prefix"


.. admonition:: teststep ios android

	Will look for a label [UILabel] which contains the text provided

	Examples:

	.. code-block:: cucumber

		Then I should see text containing "available"

	Implementation: 

	.. code-block:: ruby 

		Then /^I (?:should)? see text containing "([^\"]*)"$/ do |text|
  		  res = query("view {text LIKE '*#{text}*'}").empty?
  		  if res
    		screenshot_and_raise "No text found containing: #{text}"
  		  end
		end

	Related Teststeps:

	- Then I should see text ending with "suffix"

	- Then I should see text starting with "prefix"

	Then I should see text containing "sub text"


.. admonition:: teststep ios

	Checks all labels [UILabel] for text that ends with the provided suffix

	Examples:

	.. code-block:: cucumber

		Then I should see text ending with "suffix"

	Implementation: 

	.. code-block:: ruby 

		Then /^I (?:should)? see text ending with "([^\"]*)"$/ do |text|
  		  res = query("view {text ENDSWITH '#{text}'}").empty?
  		  if res
    		screenshot_and_raise "No text found ending with: #{text}"
  		  end
		end

	Related Teststeps:

	- Then I should see text containing "sub text"
	
	- Then I should see text starting with "prefix"

	Then I should see text ending with "suffix"


.. admonition:: teststep ios

	Checks to see if the view contains 2 input fields, the input fields can be replaced with buttons, or other elements.

	Examples:

	.. code-block:: cucumber

		Then I see 2 buttons

	Implementation: 

	.. code-block:: ruby 

		Then /^I see (\d+) (?:input|text) field(?:s)?$/ do |count|
  		  count = count.to_i
  		  cnt = query(:textField).count
  		  if cnt < count
      		screenshot_and_raise "Expected at least #{count} text/input fields, found #{cnt}"
  		  end
		end

	Then I see 2 input fields


.. admonition:: teststep ios

	Checks to see if the view contains an input field with the specified placeholder or accessibilityLabel. 

	Examples:

	.. code-block:: cucumber 

		Then I should see a "Username" input field 

	Implementation: 

	.. code-block:: ruby 

		Then /^I should see a "([^\"]*)" (?:input|text) field$/ do |expected_mark|
  		  res = element_exists("textField placeholder:'#{expected_mark}'") ||
        		element_exists("textField marked:'#{expected_mark}'")
  		  unless res
   			screenshot_and_raise "Expected textfield with placeholder or accessibilityLabel: #{expected_mark}"
  		  end
		end

	Related Teststeps:

	- Then I should not see a "Username" input field

	Then I should see a "Username" input field


.. admonition:: teststep ios

	Checks to see if the view does not contain an input field with the specified placeholder or accessibilityLabel. 

	Examples:

	.. code-block:: cucumber 

		Then I should not see a "Username" input field 

	Implementation: 

	.. code-block:: ruby 

		Then /^I should not see a "([^\"]*)" (?:input|text) field$/ do |expected_mark|
 		  res = query("textField placeholder:'#{expected_mark}'")
  		  res.concat query("textField marked:'#{expected_mark}'")
  		  unless res.empty?
    		screenshot_and_raise "Expected no textfield with placeholder nor accessibilityLabel: #{expected_mark}, found #{res}"
  		  end
		 end

	Related Teststeps:

	- Then I should see a "Username" input field

	Then I should not see a "Username" input field


.. admonition:: teststep ios

	Checks the views to see if there is a user location (blue dot) [MKUserLocation] inside a map [UIMapView].

	Examples:

	.. code-block:: cucumber

		Then I should see the user location

	Implementation: 

	.. code-block:: ruby 

		Then /^I should see (?:the)? user location$/ do
  		  check_element_exists("view:'MKUserLocationView'")
		end

	Then I should see the user location


.. admonition:: teststep ios

	This step checks if a mapview is on the screen.

	Examples:

	.. code-block:: cucumber

		Then I should see a map

	Implementation

	.. code-block:: ruby 

		Then /^I should see a map$/ do
  		  check_element_exists("view:'MKMapView'")
		end

	Then I should see a map


.. admonition:: teststep android

	Asserts that specified text can not be found. If Calabash is able to find the text, then the teststep fails.

	Examples: 

	.. code-block:: cucumber 

			Then I don't see "Hello"

	Implementation: 

	.. code-block:: ruby 

			Then /^I don't see "([^\"]*)"$/ do |text|
			  wait_for_text_to_disappear(text, timeout: 10)
			end

	Then I don't see “text"


Input
-----

.. admonition:: teststep ios

	Enters “text” into the input / text field [UITextField] which has the placeholder text set as “label”

	Examples:

	.. code-block:: cucumber

		Then I enter "user@testmunk.com" into the "Email Address" input field

	Implementation:

	.. code-block:: ruby 

		Then /^I enter "([^\"]*)" into the "([^\"]*)" field$/ do |text_to_type, field_name|
  		  touch("textField marked:'#{field_name}'")
  		  wait_for_keyboard()
  		  keyboard_enter_text text_to_type
  		  sleep(STEP_PAUSE)
		end

	Then I enter "text to write" into the "placeholder" input field


.. admonition:: teststep ios android

	Enters “text” into the relevant input / text field [UITextField]. If there are several input fields you will need to check which input field number is correct.

	Examples:

	.. code-block:: cucumber

		Then I enter "First name" into input field number 1

	Implementation iOS:

	.. code-block:: ruby 

		Then /^I enter "([^\"]*)" into (?:input|text) field number (\d+)$/ do |text, index|
  		  index = index.to_i
  		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
  		  touch("textField index:#{index-1}")
  		  wait_for_keyboard()
  		  keyboard_enter_text text
 		  sleep(STEP_PAUSE)
		end

	Implementation Android:

	.. code-block:: ruby 

		Then /^I enter "([^\"]*)" into input field number (\d+)$/ do |text, index|
  		  enter_text("android.widget.EditText index:#{index.to_i-1}", text)
		end

	Then I enter "text" into input field number 1


.. admonition:: teststep ios android

	Clears the text field [UITextField][UITextView].

	Examples:

	.. code-block:: cucumber

		Then I clear "Email Address"

	Implementation iOS:

	.. code-block:: ruby 

		When /^I clear "([^\"]*)"$/ do |name|
  		  msg = "When I clear <name>' will be deprecated because it is ambiguous - what should be cleared?"
  		  _deprecated('0.9.151', msg, :warn)
  		  clear_text("textField marked:'#{name}'")
		end

	Implementation Android:

	.. code-block:: ruby 

		Then /^I clear input field with id "([^\"]*)"$/ do |id|
  		  clear_text("android.widget.EditText id:'#{id}'")
		end

	Then I clear "placeholder"


.. admonition:: teststep ios android

	Clears the text from the specified input / text field [UITextField]. If there are several input fields you will need to check which input field number is correct.

	Examples:

	.. code-block:: cucumber

		Then I clear input field number 1

	Implementation iOS:

	.. code-block:: ruby 

		Then /^I clear (?:input|text) field number (\d+)$/ do |index|
  		  index = index.to_i
  		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
  		  clear_text("textField index:#{index-1}")
		end

	Implementation Android:

	.. code-block:: ruby 

		Then /^I clear input field with id "([^\"]*)"$/ do |id|
  		  clear_text("android.widget.EditText id:'#{id}'")
		end

	Then I clear input field number 1


.. admonition:: teststep android

	Finds the timepicker with the specified index and changes the time.

	Examples:

	.. code-block:: cucumber

		Given I set the time to "14:00" on TimePicker with index "5"		

	Implementation:

	.. code-block:: ruby 

		Given /^I set the time to "(\d\d:\d\d)" on TimePicker with index ([^\"]*)$/ do |time, index|
  		  set_time("android.widget.TimePicker index:#{index.to_i-1}", time)
		end

	Given I set the time to "14:00" on TimePicker with index "5"


.. admonition:: teststep android

	Finds the timepicker with the specified index and changes the time.

	Examples:

	.. code-block:: cucumber

		Given I set the "timePickerLabel" time to "14:00"		

	Implementation:

	.. code-block:: ruby 

		Given /^I set the "([^\"]*)" time to "(\d\d:\d\d)"$/ do |content_description, time|
  		  set_time("android.widget.TimePicker {contentDescription LIKE[c] '#{content_description}'}", time)
		end

	Given I set the "timePickerLabel" time to "14:00"


.. admonition:: teststep android

	Finds the datepicker by content description and changes the date.

	Examples:

	.. code-block:: cucumber

		Given I set the "what_is_the_date" date to "31-12-1999"

	Implementation: 

	.. code-block:: ruby 

		Given /^I set the "([^\"]*)" date to "(\d\d-\d\d-\d\d\d\d)"$/ do |content_description, date|
  		  set_date("android.widget.DatePicker {contentDescription LIKE[c] '#{content_description}'}", date)
		end

	Given I set the "datePickerLabel" date to "31-12-1999"


.. admonition:: teststep android

	Enters the specified text into the input field with the specified id.

	Examples:

	.. code-block:: cucumber: 

		Then I enter text "Hello" into field with id "type_here"

	Implementation:

	.. code-block:: ruby

		Then /^I enter text "([^\"]*)" into field with id "([^\"]*)"$/ do |text, id|
  		  enter_text("android.widget.EditText id:'#{id}'", text)
		end

	Then I enter text "text" into field with id "fieldId"


.. admonition:: teststep android

	Enters the specified text into the input field that has the specified content description.

	Examples:

	.. code-block:: cucumber

			Then I enter "Hello" as "text"

	Implementation: 
		
	.. code-block:: ruby

			Then /^I enter "([^\"]*)" as "([^\"]*)"$/ do |text, content_description|
  			  enter_text("android.widget.EditText {contentDescription LIKE[c] '#{content_description}'}", text)
			end

	Then I enter "text" as "fieldId"


.. admonition:: teststep android

	Enters the specified text into the input field that has the specified content description.

	Examples:

	.. code-block:: cucumber

			Then I enter "Hello" into "type_here"

	Implementation: 
		
	.. code-block:: ruby

			Then /^I enter "([^\"]*)" into "([^\"]*)"$/ do |text, content_description|
  			  enter_text("android.widget.EditText {contentDescription LIKE[c] '#{content_description}'}", text)
			end

	Then I enter "text" into "fieldId"


.. admonition:: teststep android

	Clears the text of the input field with the specified id.

	Examples:

	.. code-block:: cucumber

		Then I clear input field with id "type_here"

	Implementation:

	.. code-block:: ruby 

		Then /^I clear input field with id "([^\"]*)"$/ do |id|
  		  clear_text("android.widget.EditText id:'#{id}'")
		end

	Then I clear input field with id "fieldId"


.. admonition:: teststep android

	Finds the spinner marked by the specified 'spinner_identifier' or has a childview marked by the specified 'spinner_identifier'. It then selects the menu item marked by the specified 'item_identifier'.

	Examples:

	.. code-block:: cucumber

		Then I select "Hello" from "spinner"

	Implementation:

	.. code-block:: ruby

		Then /^I select "([^\"]*)" from "([^\"]*)"$/ do |item_identifier, spinner_identifier|
  		  spinner = query("android.widget.Spinner marked:'#{spinner_identifier}'")

  		  if spinner.empty?
   		    tap_when_element_exists("android.widget.Spinner * marked:'#{spinner_identifier}'")
  		  else
  		    touch(spinner)
 		  end

  		  tap_when_element_exists("android.widget.PopupWindow$PopupViewContainer * marked:'#{item_identifier}'")
		end

	Then I select "item text" from "spinnerLabel"


Waiting
-------

.. admonition:: teststep ios

	Makes the testrun wait until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.

	Examples:

	.. code-block:: cucumber

		Then I wait to see "Welcome"
		Then I wait to see "Please log in:"

	Implementation:

	.. code-block:: ruby

		Then /^I wait to see "([^\"]*)"$/ do |expected_mark|
  		  wait_for(WAIT_TIMEOUT) { view_with_mark_exists( expected_mark ) }
		end

	Related Teststeps:

	- Then I wait for "text or label" to appear

	Then I wait to see "text or label"


.. admonition:: teststep ios

	Waits until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.
	
	Examples:

	.. code-block:: cucumber

		Then I wait for "Welcome" to appear

	Implementation:

	.. code-block:: ruby

		Then /^I wait for "([^\"]*)" to appear$/ do |name|
  		  macro %Q|I wait to see "#{name}"|
		end

	Related Teststeps:

	- Then I wait to see "text or label"

	Then I wait for "text or label" to appear


.. admonition:: teststep ios

	This will wait until an element with the label or text provided has disappeared.

	Examples:

	.. code-block:: cucumber

		Then I wait until I don't see "loading..."

	Implementation:

	.. code-block:: ruby

		Then /^I wait until I don't see "([^\"]*)"$/ do |expected_mark|
  		  sleep 1## wait for previous screen to disappear
  		  wait_for(WAIT_TIMEOUT) { not element_exists( "view marked:'#{expected_mark}'" )}
		end

	Related Teststeps:

	- Then I wait to not see "text or label"

	Then I wait until I don't see "text or label"


.. admonition:: teststep ios

	Waits until an element with the label or text provided has disappeared.

	Examples:

	.. code-block:: cucumber

		Then I wait to not see "loading..."

	Implementation:

	.. code-block:: ruby

		Then /^I wait to not see "([^\"]*)"$/ do |expected_mark|
  		  macro %Q|I wait until I don't see "#{expected_mark}"|
		end

	Related Teststeps:

	- Then I wait until I don't see "text or label"

	Then I wait to not see "text or label"


.. admonition:: teststep ios

	Waits for a button with the specified accessibility label to apprear. 

	Examples:

	.. code-block:: cucumber
		
		Then I wait for the "login" button to appear

	Implementation:

	.. code-block:: ruby

		Then /^I wait for the "([^\"]*)" button to appear$/ do |name|
  		  wait_for(WAIT_TIMEOUT) { element_exists( "button marked:'#{name}'" ) }
		end

	Then I wait for the "login" button to appear


.. admonition:: teststep ios

	Waits until the title in the navgation bar [UINavigationBar] changes to the provided text (ie. when the view changes), or the timeout occurs.

	Examples:

	.. code-block:: cucumber

		Then I wait to see a navigation bar titled "Welcome"
		Then I wait to see a navigation bar titled "Login"

	Implementation:

	.. code-block:: ruby

		Then /^I wait to see a navigation bar titled "([^\"]*)"$/ do |expected_mark|
 		  msg = "waited for '#{WAIT_TIMEOUT}' seconds but did not see the navbar with title '#{expected_mark}'"
  		  wait_for(:timeout => WAIT_TIMEOUT,
  		  		   :timeout_message => msg ) do
			all_items = query("navigationItemView marked:'#{expected_mark}'")
			button_items = query("navigationItemButtonView")
			non_button_items = all_items.delete_if { |item| button_items.include?(item) }
			!non_button_items.empty?
  		  end
		end

	Then I wait to see a navigation bar titled "title"


.. admonition:: teststep ios

	Waits until the specified input field appears.

	Examples:

	.. code-block:: cucumber

		Then I wait for the "Username" input field

	Implementation:

	.. code-block:: ruby

		Then /^I wait for the "([^\"]*)" (?:input|text) field$/ do |placeholder_or_view_mark|
  		  wait_for(WAIT_TIMEOUT) {
   		    element_exists( "textField placeholder:'#{placeholder_or_view_mark}'") ||
          		element_exists( "textField marked:'#{placeholder_or_view_mark}'")
  		  }
		end

	Then I wait for the "label" input field


.. admonition:: teststep ios

	Waits until the relevant number of textfields are loaded.

	Examples:

	.. code-block:: cucumber

		Then I wait for 2 input fields

	Implementation: 

	.. code-block:: ruby

		Then /^I wait for (\d+) (?:input|text) field(?:s)?$/ do |count|
  		  count = count.to_i
  		  wait_for(WAIT_TIMEOUT) { query(:textField).count >= count  }
		end

	Then I wait for 2 input fields


.. admonition:: teststep ios

	Waits for X seconds

	Examples:

	.. code-block:: cucumber

		Then I wait for 1 second
		Then I wait for 2 seconds
		Then I wait for 2.4 seconds

	Implementation: 

	.. code-block:: ruby

		Then /^I wait for ([\d\.]+) second(?:s)?$/ do |num_seconds|
  	  	  num_seconds = num_seconds.to_f
  		  sleep num_seconds
		end

	Then I wait for X seconds

.. admonition:: teststep ios android

	Waits for 2 seconds. 

	Examples:

	.. code-block:: cucumber

		Then I wait 

	Implementation:

	.. code-block:: ruby

		Then /^I wait$/ do
  		  sleep 2
		end

	Then I wait


.. admonition:: teststep android

	Waits until there are no more progress bars.

	Examples:

	.. code-block:: cucumber

		Then I wait for progress

	Implementation:

	.. code-block:: ruby

		Then /^I wait for progress$/ do
  		  wait_for_element_does_not_exist("android.widget.ProgressBar")
		end

	Then I wait for progress


.. admonition:: teststep android

	Description coming soon!

	Then I wait for dialog to close


.. admonition:: teststep android

	This teststep will make the testrun wait until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.

	Examples:

	.. code-block:: cucumber

		Then I wait to see "Welcome"
		Then I wait to see "Please log in:"

	Implementation:

	.. code-block:: ruby 

		Then /^I wait to see "([^\"]*)"$/ do |text|
  		  wait_for_text(text)
		end

	Then I wait to see "text or label"


.. admonition:: teststep android

	Waits until the label [UILabel] with the text appears, or any other element eg. button [UIButton] appears.

	Examples: 

	.. code-block:: cucumber 

		Then I wait for "Hello" to appear 

	Implementation: 

	.. code-block:: ruby 

		Then /^I wait for "([^\"]*)" to appear$/ do |text|
  		  wait_for_text(text)
		end

	Then I wait for "text or label" to appear


.. admonition:: teststep android

	Waits up to 5 seconds for the specified text, or any other element e.g. [UIButton], to appear. 

	Examples: 

	.. code-block:: cucumber 

			Then I wait up to 5 seconds for "Click me" to appear

	Implementation:

	.. code-block:: ruby 

			Then /^I wait up to (\d+) seconds for "([^\"]*)" to appear$/ do |timeout, text|
  			  wait_for_text(text, timeout: timeout.to_i)
			end

	Related Teststeps:

	- Then I wait up to 5 seconds to see "text or label"

	Then I wait up to 5 seconds for "text or label" to appear


.. admonition:: teststep android

	Waits up to 5 seconds for the specified text, or any other element e.g. [UIButton], to appear. 

	Examples: 

	.. code-block:: cucumber 

			Then I wait up to 5 seconds to see "Click me"

	Implementation:

	.. code-block:: ruby 

			Then /^I wait up to (\d+) seconds to see "([^\"]*)"$/ do |timeout, text|
  			  wait_for_text(text, timeout: timeout.to_i)
			end

	Related Teststeps:

	- Then I wait up to 5 seconds for "text or label" to appear

	Then I wait up to 5 seconds to see "text or label"


.. admonition:: teststep android

	Waits for a button with the specified accessibility label to apprear. 

	Examples:

	.. code-block:: cucumber
		
		Then I wait for the "login" button to appear

	Implementation:

	.. code-block:: ruby

		Then /^I wait for the "([^\"]*)" button to appear$/ do |identifier|
  		  wait_for_element_exists("android.widget.Button marked:'#{identifier}'");
		end

	Then I wait for the "id" button to appear


.. admonition:: teststep android

	Waits for a screen with the specified id to apprear. 

	Examples:

	.. code-block:: cucumber
		
		Then I wait for the "home" screen to appear

	Implementation:

	.. code-block:: ruby

		Then /^I wait for the "([^\"]*)" screen to appear$/ do |activity_name|
  		  wait_for_activity(activity_name)
		end

	Then I wait for the "id" screen to appear


.. admonition:: teststep android

	Waits for the view with the specified viewID to appear 

	Examples:

	.. code-block:: cucumber

		Then I wait for the view with id "checkout" to appear

	Implementation:

	.. code-block:: ruby 

		Then /^I wait for the view with id "([^\"]*)" to appear$/ do |id|
		  wait_for_element_exists("* id:'#{id}'")
		end

	Then I wait for the view with id "viewId" to appear


.. admonition:: teststep android

	Waits up to 5 seconds for the screen with the specified id to appear (the test will move on if id is found before 5 seconds is up).

	Examples: 

	.. code-block:: cucumber 

			Then I wait up to 5 seconds for the "checkout" screen to appear 

	Implementation:

	.. code-block:: ruby 

			Then /^I wait upto (\d+) seconds for the "([^\"]*)" screen to appear$/ do |timeout, activity_name|
			  wait_for_activity(activity_name, timeout: timeout.to_i)
			end

	Related Teststeps:

	- Then I wait for the view with id "viewId" to appear

	Then I wait up to 5 seconds for the "id" screen to appear


.. admonition:: teststep android

	Waits for 1 second. 

	Examples:

	.. code-block:: cucumber

		Then I wait for a second

	Implementation:

	.. code-block:: ruby

		Then /^I wait for 1 second$/ do
  		  sleep 1
		end

	Related Teststeps:

	- Then I wait for 5 seconds 

	Then I wait for a second


.. admonition:: teststep android

	Waits for X seconds.

	Examples:

	.. code-block:: cucumber

		Then I wait for 1 second
		Then I wait for 2 seconds
		Then I wait for 2.4 seconds

	Implementation: 

	.. code-block:: ruby

		Then /^I wait for (\d+) seconds$/ do |seconds|
  		  sleep(seconds.to_i)
		end

	Related Teststeps:

	- Then I wait for a second

	Then I wait for X seconds


Buttons
-------

.. admonition:: teststep ios android

	Simulates the user pressing the back button

	Examples:

	.. code-block:: cucumber

			Then I go back

	Implementation iOS: 

	.. code-block:: ruby

		Then /^I go back$/ do
  		  touch("navigationItemButtonView first")
  		  sleep(STEP_PAUSE)
		end

	Implementation Android: 

	.. code-block:: ruby

		Then /^I go back$/ do
  		  press_back_button
		end

	Then I go back


.. admonition:: teststep android

	Simulates the user pressing the menu key

	Examples:

	.. code-block:: cucumber

		Then I press the menu key

	Implementation: 

	.. code-block:: ruby

		Then /^I press the menu key$/ do
  		  press_menu_button
		end

	Then I press the menu key


.. admonition:: teststep android

	Simulates the user pressing the enter button

	Examples:

	.. code-block:: cucumber

			Then I press the enter button

	Implementation: 

	.. code-block:: ruby

		Then /^I press the enter button$/ do
 		  perform_action('send_key_enter')
		end

	Then I press the enter button


Gestures
--------

.. admonition:: teststep ios android

	Performs a swipe gesture arbitrarily on the screen.

	Examples:

	.. code-block:: cucumber

		Then I swipe left

	Implementation iOS: 

	.. code-block:: ruby

		Then /^I swipe (left|right|up|down)$/ do |dir|
  	  	  swipe(dir)
  	   	  sleep(STEP_PAUSE)
		end

	Implementation Android: 

	.. code-block:: ruby

		Then /^I swipe left$/ do
  		  perform_action('swipe', 'left')
		end

	Options:

	You can use left, right up or down as parameters.

	Then I swipe left/right/up/down


.. admonition:: teststep ios

	Swipes a scroll view by index/number (and offset), or accessibilityLabel.

	Examples:

	.. code-block:: cucumber

		Then I swipe left on number 2

	Implementation: 

	.. code-block:: ruby

		Then /^I swipe (left|right|up|down) on number (\d+)$/ do |dir, index|
  		  index = index.to_i
  		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
  		  swipe(dir, {:query => "scrollView index:#{index-1}"})
  		  sleep(STEP_PAUSE)
		end

	Then I swipe left on number 2


.. admonition:: teststep ios

	Swipes a scroll view by index/number (and offset), or accessibilityLabel at a specified set of coordinates. Note that the coordinate system is for the element. 

	Examples:

	.. code-block:: cucumber

		Then I swipe left on number 2 at x 20 and y 10

	Implementation: 

	.. code-block:: ruby

		Then /^I swipe (left|right|up|down) on number (\d+) at x (\d+) and y (\d+)$/ do |dir, index, x, y|
  		  index = index.to_i
  		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
  		  swipe(dir, {:offset => {:x => x.to_i, :y => y.to_i}, :query => "scrollView index:#{index-1}"})
  		  sleep(STEP_PAUSE)
		end		

	Then I swipe left on number 2 at x 20 and y 10


.. admonition:: teststep ios

	Swipes in the direction given, on the object which contains the mentioned accessibility label.

	Examples:

	.. code-block:: cucumber

		Then I swipe right on "Morocco"

	Implementation: 

	.. code-block:: ruby 

		Then /^I swipe (left|right|up|down) on "([^\"]*)"$/ do |dir, mark|
    	  swipe(dir, {:query => "view marked:'#{mark}'"})
    	  sleep(STEP_PAUSE)
		end

	Options:

	Direction can be left, right, up and down

	Related Teststeps:

	- Then I swipe left/right

	Then I swipe left/right/up/down on "accLabel"


.. admonition:: teststep ios

	Swipes a specified table cell by number

	Examples:

	.. code-block:: cucumber

		Then I swipe on cell number 2

	Implementation: 

	.. code-block:: ruby 

		Then /^I swipe on cell number (\d+)$/ do |index|
  		  index = index.to_i
  		  screenshot_and_raise "Index should be positive (was: #{index})" if (index<=0)
		  cell_swipe({:query => "tableViewCell index:#{index-1}"})
  		  sleep(STEP_PAUSE)
		end

	Then I swipe on cell number 2


.. admonition:: teststep ios

	Performs a pinch gesture on the screen.

	Examples:

	.. code-block:: cucumber

		Then I pinch to zoom in
		Then I pinch to zoom out

	Implementation: 

	.. code-block:: ruby

		Then /^I pinch to zoom (in|out)$/ do |in_out|
  		  pinch(in_out)
  		  sleep(STEP_PAUSE)
		end

	Options:

	Parameter (zoom in) can also be zoom out

	Then I pinch to zoom in


.. admonition:: teststep ios

	Performs a pinch gesture on the specified element. 

	Examples:

	.. code-block:: cucumber

		Then I pinch to zoom in on "image"

	Implementation: 

	.. code-block:: ruby

		Then /^I pinch to zoom (in|out) on "([^\"]*)"$/ do |in_out, name|
  		  pinch(in_out,{:query => "view marked:'#{name}'"})
  		  sleep(STEP_PAUSE)
		end

	Options:

	Parameter (zoom in) can also be zoom out

	Then I pinch to zoom in on "accLabel"


.. admonition:: teststep ios

	Attempts to scroll on the specified accessibility label.

	Examples:

	.. code-block:: cucumber

		Then I scroll down
		Then I scroll up

	Implementation: 

	.. code-block:: ruby

		Then /^I scroll (left|right|up|down) on "([^\"]*)"$/ do |dir,name|
  		  scroll("view marked:'#{name}'", dir)
  		  sleep(STEP_PAUSE)
		end

	Options:

	The last parameter (down) can also be up, left and right.

	Then I scroll down on "accLabel"


.. admonition:: teststep ios android

	Attempts to arbitrarily scroll down on the view.

	Examples:

	.. code-block:: cucumber

		Then I scroll down
		Then I scroll up

	Implementation iOS: 

	.. code-block:: ruby

		Then /^I scroll (left|right|up|down)$/ do |dir|
  		  scroll("scrollView index:0", dir)
  		  sleep(STEP_PAUSE)
		end

	Implementation Android: 

	.. code-block:: ruby
	
		Then /^I scroll down$/ do
  		  scroll_down
		end

	Options:

	The parameter (down) can also be up, left or right.

	Then I scroll down


.. admonition:: teststep android

	Selects the option with the specified id from the menu. 

	Examples:

	.. code-block:: cucumber

		Then I select "green" from the menu 

	Implementation: 

	.. code-block:: ruby

		Then /^I select "([^\"]*)" from the menu$/ do |identifier|
 		  select_options_menu_item(identifier)
		end

	Then I select "id" from the menu


.. admonition:: teststep android

	Drags from one point on the screen to another. Note the number of steps is a parameter that defines how many steps are in the swipe between the specified coordinates. 

	Examples:

	.. code-block:: cucumber

		Then I drag from 50:100 to 50:250 moving with 20 steps

	Implementation: 

	.. code-block:: ruby

		Then /^I drag from (\d+):(\d+) to (\d+):(\d+) moving with (\d+) steps$/ do |from_x, from_y, to_x, to_y, steps|
  		  perform_action('drag', from_x, to_x, from_y, to_y, steps)
		end

	Then I drag from 50:100 to 50:250 moving with 20 steps
