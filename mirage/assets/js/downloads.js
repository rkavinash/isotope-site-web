/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#download-template").html();
		var template = Handlebars.compile(source);
	
		var authToken = localStorage.getItem('authToken');
        var userId = localStorage.getItem('userId');
        var orderId = localStorage.getItem('orderIDforDownload');
        $.ajax({
            url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8152/user/download?userId='+ userId + '&orderId='+ orderId,
            beforeSend: function(request) {
                request.setRequestHeader("authToken", authToken);
                request.setRequestHeader("content-type", 'application/json');
            },
            type: 'POST',
            success: function(data) {
                // alert('Isotope: fetch all orders Success');
                var context = { "downloaddata": data };
                var downloadhtml    = template(context);
                $('.table-wrapper').html(downloadhtml);
                console.log('success download: ', data);
            },
            error: function(data) {
                alert('download error');
                console.log('failure download: ', data);
            }
        });


        $(document).on("click", '.download-file', function() {
            console.log('download file = ', $(this).text().substring(1));
            var filename = $(this).text().substring(1);
			downloadFile(filename);
        });
        
        function downloadFile(filename) {
			var authToken = localStorage.getItem('authToken');
            var userId = localStorage.getItem('userId');
            var orderId = localStorage.getItem('orderIDforDownload');

            jQuery.ajax({
                type: "POST",
                data: {},
                url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8152/user/downloadFile?userId='+ userId +'&orderId=' + orderId + '&fileName='+ filename,
                dataType: 'json',
                beforeSend: function(request) {
                    request.setRequestHeader("authToken", authToken);
                    request.setRequestHeader("content-type", 'text/csv;charset=UTF-8');
                    // request.responseType = 'blob';
                },
                success: function (json) {
                    console.log('success download new', json);
                    var csv = JSON.parse(json.replace(/"([\w]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); }));
                    downloadFileNew(filename, encodeURIComponent(csv));
                },
                error: function(data) {
                    // $('#myModal .modal-body').text(JSON.parse(data.responseText).message);
                    // $('#myModal').modal('show');
                    console.log('error download New:', data.responseText);
                    // downloadFileNew('filename', encodeURIComponent(data.responseText));
                    downloadFileNew(filename, data.responseText);
                }
            });

        }
        
        function downloadFileNew(fileName, csv) {
            console.log('new download file funciton =>', fileName, csv);

            if (navigator.userAgent.indexOf('MSIE') !== -1
                || navigator.appVersion.indexOf('Trident/') > 0) {

                var IEwindow = window.open("", "", "Width=0px; Height=0px");
                IEwindow.document.write('sep=,\r\n' + csv);
                IEwindow.document.close();
                IEwindow.document.execCommand('SaveAs', true, fileName);
                IEwindow.close();
            }
            else {
                var aLink = document.createElement('a');
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", true, true, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);
                aLink.download = fileName;
                aLink.href = 'data:text/csv;charset=UTF-8,' + encodeURIComponent(csv);
                aLink.dispatchEvent(evt);
            }
        }

	});

})(jQuery);
