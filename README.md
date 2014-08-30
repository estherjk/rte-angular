# rte-angular

An AngularJS rich-text editor

## Browser Support

This rich-text editor was tested with Chrome. It may not work as expected with other browsers.

## Required Dependencies

* [AngularJS](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Font Awesome](http://fortawesome.github.io/Font-Awesome/)
* [jQuery](http://jquery.com/)

See `bower.json` for more details and include the specified versions in your project.

## Usage

Add 'rte-angular' to your angular.module:

    angular.module('myapp', ['rte-angular']);

And create the rich-text editor in your markup:

    <rte ng-model="myModel"></rte>

See `demo/index.html` to see its use in context.

## Running the Demo

Note that Chrome has strict permissions for reading files from the local file system. The best way to run the demo is to use any static file web server. For example, if you have Node.js installed, consider installing `http-server`:

    npm install http-server

To run the server, simply navigate to the directory where the files have been saved and type:

    http-server

The demo should be up and running at [http://localhost:8080/demo/](http://localhost:8080/demo/).