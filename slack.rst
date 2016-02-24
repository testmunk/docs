Slack Integration
=================

Here at testmunk we are big fans of Slack. We use it daily; it makes collaboration easier and work more productive. We also, of course, spend a lot of time thinking about how we can make the lives of developers and QA engineers easier, especially when it comes to their mobile app testing.

We are therefore excited to share that, starting today, in addition to our REST API and email notifications, our clients can report Testmunk test results to a Slack channel as they are executed.

Test results from your test runs can now be directly posted to your specific Slack channel. This means your mobile development or QA team can stay instantly up to date on the latest test results:

.. image:: /_static/img/slack1.png

Setup Guide
-----------


Testmunk - Slack integration allows you to post test results from your test runs directly to a specific slack channel.

Slack integration can be set up by accessing Account Settings (top right dropdown) ->  Notification Tab.

.. image:: /_static/img/slack2.png


The Webhook URL needs to be taken from your Slack account. You need to follow the steps below:

1. Go to the Slack integration settings page: https://<TEAM_ID>.slack.com/apps/manage/custom-integrations

.. image:: /_static/img/slack3.png

2. Click on Incoming Webhooks

.. image:: /_static/img/slack4.png

3. Click on Add Configuration

.. image:: /_static/img/slack5.png

4. Choose the channel where the notification should be posted, and click Add Incoming WebHooks integration.

.. image:: /_static/img/slack6.png

5. You can now see the Webbook URL, copy this; then scroll down and click on save settings:

6. Go back to the Testmunk settings page and paste the Webhook URL; then click Enable.

7. Start a test run and get the notification in Slack! It'll be like the example notification at the top of this post.

8. If you want to disable the notification, simply access the notification tab in settings again and click Disable. You will no longer be notified of the test runs in slack.

.. image:: /_static/img/slack7.png
