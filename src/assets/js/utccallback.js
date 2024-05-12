var Api_URL = 'https://nonregqa.cmwrcregistration.org/MR/';

// PROD 
// var forte_API_URL = "https://checkout.forte.net/v2/js";
var forte_API_URL = "https://sandbox.forte.net/checkout/v2/js";

// PROD 
//var forte_API_CallbackURL = 'https://checkout.forte.net/getUTC?callback=?';
var forte_API_CallbackURL = 'https://sandbox.forte.net/checkout/getUTC?callback=?';

var  redirect_URL= "http://localhost:4200/home/dashboard";
var JQ_library_fixed_URL="./assets/js/jquery-1.11.0.min.js";
var secure_Trans_Key = "f0fed3faa449ef5b4db7b80957d53734";

function callbackUTC(){

  $.getScript("", function(){
  });

    var button = $('button[api_access_id]');
  var api_access_id=button.attr('api_access_id');
  var method=button.attr('method');
  var version_number=button.attr('version_number');
  var total_amount=button.attr('total_amount');
  var order_number=button.attr('order_number');
  $.getJSON(forte_API_CallbackURL).done(function (utc) {
  button.attr('utc_time', utc);
  localStorage.setItem('utc_time', JSON.stringify(utc));
 var secureTransactionKey=secure_Trans_Key;
 var Message=api_access_id+"|"+method+"|"+version_number+"|"+total_amount+"|"+utc+"|"+order_number+"|"+"|";
  var hash=md5(Message,secureTransactionKey); 
  button.attr('signature',hash);
  
  localStorage.setItem('signature', JSON.stringify(hash));

  $.getScript(forte_API_URL, function(){

  });


  });
}

function oncallback(e) {

 debugger;
  var formatted_json = JSON.stringify(JSON.parse(e.data), null, 2);
   var responseData = JSON.parse(e.data); 
   
   switch (responseData.event) {
   
     case 'begin':
     break;
     case 'success':
       alert("The registration form is submitted successfully. Please allow 3 to 5 business days to process the paymentjh.")
      
       getUpdateinfo(responseData);


  //      var xhr = new XMLHttpRequest();
  //      var url = Api_URL + 'saveDonationDetails';
  //  xhr.open('POST', url);
 
  //  xhr.setRequestHeader('Content-Type', 'application/json');
  //  xhr.onload = function() {
     
  //    var resfam = JSON.parse(xhr.responseText);
       
  //  }
   
  //  xhr.send(JSON.stringify({familyId: responseData.order_number }));
     
         $("#load").show(); 
         $("#pop-background").show()
         $.post("paymentResponse.htm",
           {
             response_description: responseData.response_description,
             trace_number: responseData.trace_number,
             authorization_code: responseData.authorization_code,
             response_type: responseData.response_code,
             pg_paymethod_token: responseData.paymethod_token,
             total_amount: responseData.total_amount,
             method_used: responseData.method_used,
             subtotal_amount: responseData.subtotal_amount,
             service_fee_amount: responseData.service_fee_amount,
             billing_country: responseData.billing_country,
             billing_region: responseData.billing_region,
             billing_locality: responseData.billing_locality,
             billing_postal_code: responseData.billing_postal_code,
             paymethod_token: responseData.paymethod_token,
             last4: responseData.last_4,
           },
           function(data, status){
            //alert("llllllllllllll");
             //window.close();	
            $('#load').hide();
            // document.getElementById("p_id").style.display="none";
            window.location.href="Payment_History.htm";
            
            
         });
     break;
     case 'failure':
       alert('Sorry, transaction failed.' + "\n\n" + 'The failed reason is ' + responseData.response_description);
      //  document.getElementById("p_id").style.display="none";
      //  window.location.reload(true);
     break;
     case 'abort':				
        $('#load').show();
      //  window.location.reload(true);
        setTimeout(function(){
           $('#load').hide();
             },2000);
        // document.getElementById("p_id").style.display="none";
   }
 
  }


  function getUpdateinfo(data){
      var response=data;

     
      var datares = JSON.parse(localStorage.getItem('SaveDonation') || '{}')

    var xhr = new XMLHttpRequest();
    var url = Api_URL+'saveDonationDetails';
xhr.open('POST', url);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  
  var responsedata = JSON.parse(xhr.responseText);
  
  //window.location.href="http://localhost:4200/login"; 
  window.location.href= redirect_URL; 
}

xhr.send(JSON.stringify(datares));
  }