/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var dataid = {
			"userId": "2005",
			"pid": "12",
			"pType": "34",
			"count": "12445"
	   };

	   regdata = {
		"email": "zack@gmail.com",
		  "name": "Zack",
		  "password": "zacky12"
		};

		$("#create-order-id").click(function(){
			alert('create order-- clicked');
			$.ajax({
				url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/user/createOrder',
				// url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/user/fetchAllOrders?userId=2005',
				// url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/user/fetchOrder?orderId=12&userId=2005',
				// url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/user/download?orderId=12&userId=2005',
				// url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/register',
				beforeSend: function(request) {
					request.setRequestHeader("authToken", 'd1c93f89-a95b-4c06-a01d-5b9ab7b6064a');
					// request.setRequestHeader("accept", 'application/json');
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				// contentType: 'application/json; charset=utf-8',
				// data: JSON.stringify(dataid),
				// data: {
				// 	"email": "zack@gmail.com",
				// 	  "name": "Zack",
				// 	  "password": "zacky12"
				// },
				data: JSON.stringify(dataid),
				// data: JSON.stringify(regdata),
				success: function(data) {
					alert('create orderoooooooo successsssss');
				  console.log('succes: ', data);
				},
				error: function(data) {
					alert('create orderooooo error');
					console.log('failure: ', data);
				}
			  });
		});
	});

})(jQuery);