angular.module('starter')
.service('RegistrarDispositivosService', function($q){
	return {
		registrarDispositivo: function(SSID, pass, uid, alias_d, miScope, miHttp){
			var deferred = $q.defer();
			var promise = deferred.promise;

			miHttp.get('http://192.168.4.1/wifisave?s=' + SSID + '&p=' + pass + '&uid='+ uid +'&ad=' + alias_d)
			.success(function (data, status, headers, config) {
				console.log(data);
				if (status == 200) {
					deferred.resolve('Se ha registrado exitosamente el dispositivo.');
				}
			})
			.error(function (data, status, header, config) {
				deferred.reject('Error: ' + data);
				console.log("Error al realizar la peticion.");
			});

			promise.success = function(fn) {
				promise.then(fn);
				return promise;
			}
			promise.error = function(fn) {
				promise.then(null, fn);
				return promise;
			}
			return promise;
		}
	}
})