$(document).ready(function() {


	// $("#saveplace").submit(function(e) {
	//     e.preventDefault(); // Prevents the page from refreshing
	//     var $this = $(this); // `this` refers to the current form element
	//     $.post(
	//         $this.attr("action"), // Gets the URL to sent the post to
	//         $this.serialize(), // Serializes form data in standard format
	//         function(data) { /** code to handle response **/ console.log(data)},
	//         "json" // The format the response should be in
	//     );
	// });

	$('#saveplace').click(function(event) {
    event.preventDefault();

    $.ajax({
        global: false,
        type: 'POST',
        url: '/maps/save/place',
        dataType: 'html',
        data: {
            name: $("#namePlace").val(),

        },
        success: function (result) {
            console.log(result);
        },
        error: function (request, status, error) {
            serviceError();
        }
    });
});


})

