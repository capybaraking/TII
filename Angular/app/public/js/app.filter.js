'use strict';

angular.module('app')
	/**
	 * Remplace les \n par <br> pour avoir les retours à la ligne
	 */
	.filter('nbr', function () {
	    return function(input) {
	        input = input || '';
	        return input.replace(/\n/g,'<br/>');
	    };
	});