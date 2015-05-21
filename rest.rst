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

Email notifications
~~~~~~~~~~~
Results of your testruns will be send as an email notification. You can define the recipients under Notifications tab in Account Settings on the `Testmunk Dashboard <https://testmunk.com/dashboard>`_.


App API
------------

List current apps for your organisation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

	GET /apps

Curl example
************

.. code-block:: console

    curl -X GET \
      -H 'Accept: application/vnd.testmunk.v1+json' \
      'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps'

Output
******

.. code-block:: javascript

    [
        {
            "id": "547f90d9a0eed17d87987355",
            "createdAt": "2014-12-03T22:38:17Z",
            "organisationId": "531df352a4b0c9d6f7b7bdfa",
            "name": "IOS-project"
        },
        {
            "id": "54b5a1d4e4b0ed04cd79f654",
            "createdAt": "2015-01-13T22:53:08Z",
            "organisationId": "531df352a4b0c9d6f7b7bdfa",
            "name": "Android-project"
        }
    ]

Create a new App
~~~~~~~~~~~~~~~~~

Creates a new app based on the provided name.

::

	POST /apps

Curl example
************

.. code-block:: console

    curl -X POST \
        -H 'Accept: application/vnd.testmunk.v1+json' \
        -H 'Content-Type: application/json' \
        -d '{"appName":"My-new-project"}' \
        "http://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/api/apps"

Input
*****

+ ``appName`` (Required): The new name for your app, has to be unique.

Output
******

The results come in pairs of ``[device name, OS version]``:

.. code-block:: javascript

    {
        "id":"54c427a8e4b0dee6ac5d89r4",
        "createdAt":"2015-01-24T23:15:52Z",
        "organisationId":"531pf381e7b0z9d6f7b7bdfb",
        "name":"My-new-project"
    }

Devices API
------------

Get available devices
~~~~~~~~~~~~~~~~~~~~~

Will return all available devices for your organisation, in JSON format.

::

	GET /devices

Curl example
************

.. code-block:: console

    curl -X GET \
      -H 'Accept: application/vnd.testmunk.v1+json' \
      'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/devices?platform=ios'

Input
*****

+ ``platform`` (Optional): Either ``ios`` or ``android``.

Output
******

The results come in pairs of ``[device name, OS version]``:

.. code-block:: javascript

    [["ipod-5-A","7.1"],["iphone-4s-A","7.1"],["ipad-3-B","8.1"],["iphone-6-A","8.1"]]

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
      -F 'testcases=@features.zip' \
	  -F 'email=hello@testmunk.com' \
	  -F 'autoStart=true' \
	  -F 'public=true' \
	  -F 'devices=ipod-5-A,iphone-4s-A,iphone-6-A' \
	  'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testruns'

Input
*****

+ ``appName`` (Required): Name of your Testmunk app.
+ ``file`` (Required): iOS or apk app file. Only the format .ipa and .apk allowed.
+ ``testcases`` (Required): Zip file containing the features folder. Zip file should contain the zipped features folder, as you would upload to our website.
+ ``email`` (Required): An email address of an account associated with the API key.
+ ``testrunName`` (Optional): Name of the new testrun. If not specified, the name will get auto-generated, e.g. 'Testrun 10'
+ ``autoStart`` (Optional): true starts the testrun after upload.
+ ``public`` (Optional): All testruns URLs will automatically be public and can be shared with non testmunk users. Email notifications will also include the public link.
+ ``devices`` (Optional): A comma separated list of ``device names``. You can get the device names from the `Devices API`_ endpoint. **You only need to set the device names, not the OS version**.

Response
********

::

	Status: 201 created

.. code-block:: javascript

    {
        "id":"52299330e4b07118a7c2cad8",
        "name":"Testrun 10",
        "app":"Testmunk",
        "status":"NotStarted",
        "counts":{
            "numSuccess":0,
            "numFailed":0,
            "numSkipped":0
        },
        "createdAt":"2015-02-07T00:43:17Z",
        "platform":"iOS",
        "devices":[
            "ipod-5-A,iphone-4s-A,iphone-6-A"
        ],
        "testcases":1,
        "stoppedByUser":false
    }

Selecting Devices to Test On
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To select devices to test on, go to testmunk.com and navigate to ``Account Settings`` > ``REST API``. Or you can also set the devices the moment you create a testrun using the `Create a new testrun`_ endpoint.

Start an existing testrun
~~~~~~~~~~~~~~~~~~~~~~~~~

Starts an existing testrun based on the testrunId. The testrun need to have the status ``NotStarted`` (setting autoStart=false when creating the testrun).

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
+ ``email`` (Required): An email address of an account associated with the API key.

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
        "name":"Testrun 10",
        "app":"Testmunk",
        "status":"Waiting",
        "counts":{
            "numSuccess":0,
            "numFailed":0,
            "numSkipped":0
        },
        "createdAt":"2015-02-07T00:43:17Z",
        "platform":"iOS",
        "devices":[
            "ipod-5-A,iphone-4s-A,iphone-6-A"
        ],
        "testcases":1,
        "stoppedByUser":false
    }


Get testrun status
~~~~~~~~~~~~~~~~~~

Returns information about a testrun with the specified ID, if it exists.  Useful to get the status of your testrun (failed, success)

::

	GET /apps/:appName/testruns/:testrunId

Curl example
************

.. code-block:: console

	$ curl \
	  -X GET \
	  -H 'Accept: application/vnd.testmunk.v1+json' \
	  'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/Testmunk/testruns/54d54fe03004286c71cb99e0'

Input
*****

+ ``testrunId`` (Required).
+ ``appName`` (Required): Name of your Testmunk app.

Response
********

::

	Status: 200 Ok

.. code-block:: javascript

    {
        "id":"54d54fe03004286c71cb99e0",
        "name":"Testrun 100",
        "app":"Testmunk",
        "status":"Success",
        "counts":{
            "numSuccess":1,
            "numFailed":0,
            "numSkipped":0
        },
        "createdAt":"2015-02-06T23:36:06Z",
        "startUserTime":"2015-02-06T23:40:19Z",
        "startExecutionTime":"2015-02-06T23:41:09Z",
        "endTime":"2015-02-06T23:41:52Z",
        "platform":"Android",
        "devices":[
            "lg-nexus-5-A"
        ],
        "testcases":1,
        "stoppedByUser":false
    }

Get list of testruns
~~~~~~~~~~~~~~~~~~~~

Returns a list of all the testruns for the given App, if it exists.

::

	GET /apps/:appName/testruns

*******

Curl example
************

.. code-block:: console

	$ curl \
	  -X GET \
	  -H 'Accept: application/vnd.testmunk.v1+json' \
	  'https://AQS0LCTvCv6mTwod5PwtU2i1JVY2J6rW@api.testmunk.com/apps/AppName/testruns'

Input
*****

+ ``appName`` (Required): Name of your Testmunk app.

Response
********

::

	Status: 200 Ok

.. code-block:: javascript

    [
        {
            "id":"54d54fe03004286c71cb99e0",
            "name":"Testrun 100",
            "app":"Testmunk",
            "status":"Success",
            "counts":{
                "numSuccess":1,
                "numFailed":0,
                "numSkipped":0
            },
            "createdAt":"2015-02-06T23:36:06Z",
            "startUserTime":"2015-02-06T23:40:19Z",
            "startExecutionTime":"2015-02-06T23:41:09Z",
            "endTime":"2015-02-06T23:41:52Z",
            "platform":"Android",
            "devices":[
                "lg-nexus-5-A"
            ],
            "testcases":1,
            "stoppedByUser":false
        },
        {
            "id":"34d54fe04904286c71cb87a1",
            "name":"Testrun 99",
            "app":"Testmunk",
            "status":"Success",
            "counts":{
                "numSuccess":2,
                "numFailed":0,
                "numSkipped":0
            },
            "createdAt":"2015-01-06T23:36:06Z",
            "startUserTime":"2015-01-06T23:40:19Z",
            "startExecutionTime":"2015-01-06T23:41:09Z",
            "endTime":"2015-01-06T23:41:52Z",
            "platform":"Android",
            "devices":[
                "lg-nexus-5-A"
            ],
            "testcases":2,
            "stoppedByUser":false
        }
    ]
