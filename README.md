# rte-angular

An AngularJS rich-text editor

## Browser support

This rich-text editor was tested with Chrome. It may not work as expected with other browsers.

## Usage

Copy the files in `src/rte` into your application. Add 'rte-angular' to your angular.module:

    angular.module('myapp', ['rte-angular']);

And create the rich-text editor in your markup:

    <rte ng-model="myModel"></rte>

See `demo/index.html` to see its use in context.

## Setup

### Installing client-side dependencies

The client-side dependencies are managed with [Bower](http://bower.io/). If you have Node.js, you can install Bower as follows:

    npm install -g bower

You can then install the packages listed in `bower.json` with the following command:

    bower install

### Running the demo

Note that Chrome has strict permissions for reading files from the local file system. The best way to run the demo is to use any static file web server. For example, if you have Node.js, consider using `http-server`:

    npm install -g http-server

To run the server, simply navigate to the directory where the files have been saved and type:

    http-server

The demo should be up and running at [http://localhost:8080/demo/](http://localhost:8080/demo/).