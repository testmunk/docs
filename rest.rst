REST API
========

API Overview
------------

Introduction
~~~~~~~~~~~~

The testmunk API provides a RESTful interface for your data on testmunk. It is the starting point for anyone who would like to integrate testmunk into another service, e.g. a Continuous Integration Server.

You can use the API to:

- Upload an app
- Upload an app and automatically start that testrun
- Start an existing testrun

Schema
~~~~~~

All API access is over HTTPS and accessed from the `api.testmunk.com` domain. All API responses are provided in JSON format. API requests need to be provided with the Content-Type `application/json`. The only exception is when you upload an app.

Here the Content-Type is `multipart/form-data` due to the fact that we receive large files.

Timestamps are returned in ISO 8601 format::

	YYYY-MM-DDTHH:MM:SSZ

Authentication
~~~~~~~~~~~~~~

All API requests are authenticated using your Testmunk API key. You can get the key of your organisation by:

1. Going to your `Testmunk Dashboard <https://testmunk.com/dashboard>`_, and
2. Clicking on the user icon in the navigation bar on the top right > ``Account Settings`` > ``Apps``.

We follow the typical HTTP Basic authentication scheme of providing a Base64 encoded hash of your authentication credentials in the HTTP request header. The credentials are simply your API key.

Apply Base64 strict encoding to your API key and include an HTTP header in your request using the following format::

	Authorization: Basic YOUR_BASE64_ENCODED_API_KEY.

If you are using ``curl`` you can rest easy – it takes care of the right encoding for you.

.. code-block:: console

	$ curl https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testruns

.. HINT::

	In this example, the key is AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW and is specified between the http protocol and the domain.

	API key

Versioning
~~~~~~~~~~

All API requests are subject to versioning. It is strongly advised that you specify a version when requesting resources through the API. This is done by supplying an HTTP ``Accept`` header with the appropriate version. In case you do not specify a version or you specify an invalid version, we will use the latest API version (currently ``v1``).

The versioning format is ``application/vnd.testmunk.v1+json`` where ``v1`` is the version identifier.

.. code-block:: console

	$ curl -H 'Accept: application/vnd.testmunk.v1+json' \
	       'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testruns'

Errors
~~~~~~

If your request results in an error, the API will respond with an HTTP status code in the 4xx class or 5xx class, depending on the cause. The body of the response will contain a JSON formatted error message using the following schema:

.. code-block:: javascript

	{
	  "message": "A human readable explanation of the problem",
	  "code": "A unique string identifying the problem e.g. ValidationFailed",
	  "errors": [ // Optional - only on ValidationFailed
	    {
	      "field" : "The property which was invalid",
	      "resource" : "The name of the invalid resource",
	      "code" : "A unique string identifying what is wrong with the field"
	    }
	  ]
	}

Error codes
~~~~~~~~~~~
You can decide how to handle errors in your code based on the HTTP status code. The status codes we respond in case of an error and what they mean:

- ``400 Bad Request``: One of your inputs was incorrectly encoded and could not be processed.

- ``401 Unauthorized``: You need to provide authentication credentials, or your credentials were rejected.

- ``422 Record is invalid``: One of the values you supplied for an attribute did not pass validation. The error object tells you more details about it. These are the possible validation error codes:

	+ ``MissingField``: The required field on a resource has not been set.
	+ ``Invalid``: The formatting of a field is invalid. The documentation for that resource should be able to give you more specific information.
	+ ``NotExist``: The resource does not exist.
	+ ``AlreadyExist``: Another resource has the same value as this field. This can happen in resources that must have some unique key (such as App names).

- ``500 Internal Server Error``: We messed up somewhere. We’ve been notified of the issue, and our engineering team will look into it.

Testruns API
------------

Create a new testrun
~~~~~~~~~~~~~~~~~~~~

Creates a new testrun based on an ``.ipa`` or ``.apk`` file. The testrun is automatically started if you set the parameter ``autoStart=true``. Request data needs to be sent as ``multipart/form-data``.

::

	POST /apps/:appName/testruns

Curl example
************

.. code-block:: console

	$ curl \
	  -H 'Accept: application/vnd.testmunk.v1+json' \
	  -F 'file=@iphone.ipa' \
	  -F 'email=hello@testmunk.com' \
	  -F 'autoStart=true' \
	  -F 'public=true' \
	  'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testruns'

Input
*****

+ ``appName`` (Required): Name of your Testmunk app.
+ ``file`` (Required): iOS or apk app file. Only the format .ipa and .apk allowed.
+ ``email`` (Optional): An email to this address will be sent after the testrun has been successfully executed. Needs to be an email address of an existing testmunk user.
+ ``testrunName`` (Optional): Name of the new testrun. If not specified, the name will get auto-generated, e.g. 'Testrun 10'
+ ``autoStart`` (Optional): true starts the testrun after upload.
+ ``public`` (Optional): All testruns URLs will automatically be public and can be shared with non testmunk users. Email notifications will also include the public link.

Response
********

::

	Status: 201 created

.. code-block:: javascript

	{
	  "id":"52299330e4b07118a7c2cad8",
	  "createdAt":"2013-09-06T08:32:51Z",
	  "appId":"510c4e26edaa8fcf7872032a",
	  "name":"Testrun 10",
	  "status":"NotStarted"
	}

Upload Testcases
~~~~~~~~~~~~~~~~

Updates the testcases based on an .zip file. Zip file should contain the zipped features folder, as you would upload to our website. Request data needs to be sent as multipart/form-data. The testcases currently on the server will get replaced with the ones uploaded and shall be used in future testruns.

::

	POST /apps/:appName/testcases

Curl Example
************

.. code-block:: console

	$ curl \
	 -H 'Accept: application/vnd.testmunk.v1+json' \
	 -F 'file=@features.zip' \
	 'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testcases'

Selecting Devices to Test On
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To select devices to test on, go to testmunk.com and navigate to ``Account Settings`` > ``REST API`` as seen here: https://cloud.githubusercontent.com/assets/9891442/5175494/7bd41172-73f0-11e4-965c-e7bf3c025a35.png

Start an existing testrun
~~~~~~~~~~~~~~~~~~~~~~~~~

Starts an existing testrun based on the testrunId. The testrun need to have the status ``NotStarted``.

::

	POST /testruns/:testrunId/run


Curl example
************

.. code-block:: console

	$ curl \
	  -X POST \
	  -H 'Accept: application/vnd.testmunk.v1+json' \
	  -H 'Content-Type: application/json' \
	  -d '{"email": "hello@testmunk.com"}' \
	  'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/testruns/52299330e4b07118a7c2cad8/run'

Input
*****

+ ``testrunId`` (Required).
+ ``email`` (Optional): An email to this address will be sent after the testrun has been successfully executed. Required if the userId field is not set. Needs to be an email address of an existing testmunk user.

.. code-block:: javascript

	{
	  "email": "markus@testmunk.com"
	}

Response
********

::

	Status: 200 Ok

.. code-block:: javascript

	{
	  "id":"52299330e4b07118a7c2cad8",
	  "createdAt":"2013-09-06T08:32:51Z",
	  "appId":"510c4e28edaa8fcf7912032a",
	  "name":"Testrun 10",
	  "status":"Waiting",
	  "numSuccess":0,
	  "numFailed":0
	}
