$('.value').on('keydown keyup mousedown mouseup', function() {
   	 var res = this.value, //grabs the value
   		 len = res.length, //grabs the length
   		 max = 9, //sets a max chars
   		 stars = len>0?len>1?len>2?len>3?len>4?'XXX-XX-':'XXX-X':'XXX-':'XX':'X':'', //this provides the masking and formatting
   		result = stars+res.substring(5); //this is the result
   	 $(this).attr('maxlength', max); //setting the max length
   	$(".number").val(result); //spits the value into the input
   });

$('.ssn-toggle').on('click', function(){
	$('.value').toggleClass('show');
});

$("#amount").focusout(function(e){
    if(e.target.checkValidity() === false){
    	$(this).addClass('is-invalid');
    }
}).bind('invalid', function(event) {
    setTimeout(function() { $(event.target).focus();}, 50);
});

$('.phone')

.on('keypress', function(e) {
  var key = e.charCode || e.keyCode || 0;
  var phone = $(this);
  if (phone.val().length === 0) {
    phone.val(phone.val() + '(');
  }
  // Auto-format- do not expose the mask as the user begins to type
  if (key !== 8 && key !== 9) {
    if (phone.val().length === 4) {
      phone.val(phone.val() + ')');
    }
    if (phone.val().length === 5) {
      phone.val(phone.val() + ' ');
    }
    if (phone.val().length === 9) {
      phone.val(phone.val() + '-');
    }
    if (phone.val().length >= 14) {
      phone.val(phone.val().slice(0, 13));
    }
  }

  // Allow numeric (and tab, backspace, delete) keys only
  return (key == 8 ||
    key == 9 ||
    key == 46 ||
    (key >= 48 && key <= 57) ||
    (key >= 96 && key <= 105));
})

.on('focus', function() {
  phone = $(this);

  if (phone.val().length === 0) {
    phone.val('(');
  } else {
    var val = phone.val();
    phone.val('').val(val); // Ensure cursor remains at the end
  }
})

.on('blur', function() {
  $phone = $(this);

  if ($phone.val() === '(') {
    $phone.val('');
  }
});


$('.phone').on('keydown', function(e){
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
       // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
       // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
           // let it happen, don't do anything
      return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
  }
          
          
});

$('.phone').on('input', function(e){
 var target = $($(this).data('target'));
 target.html($(this).val());
 target.attr('href', 'tel:' + $(this).val());  
});



$('#business_tax_id').on('change', function(){
	var opt = $(this).val();

	if (opt == 'ssn') {
		$('#ssn').show();
		$('#ein').hide();
	}

	else {
		$('#ssn').hide();
		$('#ein').show();
	}
});


$("#email").bind("blur", validate);

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var email = $("#email").val();

  if (validateEmail(email)) {
    $('#email').addClass('is-valid');
    briteVerify(email);
  } else {
    $('#email').addClass('is-invalid');
  }
  return false;
}

function briteVerify(email){
  $.ajax({
    type: 'POST',
    data: {email: email},
    url: '../../api/email',
    success:function(data){
      $('.valid-email').show();
      $('#email').removeClass('is-invalid');
    },
    error:function(err){
      $('#email').addClass('is-invalid');
      $('.valid-email').hide();
    }
  });
}

var submit = false;
 $("#application").submit(function(e) {
 	$('#eligibility').hide();
 	$('#review').show();
      setTimeout(function(){
          submit = true;
          $("#application").submit();         
      }, 3000);
      if(!submit)
          e.preventDefault();
 });


$('.btn-next').on('click', function(e){
  e.preventDefault();
	//$('.bg-form').css('min-height', '495px');
	var parent = $($(this).data('parent'));
	var next  =  $($(this).data('next'));
	var invalid = 0;
	parent.find('input').each(function(){
		var input = $(this);
		if(input.attr('required')){
			if(input.val() === ''){
				input.addClass('is-invalid');
				invalid++;
			}else{
				input.removeClass('is-invalid');
				input.next().remove();
			}
		}
	});

	if(invalid == 0){ 
    parent.hide();
    next.show("bounce", { times: 1, direction: 'right' }, "slow" );

    /*$.ajax({
      url: 'api/inspect',
      type: 'GET',
      data: $('#apply').serialize(),
      success:function(data){
          if(data.status == 'valid'){
            parent.hide();
            next.show("bounce", { times: 1, direction: 'right' }, "slow" );
          }
          else{
            parent.hide();
            $('#duplicate').show('fade');
          }
      }
    });
  */
		

	}

});

$('.btn-back').on('click', function(){
	var parent = $($(this).data('parent'));
	var prev  =  $($(this).data('prev'));
	parent.hide();
	prev.show("bounce", { times: 1, direction: 'right' }, "slow" );
});

$(document).on('keyup', '.is-invalid',function(){
	var input = $(this);
  if(input.attr('name') != 'amount_requested'){
    if(input.val() !== ''){
      input.removeClass('is-invalid');
      input.next().remove();
    }
      }
	
});


$('#autofill').click(function(){
	$('input[name="amount_requested"]').val(10000);
	$('input[name="email"]').val('vahnmarty@gmail.com');
	$('input[name="first_name"]').val('Vahn');
	$('input[name="last_name"]').val('Marty');
	$('input[name="telephone"]').val('0912345678');
	$('input[name="mobile"]').val('0912345678');
  $('input[name="address1"]').val('11900 Biscayne Boulevard, Miami, FL, USA');
  $('input[name="street_number"]').val('11900');
  $('input[name="route"]').val('Biscayne Boulevard');
  $('input[name="city"]').val('Miami');
  $('input[name="state"]').val('FL');
  $('input[name="zip"]').val('32438');
  $('input[name="drivers_license"]').val('123123123');
  $('input[name="birthdate"]').val('1995-06-29');
});

$(document).ready(function(){
   $('select').each(function(){
    if($(this).attr('data-old')){
        var val = $(this).data('old');
       $(this).find('option[value="'+val+'"]').attr('selected', true);
    }
   });
});

if ( $('[type="date"]').prop('type') != 'date' ) {
    $('[type="date"]').datepicker();
}


$('.trigger-modal').on('click', function(e){
  e.preventDefault();
   var target =  $(this).data('target');
   console.log(target);
   $(target).click();
});
$('.number-only').keydown(function(e) {
  if (e.keyCode === 190) {
    e.preventDefault();
  }
});

$('input[name="amount_requested"]').on('input', function(e){
    var val = $(this).val();
    var min = parseInt($(this).attr('min'));
    var max = parseInt($(this).attr('max'));
    if(val >= min && val <= max)
    {
      $(this).addClass('is-valid').removeClass('is-invalid');
    }else{
      if(val > max){
        e.preventDefault();
        $(this).val(max);
      }
      else
      $(this).addClass('is-invalid').removeClass('is-valid');
    }
});

$('#apply').submit(function(){
  $('.site-preloader').addClass('show');
});