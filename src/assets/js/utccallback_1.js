const Api_URL = 'https://reg-dev.cmwrcregistration.org/MR/';
// PROD 
// var forte_API_URL = "https://checkout.forte.net/v2/js";
var forte_API_URL = "https://sandbox.forte.net/checkout/v2/js";

// PROD 
//var forte_API_CallbackURL = 'https://checkout.forte.net/getUTC?callback=?';
var forte_API_CallbackURL = 'https://sandbox.forte.net/checkout/getUTC?callback=?';

var JQ_library_fixed_URL="./assets/js/jquery-1.11.0.min.js";
var secure_Trans_Key = "f0fed3faa449ef5b4db7b80957d53734";

let hostSplit = (window.location.origin).split(':');
let localhost = hostSplit[0]+hostSplit[1];
if(localhost=="http://localhost"){
  var  redirect_URL= window.location.origin+"/programregistration/search-family";
  var  redirect_URL1= window.location.origin+"/programregistration/search-family";
}else{
  // var  redirect_URL= window.location.origin+"/MemberReg/program-registration";
  // var  redirect_URL1= window.location.origin+"/MemberReg/sevasignup";
  var  redirect_URL= window.location.origin+"/programregistration/search-family";
  var  redirect_URL1= window.location.origin+"/programregistration/search-family";
}

function callbackUTC_1(){
  var payopt =  JSON.parse(localStorage.getItem('payOpts') || '');

  var paymode = JSON.parse(localStorage.getItem('payMode') || '');

  $.getScript(JQ_library_fixed_URL, function(){
  });

  if(payopt=='fullAmt'){
    if(paymode=='E-Check'){ 
      var button = $("button[id*='pay_proceed_btn_echeck_full']"); 
    }else{ 
      var button = $("button[id*='pay_proceed_btn_cc_full']"); 
    }
  }else if(payopt=='partAmt'){
    if(paymode=='E-Check'){
      var button = $("button[id*='pay_proceed_btn_echeck']"); 
    }else{ 
      var button = $("button[id*='pay_proceed_btn_cc']"); 
    }  
  }

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
 let total_amt = ((total_amount==undefined || total_amount==null)?'':total_amount);
 var Message=api_access_id+"|"+method+"|"+version_number+"|"+ total_amt +"|"+utc+"|"+order_number+"|"+"|";
  var hash=md5(Message,secureTransactionKey); 
  button.attr('signature',hash);
  
  localStorage.setItem('signature', JSON.stringify(hash));

  $.getScript(forte_API_URL, function(){

  });


  });
}

function oncallback(e) {


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
     getUpdateinfo(responseData, resfam);
     fetchAdultFamilyData();
       
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


  function getUpdateinfo(data, resfam){
      var response=data;

      var payopts = JSON.parse(localStorage.getItem('payOpts') || '');
      //var payOption = JSON.parse(payopts);
      
      var total = JSON.parse(localStorage.getItem('totalAMt') || '{}');
      var totalwithcon = JSON.parse(localStorage.getItem('totalAMtwithconv') || '{}');
      var programCodeVal = JSON.parse(localStorage.getItem('programcode') || '{}');
      
      var personCode = JSON.parse(localStorage.getItem('personID') || '{}');

      var chapterCode = JSON.parse(localStorage.getItem('chapterCode') || '{}');
      var datares ={
          "user": {
         "familyID": parseInt(response.consumer_id),
          "personID": personCode,
          "Xdata1":programCodeVal,
          // "firstName": resdata.firstName,
          // "middleName": resdata.middleName,
          // "lastName": resdata.lastName,
          // "gender": resdata.gender,
          // "emailAddress": resdata.emailAddress,
          // "phoneNumber": resdata.phoneNumber,
          // "homePhone":resdata.homePhone,
          // "address": resdata.address,
          // "address2": resdata.address2,
          // "address3":resdata.address3,
          // "city": resdata.city,
          // "state": resdata.state,
          // "zipCode": resdata.zipCode,
          "chapter":chapterCode,
          "totalAmount": total,
          "totalAmountWithConvenienceFee": totalwithcon
        },
        programCode:programCodeVal,
        userProgramList:[],
        modeOfPayment: (response.method_used== "echeck")?"ECHECK":"CC",
        installmentAmount:resfam.installmentAmount,
        installmentAmountWithConv:resfam.installmentAmountWithConv,
        pledgeTotal: resfam.pledgeTotal,
        arpanamPledgeAdjustment: resfam.arpanamPledgeAdjustment,
        totalpledgeAmount: resfam.totalpledgeAmount,
        totalPledgeAmountWithConv: resfam.totalPledgeAmountWithConv,
        method:response.method ,
        transactionType:(response.method_used== "echeck")?20:10,
        authorizationCode:response.authorization_code ,
        pgPaymentToken:response.paymethod_token ,
        pgCustomerToken:response.customer_token,
        traceNumber:response.trace_number,
        utcTime:response.utc_time,
        orderNumber: response.order_number,
        consumerId: response.consumer_id,
        xdata1:resfam.xdata1,
        xdata2: resfam.xdata2,
        xdata3:resfam.xdata3,
        requestId:response.request_id,
        responseCode:response.response_code,
        responseDescription:response.response_description,
        deferredPaymentInstallmentInfo:'',
        immediatePaymentInstallmentInfo:''
      }

      if(resfam.immediatePaymentInstallmentInfo!=null){
        datares.immediatePaymentInstallmentInfo={};
        datares.immediatePaymentInstallmentInfo= {
          id: resfam?.immediatePaymentInstallmentInfo?.id,
          familyID: resfam?.immediatePaymentInstallmentInfo?.familyID,
          personID: resfam?.immediatePaymentInstallmentInfo?.personID,
          invoiceNumber: resfam?.immediatePaymentInstallmentInfo?.invoiceNumber,
          totalInvoiceAmount: resfam?.immediatePaymentInstallmentInfo?.totalInvoiceAmount,
          installmentNumber: resfam?.immediatePaymentInstallmentInfo?.installmentNumber,
          scheduleTransactionAmount: resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionAmount,
          scheduleTransactionAmountWithConv: resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionAmountWithConv,
          scheduleTransactionDate:resfam?.immediatePaymentInstallmentInfo?.scheduleTransactionDate,
          scheduleAuthCode: resfam?.immediatePaymentInstallmentInfo?.scheduleAuthCode,
          status: resfam?.immediatePaymentInstallmentInfo?.status,
          scheduleType: resfam?.immediatePaymentInstallmentInfo?.scheduleType
        };
      }else{
        datares.immediatePaymentInstallmentInfo=null;
      }

      if(resfam.deferredPaymentInstallmentInfo!=null){
        datares.deferredPaymentInstallmentInfo={};
        datares.deferredPaymentInstallmentInfo= {
          id: resfam?.deferredPaymentInstallmentInfo?.id,
          familyID: resfam?.deferredPaymentInstallmentInfo?.familyID,
          personID: resfam?.deferredPaymentInstallmentInfo?.personID,
          invoiceNumber: resfam?.deferredPaymentInstallmentInfo?.invoiceNumber,
          totalInvoiceAmount: resfam?.deferredPaymentInstallmentInfo?.totalInvoiceAmount,
          installmentNumber: resfam?.deferredPaymentInstallmentInfo?.installmentNumber,
          scheduleTransactionAmount: resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionAmount,
          scheduleTransactionAmountWithConv: resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionAmountWithConv,
          scheduleTransactionDate:resfam?.deferredPaymentInstallmentInfo?.scheduleTransactionDate,
          scheduleAuthCode: resfam?.deferredPaymentInstallmentInfo?.scheduleAuthCode,
          status: resfam?.deferredPaymentInstallmentInfo?.status,
          scheduleType: resfam?.deferredPaymentInstallmentInfo?.scheduleType
        };

       // Object.assign(datares.deferredPaymentInstallmentInfo, deferredPaymentInstallmentInfo);
      }else{
        datares.deferredPaymentInstallmentInfo=null;
      }
      
      Object.assign(datares.userProgramList, resfam.userProgramList);
      if(payopts=="partAmt"){
        datares.paymentInstallmentInfoList= [];
        Object.assign(datares.paymentInstallmentInfoList, resfam.paymentInstallmentInfoList);
        let dateval = new Date(resfam.instalmentDate);
       let partPayObj = {
            instalmentDate:dateval.toLocaleDateString(),
            installmentFrequency: resfam.installmentFrequency,
            instalmentNum: resfam.instalmentNum,
        }
        Object.assign(datares, partPayObj);
      }
      for(var i=0; i<datares.userProgramList.length; i++){
       // datares.userProgramList[i].registrationId = 25098;
        datares.userProgramList[i].registrationStatus= response.response_description;
        if(response.method_used == "echeck")
          datares.userProgramList[i].modeOfPayment= "ECHECK";
        else
        datares.userProgramList[i].modeOfPayment= "CC";
        datares.userProgramList[i].paymentAuthCode= response.authorization_code;
        datares.userProgramList[i].paymentTraceNumber= response.trace_number;
        datares.userProgramList[i].invoiceNumber= response.xdata_3;

        datares.userProgramList[i].paymentSubmittedDate= new Date();
        datares.userProgramList[i].paymentTxnDate= new Date();
        
      }

    var xhr = new XMLHttpRequest();
    var url = Api_URL+'programSelection/updatePaymentInformationForProgramRegistration';
xhr.open('POST', url);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  
  var responsedata = JSON.parse(xhr.responseText);
  sessionStorage.removeItem('fetchupdateResponse');
 // window.location.href= redirect_URL; 
}

xhr.send(JSON.stringify(datares));
  }

  function fetchAdultFamilyData(){
    var curentUserData = JSON.parse(localStorage.getItem('CurrentUser') || '');
    let familyId = (curentUserData.familyId)?curentUserData.familyId : curentUserData.familyID;
    var paramAdult= {
        familyId: familyId,
      // "chapterID": this.userData.chapter,
      // "programCode": this.programcode
    }

    var xhr = new XMLHttpRequest();
    var url = Api_URL+'registration/fetchAdultPersonsByFamilyId';
xhr.open('POST', url);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  
  var Adultresponsedata = JSON.parse(xhr.responseText);
  redirectionCheck(Adultresponsedata.selectDropdownList[0]);
 // window.location.href= redirect_URL; 
}

xhr.send(JSON.stringify(paramAdult));
  }

  

  function redirectionCheck(adultData){
    var curentUserData = JSON.parse(localStorage.getItem('CurrentUser') || '');
    var CurrProgramCode = JSON.parse(localStorage.getItem('programcode') || '');
    let familyId = (curentUserData.familyId)?curentUserData.familyId : curentUserData.familyID;

    var param= {
      familyId: familyId,
      programCode: CurrProgramCode,
      personId: parseInt(adultData.code)
    
    }

    var xhr = new XMLHttpRequest();
    var url = Api_URL+'seva/fetchSevaSignupDetailsByFamily';
xhr.open('POST', url);

xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
  
  var responsedataCheck = JSON.parse(xhr.responseText);

  if( Object.keys(responsedataCheck.volunteerQuestionaireResponseList).length==0){
    window.location.href= redirect_URL; 
  }else{
    window.location.href= redirect_URL1; 
  }
}

xhr.send(JSON.stringify(param));
  }


  function scrollTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }