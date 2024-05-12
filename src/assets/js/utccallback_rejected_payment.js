var Api_URL = 'https://nonregqa.cmwrcregistration.org/MR/';
// PROD 
// var forte_API_URL = "https://checkout.forte.net/v2/js";
var forte_API_URL = "https://sandbox.forte.net/checkout/v2/js";

// PROD 
//var forte_API_CallbackURL = 'https://checkout.forte.net/getUTC?callback=?';
var forte_API_CallbackURL = 'https://sandbox.forte.net/checkout/getUTC?callback=?';

var JQ_library_fixed_URL="./assets/js/jquery-1.11.0.min.js";
var secure_Trans_Key = "f0fed3faa449ef5b4db7b80957d53734";


if(window.location.origin=="http://localhost:4200"){
  var  redirect_URL= window.location.origin+"/program-registration";
  var  redirect_URL1= window.location.origin+"/sevasignup";
}else{
  var  redirect_URL= window.location.origin+"/MemberReg/program-registration";
  var  redirect_URL1= window.location.origin+"/MemberReg/sevasignup";
}

var valCheck='';
function callbackUTC_RejectedPayment(){
  var payopt =  JSON.parse(localStorage.getItem('payOpts') || '');

  var paymode = JSON.parse(localStorage.getItem('payMode') || '');

  $.getScript(JQ_library_fixed_URL, function(){
  });

  
    var button = $("button[id*='pay_proceed_btn_full_RP']"); 

   // var button = $('button[api_access_id]');
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

function oncallbackRejectedPayment(e) {


  //var formatted_json = JSON.stringify(JSON.parse(e.data), null, 2);
   var responseData = JSON.parse(e.data); 
   
   switch (responseData.event) {
   
     case 'begin':
     break;
     case 'success':
      
      Swal.fire({
        icon: 'success',
         title: "The registration form is submitted successfully. Please allow 3 to 5 business days to process the payment.",
         showConfirmButton: false,
         timer: 2800
        });
     
     var resfam = JSON.parse(sessionStorage.getItem('fetchupdateResponse'));
     getRejectedPaymentUpdateinfo(responseData, resfam);
       
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
            //window.location.href="Payment_History.htm";
            
            
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

   function checkNullEmpty(paramName){
    return (paramName!=null && paramName!=''&& paramName!=undefined)? paramName:'';
   }

   function checkNullEmptyNum(paramName){
    return (paramName!=null && paramName!='' && paramName!=undefined)? paramName:0;
   }

  function getRejectedPaymentUpdateinfo(data, resfam){
      var response=data;

      var payopts = JSON.parse(localStorage.getItem('payOpts') || '');
      var payMode = JSON.parse(localStorage.getItem('payMode') || '');
      //var payOption = JSON.parse(payopts);
      
      var total = JSON.parse(localStorage.getItem('totalAMt') || '{}');
      var totalwithcon = JSON.parse(localStorage.getItem('totalAMtwithconv') || '{}');
      var programCodeVal = JSON.parse(localStorage.getItem('programcode') || '{}');
      
      var personCode = JSON.parse(localStorage.getItem('personID') || '{}');

      var chapterCode = JSON.parse(localStorage.getItem('chapterCode') || '{}');
      var datares ={
         paymentHistory_old: {
          id: resfam.id,
          familyID: resfam.familyID,
          programCode: resfam.programCode,
          invoiceNumber: checkNullEmpty(resfam.invoiceNumber),
          paymentType: checkNullEmpty(resfam.paymentType),
          paymentDate: checkNullEmpty(resfam.paymentDate),
          convenienceFee: checkNullEmptyNum(resfam.convenienceFee),
          amountPaid: checkNullEmptyNum(resfam.amountPaid),
          totalAmountWithOutConvenienceFee: checkNullEmptyNum(resfam.totalAmountWithOutConvenienceFee),
          authorizedAmount: checkNullEmptyNum(resfam.authorizedAmount),
          activity: checkNullEmpty(resfam.activity),
          paymentStatus: checkNullEmpty(resfam.paymentStatus),
          amount: checkNullEmptyNum(resfam.amount),
          paymentTraceNumber: checkNullEmpty(resfam.paymentTraceNumber),
          paymentAuthCode: checkNullEmpty(resfam.paymentAuthCode),
          paymentMode: checkNullEmpty(resfam.paymentMode),
          transactionDate: checkNullEmpty(resfam.transactionDate),
          paymentProcessingMethod: checkNullEmpty(resfam.paymentProcessingMethod) ,
          walletID: checkNullEmpty(resfam.walletID),
          requestId: checkNullEmpty(resfam.requestId),
          requestCode: checkNullEmpty(resfam.requestCode),
          customerToken: checkNullEmpty(resfam.customerToken),
          payMethodToken: checkNullEmpty(resfam.payMethodToken),
          scheduleId: checkNullEmpty(resfam.scheduleId),
          locationId: checkNullEmpty(resfam.locationId),
          amountWithConvenience: checkNullEmpty(resfam.amountWithConvenience),
          retryFlag: checkNullEmpty(resfam.retryFlag),
          syncForteStatus: checkNullEmpty(resfam.syncForteStatus),
          status: checkNullEmpty(resfam.status),
          personId: checkNullEmpty(resfam.personId),
          billingName: checkNullEmpty(resfam.billingName),
          billingStreetLine1: checkNullEmpty(resfam.billingStreetLine1),
          billingLocality: checkNullEmpty(resfam.billingLocality),
          billingRegion: checkNullEmpty(resfam.billingRegion),
          billingPostalCode: checkNullEmpty(resfam.billingPostalCode),
          billingPhoneNumber: checkNullEmpty(resfam.billingPhoneNumber),
          billingEmailAddress: checkNullEmpty(resfam.billingEmailAddress),
          xdata1: checkNullEmptyNum(resfam.xdata1),
          xdata2: checkNullEmptyNum(resfam.xdata2),
          xdata3: checkNullEmptyNum(resfam.xdata3)
        },
        paymentHistory: {
          id: 0,
          familyID: response.consumer_id,
          programCode: resfam.programCode,
          invoiceNumber: checkNullEmpty(response.order_number),
          paymentType: checkNullEmpty(response.paymentType),
          paymentDate: checkNullEmpty(response.paymentDate),
          convenienceFee: checkNullEmpty(response.convenienceFee),
          amountPaid: checkNullEmptyNum(response.amountPaid),
          totalAmountWithOutConvenienceFee: checkNullEmptyNum(response.totalAmountWithOutConvenienceFee),
          authorizedAmount: checkNullEmptyNum(response.authorizedAmount),
          activity: checkNullEmpty(response.activity),
          paymentStatus: checkNullEmpty(response.response_description),
          amount: checkNullEmptyNum(resfam.amount),
          paymentTraceNumber: checkNullEmpty(response.trace_number),
          paymentAuthCode: checkNullEmpty(response.authorization_code),
          paymentMode: (payMode=='CC')?'CC':'ECHECK',
          transactionDate: checkNullEmpty(resfam.transactionDate),
          paymentProcessingMethod: 'IMMEDIATE' ,
          walletID: checkNullEmpty(resfam.walletID),
          requestId: checkNullEmpty(response.request_id),
          requestCode: checkNullEmpty(response.response_code),
          customerToken: checkNullEmpty(response.customer_token),
          payMethodToken: checkNullEmpty(response.paymethod_token),
          scheduleId: checkNullEmpty(response.scheduleId),
          locationId: checkNullEmpty(response.locationId),
          amountWithConvenience: checkNullEmptyNum(resfam.amountWithConvenience),
          retryFlag: checkNullEmpty(response.retryFlag),
          syncForteStatus: checkNullEmpty(response.syncForteStatus),
          status: checkNullEmpty(response.status),
          personId: checkNullEmpty(response.personId),
          billingName: checkNullEmpty(response.billing_name),
          billingStreetLine1: checkNullEmpty(response.billing_street_line1),
          billingLocality: checkNullEmpty(response.billing_locality),
          billingRegion: checkNullEmpty(response.billing_region),
          billingPostalCode: checkNullEmpty(response.billing_postal_code),
          billingPhoneNumber: checkNullEmpty(response.billing_phone_number),
          billingEmailAddress: checkNullEmpty(response.billing_email_address),
          xdata1: checkNullEmptyNum(response.xdata_1),
          xdata2: checkNullEmptyNum(response.xdata_2),
          xdata3: checkNullEmptyNum(response.xdata_3)
        }
      
      }     

    var xhr = new XMLHttpRequest();
    var url = Api_URL+'paymentHistory/updatePaymentHistoryAfterRetry';
xhr.open('POST', url);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  
  var responsedata = JSON.parse(xhr.responseText);
  sessionStorage.removeItem('fetchupdateResponse');
  window.location.href= redirect_URL; 
}

xhr.send(JSON.stringify(datares));
  }
