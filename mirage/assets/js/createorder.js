/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		$(document).on('click', '#create-order-id', function(){
			var createOrderData = {
				"userId": localStorage.getItem('userId'),
				"pid": $('#product-code').val(),
				"pType": $('#product-type').val(),
				"count": $('#product-count').val(),
				"extras": getExtras()
			 };

			var authToken = localStorage.getItem('authToken');
			$.ajax({
				url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8152/user/createOrder',
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(createOrderData),

				success: function(data) {
					var popupStatus =  data.Status;
					var popupMsg =  data.Message;
					$('#myModal .modal-body').text(data.Message);
					$('#myModal').modal('show');
					console.log('Isotope: Success - ', data);
				},
				error: function(data) {
					console.log('failure: ', data);
				}
			  });
		});

		function getExtras() {
			
			var clientId = $('#add-client-id').val();
			var manufDate = $('#add-manf-date').val();
			var expDate = $('#add-expiry-date').val();
			var skewId = $('#add-variation').val();
			var generic = $('#add-generic').val();

			var extras;

			if (clientId) {
				extras = clientId + '|'; 
			}
			if (manufDate) {
				extras = extras + manufDate + '|';
			}
			if (expDate) {
				extras = extras + expDate + '|';
			}
			if (skewId) {
				extras = extras + skewId + '|';
			}
			if (generic) {
				extras = extras + generic + '|';
			}

			return extras;
		}

		$("#createSuccess-close").click(function() {
			window.location.href="orders.html";
		});

		$(".dropdown-item").click(function(ele) {
			if(!$(this).is('[disabled=disabled]')) {
				var id = $(this).data('id');
				var placeholder = $(this).data('text');
				// $('#create-order-container').append('<div class="12u 12u$(xsmall)"><input type="text" id="' + id  
				// + ' "product-count" placeholder="' + placeholder 
				// + '"Product Count (Example:1234)" /></div>');
				$('#'+id).toggle();
				$(this).prop('disabled', true);
			} else {
				$(this).removeProp('disabled');
			}
			
		});

		$(".dropdown-item-generic").click(function(ele) {
				var id = $(this).data('id');
				var placeholder = $(this).data('text');
				$('#create-order-container').append('<div class="12u 12u$(xsmall)"><input type="text" id="' + id  
				+ ' "product-count" placeholder="' + placeholder 
				+ '"Product Count (Example:1234)" /></div>');
		});

	});

})(jQuery);
