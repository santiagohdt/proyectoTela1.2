angular.module('starter')
.controller('RegistrarDispositivosCtrl', function($scope, $http, $rootScope, RegistrarDispositivosService, $ionicPopup, $state, $cordovaBarcodeScanner) {
	$scope.regDispositivo = {};
	$scope.listaRedes = [];
	$scope.idSeleccionado;

	$scope.sincronizar = function(){
		alert($scope.regDispositivo.SSID + " | " + $scope.regDispositivo.pass);
		var config = WifiWizard.formatWPAConfig($scope.regDispositivo.SSID, $scope.regDispositivo.pass);
		WifiWizard.addNetwork(config, function() {
			WifiWizard.connectNetwork($scope.regDispositivo.SSID, $scope.exitoConexion, $scope.fail);
		});
	};

	$scope.iniciarEscaneo = function(){
		WifiWizard.isWifiEnabled($scope.win, $scope.fail); // Win esta habilitado
	};

	$scope.win = function(){
		WifiWizard.startScan($scope.success, $scope.fail); // Inicia escaneo de redes.
	};

	$scope.success = function(){
		WifiWizard.getScanResults($scope.listHandler, $scope.fail); // Obtiene resutaldos del escaneo
	};

	$scope.listHandler = function(data){
		$scope.$apply(function () {
			$scope.listaRedes = data;
		});
	};

	$scope.exitoConexion = function(state){
		alert("Se ha conectado con exito !");
		// realizar peticion para configuracion de SSID, contraseña y UID  + Alias dispositivo. a http://192.168.4.1/wifisave?s=Natalia&p=asdf&uid=<uid>&alias=<Alias>
	};

	$scope.fail = function(err){
		alert("Error: " + err);
	};
})