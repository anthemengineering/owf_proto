/*
 * This software is copyright 2013 by TexelTek, Inc. It is licensed to the US Government under an Unlimited Rights
 * License in all deliverables. See the NOTICE file distributed with this work for additional information regarding
 * copyright ownership. You may not use or redistribute this file except in compliance with the License. Under no
 * circumstances should this file be altered or distributed without the permission of the US Government.
 */
/**
 * This is the public Panopticon API for OWF deployments.
 *
 *
 * API Summary:
 *
 * There are currently two publicly available interfaces:
 *      Panopticon.version
 *          Provides the version number for this API
 *
 *      Panopticon.open()
 *          Opens a Panopticon widget within OWF
 */

/**
 * API Details: Panopticon.version
 *
 * Provides the version number for this API
 *
 * returns {String} version API version number
 *
 * @example
 *
 * var version = Panopticon.version;
 */

/**
 * API Details: Panopticon.open()
 *
 * Opens a Panopticion within the OWF
 *
 * parameters:
 * {Object} obj required object - see below for properties
 *              {String} id (required): profile id
 *              {String} type (required): type of profile, e.g. Person, Car, etc
 *              {String} widgetid (optional): id of Panopticon widget to open, defaults to "profile".
 *              {Boolean} singleton (optional): if true, only one widget of the given type will be opened,
 *                        i.e. if a widget is already open then that widget will be activated instead.
 *              {String} path (optional): when specified will override the regular algorithm used to determine
 *                        path.  You probably don't want to use this.
 *              {Object} search (optional): when specified will augment the path with a query string using the key/value pairs
 *                        found in the provided search object.
 *
 * @example
 *
 * Panopticon.open({
 *          type: "Person",
 *          id: "268d08b9-a225-40c6-9e69-adfa3ad9d51e"
 * });
 *
 */
window.Panopticon = (function() {

	//Mozilla polyfill for bind
	if (!Function.prototype.bind) {
		Function.prototype.bind = function(oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				FNoop = function() {},
				fBound = function() {
					return fToBind.apply(this instanceof FNoop && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
				};

			FNoop.prototype = this.prototype;
			fBound.prototype = new FNoop();

			return fBound;
		};
	}

	var open = function(args) {

		if (!args.widgetid) {
			args.widgetid = "profile";
		}

		var launchOnly = args.singleton;

		//open a new widget and pass in the id as the widget launch data
		var foundWidgetDefinition = function(result) {
			var guid = result.path;

			var path = this.args.widgetid;
			if (this.args.type) {
				path += "/" + this.args.type;
				if (this.args.id) {
					path += "/" + this.args.id;
				}
			}
			if (args.path) {
				path = args.path;
			}

			if (args.search) {
				path += "?";
				for (var key in args.search) {
					path += key + "=" + args.search[key] + "&";
				}

				path = path.substring(0, path.length - 1);
			}

			var widgetid = this.args.widgetid;

			OWF.getOpenedWidgets(function(widgets) {

				var waiting = 0;
				var foundOne = false;

				var proxyCallback = function(proxy) {
					var instanceid = this.instanceid;
					proxy.whoDat(function(widgetPath) {
						waiting--;

						//some callback already found a matching widget
						if (foundOne) {
							return;
						}

						if (widgetPath.substring(0, 1) === "/") {
							widgetPath = widgetPath.substring(1);
						}

						//if this widget is matching, activate it, foundOne = true;
						if (widgetPath === path) {
							foundOne = true;
							//activate widget

							//all the following code is just to activate the widget
							//OWF for the win!
							var widgetEventingController = Ozone.eventing.Widget.getInstance();

							var widgetState = Ozone.state.WidgetState.getInstance();
							widgetState.activateWidget({
								guid: instanceid
							});
						}

						//if waiting === 0 then we're the last callback so we need to just
						//open a new widget
						if (waiting === 0 && !foundOne) {
							OWF.Launcher.launch({
								guid: guid,
								launchOnlyIfClosed: launchOnly,
								data: {
									location: '/' + path
								}
							});
						}
					});
				};

				for (var i = 0; i < widgets.length; i++) {
					var instanceid = widgets[i].id;

					//Earlier versions of OWF didnt return the universal name.  If we dont see it then just fallback to a
					//really simplistic check to see if its a "owf.html" url.  That could of course give us false positives
					//but then they would not pass the later check so it should not matter.
					if ((widgets[i].universalName && widgets[i].universalName.indexOf(".texeltek.com") !== -1) || (widgets[i].url.indexOf("/owf.html#/") !== -1)) {

						var panoWidgetId = widgets[i].url.substring(widgets[i].url.lastIndexOf("/") + 1);
						if (panoWidgetId === widgetid) {
							//this is a pano widget and the same one we want to launch
							//now lets check and see if its the same entity we are by checking the path

							waiting++;

							OWF.RPC.getWidgetProxy(instanceid, proxyCallback.bind({
								instanceid: instanceid
							}));
						}
					}
				}

				//if waiting === 0 then no widgets are open that are pano widgets of this.args.widgetid
				//so just launch a new widget
				if (waiting === 0) {
					OWF.Launcher.launch({
						guid: guid,
						launchOnlyIfClosed: launchOnly,
						data: {
							location: '/' + path
						}
					});
				}

			});

		};

		OWF.Preferences.getWidget({
			universalName: args.widgetid + '.texeltek.com',
			onSuccess: foundWidgetDefinition.bind({
				args: args
			}),
			onFailure: function(err) {
				throw new Error("Mediary is unable to find widget.  " + err);
			}
		});

	};

	return {
		version: "20130312",
		open: open
	};
})();