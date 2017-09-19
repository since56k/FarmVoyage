$(document).ready(function() {
  $('#country').on('change', function() {
    $('.france-op, .italy-op, .spain-op').removeClass('hidden');
    if ($(this).val() == "italy") {
      $('.spain-op, .france-op').addClass('hidden');
   }
    else if ($(this).val() == "spain") {
      $('.italy-op, .france-op').addClass('hidden');
    }
    else {
      $('.spain-op, .italy-op').addClass('hidden');
    };
  })
});
