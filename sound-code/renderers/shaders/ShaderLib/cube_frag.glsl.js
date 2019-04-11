export default /* glsl */`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = mapTexelToLinear( texColor );
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;
awaitLoad: async function (url) {
	var scope = this;
	var text=undefined;
	var loader = new FileLoader(scope.manager);
	loader.setPath(scope.path);
	text = await loader.load(url)
		.then(
			function (value) {
				text=JSON.parse(value);
			}
		).catch(
			function (error) {
				console.error(`THREE.FontLoader Error:${error}`);
			}
		);
	return text;
},

load: function (url, onLoad) {

	if (url === undefined) url = '';

	if (this.path !== undefined) url = this.path + url;

	url = this.manager.resolveURL(url);

	var scope = this;

	var cached = Cache.get(url);

	if (cached !== undefined) {

		scope.manager.itemStart(url);

		setTimeout(function () {

			if (onLoad) onLoad(cached);

			scope.manager.itemEnd(url);

		}, 0);

		return cached;

	}

	// Check if request is duplicate

	if (loading[url] !== undefined) {

		loading[url].push({
			onLoad: onLoad,
		});

		return;

	}

	// Check for data: URI
	var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
	var dataUriRegexResult = url.match(dataUriRegex);

	// Safari can not handle Data URIs through XMLHttpRequest so process manually
	if (dataUriRegexResult) {

		var mimeType = dataUriRegexResult[1];
		var isBase64 = !!dataUriRegexResult[2];
		var data = dataUriRegexResult[3];

		data = decodeURIComponent(data);

		if (isBase64) data = atob(data);

		try {

			var response;
			var responseType = (this.responseType || '').toLowerCase();

			switch (responseType) {

				case 'arraybuffer':
				case 'blob':

					var view = new Uint8Array(data.length);

					for (var i = 0; i < data.length; i++) {

						view[i] = data.charCodeAt(i);

					}

					if (responseType === 'blob') {

						response = new Blob([view.buffer], {
							type: mimeType
						});

					} else {

						response = view.buffer;

					}

					break;

				case 'document':

					var parser = new DOMParser();
					response = parser.parseFromString(data, mimeType);

					break;

				case 'json':

					response = JSON.parse(data);

					break;

				default: // 'text' or other

					response = data;

					break;

			}

			// Wait for next browser tick like standard XMLHttpRequest event dispatching does
			setTimeout(function () {

				if (onLoad) onLoad(response);

				scope.manager.itemEnd(url);

			}, 0);

		} catch (error) {

			// Wait for next browser tick like standard XMLHttpRequest event dispatching does
			setTimeout(function () {

				if (onError) onError(error);

				scope.manager.itemError(url);
				scope.manager.itemEnd(url);

			}, 0);

		}

	} else {

		// Initialise array for duplicate requests

		loading[url] = [];

		loading[url].push({

			onLoad: onLoad,

		});
		var request = new XMLHttpRequest();

		request.open('GET', url, true);


		return new Promise(function (resolve, reject) {
			request.addEventListener('load', function (event) {

				var response = this.response;

				Cache.add(url, response);

				var callbacks = loading[url];

				delete loading[url];

				if (this.status === 200 || this.status === 0) {

					// Some browsers return HTTP Status 0 when using non-http protocol
					// e.g. 'file://' or 'data://'. Handle as success.

					if (this.status === 0) console.warn('THREE.FileLoader: HTTP Status 0 received.');

					for (var i = 0, il = callbacks.length; i < il; i++) {

						var callback = callbacks[i];
						resolve(response);
						//callback.onLoad(response);

					}

					//scope.manager.itemEnd(url);

				} else {

					for (var i = 0, il = callbacks.length; i < il; i++) {

						var callback = callbacks[i];
						reject(event); //callback.onError(event);

					}

				}

			}, false);


			request.send(null);
		});
	}

	scope.manager.itemStart(url);
	console.log(request);
	return request;

},