

// ---------------------------------------------- recharge home ---------------------------------------------------------

function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
         else if ((charCode==13)&&(document.myForm.mdn.value!="")){
              if(document.myForm.mdn.value.length!=10)
              {
                alert('Please enter valid GSM Mobile Number');
                document.myForm.mdn.value="";
                document.myForm.mdn.focus();
                return false;
              }               
         document.myForm.methodToCall.value='loadPlan';
         document.myForm.action="ERechargeAction.do";
         document.myForm.submit();
         return true;
         }
         else if ((charCode==13)&&(document.myForm.mdn.value==""))
         {
          alert('Please enter Mobile Number');
          document.myForm.mdn.value="";
          return false;
         }
     }
  function clear()
  {
   document.myForm.mdn.value="";
  }
  
  function NEXT()
  {
      var mdn = document.myForm.mdn.value;
      if(mdn=="")
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
      }
      if(mdn.length!=10)
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
        
      }    
      document.myForm.methodToCall.value='loadPlan';
      document.myForm.action="ERechargeAction.do";
  
      document.myForm.submit();
      return true;
  }
  
  // added by kalluri bhaskar 
  
  function NEXTSTEP()
  {
      var mdn = document.myForm.mdn.value;
      if(mdn=="")
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
      }
      if(mdn.length!=10)
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
        
      }    
      document.myForm.methodToCall.value='loadflexiPlan';
      document.myForm.action="ERechargeFlexi.do";
  
      document.myForm.submit();
      return true;
  }
//  end by kalluri bhaskar as part 
  
  //added by kalluri bhaskar 
  
  function NEXTSTEP1()
  {

      var mdn = document.myForm.mdn.value;
      if(mdn=="")
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
      }
      if(mdn.length!=10)
      {
        alert('Please enter valid GSM Mobile Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
        
      }    

      document.myForm.methodToCall.value='loadflexiPlan';
      document.myForm.action="FlexiRechargeAction.do";
     document.myForm.submit();
      return true;
  }
//  end by kalluri bhaskar as part 
  // COCC7453 added by Rajeswari 
  function Next1(product){
  var mdn = document.myForm.mdn.value;
      if(mdn=="")
      {
        alert('Please enter '+product+' Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
      }
      if(mdn.length!=10)
      {
        alert('Please enter '+product+' Number');
        document.myForm.mdn.value="";
        document.myForm.mdn.focus();
        return false;
        
      }
   document.myForm.methodToCall.value='loadPlan';
      document.myForm.action="ERechargeAction.do";
      document.myForm.submit();
      return true;
  }
 
  // COCC7453 end by Raejswari.
  // ---------------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------------- e-PayChose flexi page -------------------------------------------------
// modifications by Yamini for COCC4614 starts
 function Paynow(amt,mdn,profile,circle,actualamount,finalamount,validity,adminfee,servicetax,uniqueId,productType)//productType added as dynamic by Bhaskar as part of COMKT3835
  {
 //document.forms[0].action="https://www.tatatele.in/etradeGSM/rechargeHome.jsp";
     var emailId = "";
  if (document.forms[0].emailAddr != null)
      emailId = document.forms[0].emailAddr.value;
    else
    emailId =  "-";
      
  document.forms[0].action="rechargeHome.jsp";
    document.forms[0].submit();
    var child = window.open('EBillDeskAction.do?methodToCall=goToBillDeskFlexi&productType='+productType+'&uniqueId='+uniqueId+'&amount_flexi='+amt+'&mdn='+mdn+'&accProfile='+profile+'&circleId='+circle+'&actualamount='+actualamount+'&finalamount='+finalamount+'&validity='+validity+'&adminfee='+adminfee+'&emailId='+emailId+'&servicetax='+servicetax+'', null,'height=700,width=700,toolbar=no,menubar=no,location=yes,scrollbars=yes,resize=yes,status=yes');
    child.focus();
    return false;
  }
 function pinPayNow(amt,mdn,profile,circle,rechargename,amount,talktime,adminfee,servicetax,benefits,validity,uniqueId,productType,rechargeType)//productType added as dynamic by Bhaskar as part of COMKT3835
  {
    var emailId = document.forms[0].emailAddr1.value;
    document.forms[0].action="rechargeHome.jsp";
    document.forms[0].submit();
    var child =window.open('EBillDeskAction.do?methodToCall=goToBillDeskPin&rechargeType='+rechargeType+'&emailId='+emailId+'&productType='+productType+'&uniqueId='+uniqueId+'&amount_pin='+amt+'&mdn='+mdn+'&accProfile='+profile+'&circleId='+circle+'&rechargename='+rechargename+'&amount='+amount+'&talktime='+talktime+'&adminfee='+adminfee+'&servicetax='+servicetax+'&benefits='+benefits+'&validity='+validity+'', null,'height=700,width=700,toolbar=no,menubar=no,location=yes,scrollbars=yes,resize=yes');
    child.focus();
    return false;
  }


  function isNumberKeyValue(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
     }
  
//  added by kalluri bhaskar  as part OF BRMKT285

function Submittion2(recharge_type)
  {

 var amountF="";
 var selectList="";
 if(recharge_type=='flexi'){
   amountF = document.myForm.amountF.value;
   selectList = document.forms[0].amountF;
   }
 if(recharge_type=='pin')  
    selectList = document.forms[0].amountP;
    // COCC7453 end
   var selectedOne = false;
   var selectedPhone = '';
   var selectedradio=null;
                                     if(selectList!=null && selectList.length+'' !='undefined')
                                         {
                                           for(var i=0;i<selectList.length;i++){
                                            if(selectList[i].checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList[i].value;
                                              selectedradio=i;
                                            }
                                         }
                                         }else{
                                          if( selectList!=null && selectList.checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList.value;
                                            }
                                         }
                            if(amountF=="")
                            {
                               if(selectedOne == false &&  recharge_type=='flexi' ){
                                  alert('Please enter the amount to recharge');
                                  document.myForm.amountF.focus();
                                  return false;
                                 }
                                 // Vijaya Added for email id as part of COCC12651
                                 if((document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_PIN")
                                  || (document.myForm.productType.value != null && (document.myForm.productType.value == "DATACARD-VDATA" || document.myForm.productType.value == "DATACARD-HSIA") )
                                 ){ 
                                  if(document.myForm.emailAddr.value == null || document.myForm.emailAddr.value ==""){
                                   alert("Please enter Email ID");
                                   document.getElementById("emailAddr").focus();
                                   return false;
                                  }
                                 }
                                  if(document.myForm.emailAddr.value != null && document.myForm.emailAddr.value !=""){
                                   if(emailID() == false)
                                    return false;
                                  }
                                   // Vijaya Added for email id as part of COCC12651  
                                  if(selectedOne == false &&  recharge_type=='pin' ){
                                  alert('Select the voucher you want to recharge');
                                  return false;
                                 }   
                                 
                                   document.myForm.methodToCall.value="addToPin";//// modified by Yamini for COCC4614 
                                   document.myForm.selectedValue.value="Pin";
                                   document.myForm.action="ERechargeAction.do";
                                   //document.myForm.submit();
                                   //return true;
                            }
            else
            {
         /*    if( parseInt(amountF)<10 &&  recharge_type=='flexi' )
                {
                      alert('Please enter Minimum Rs.10 for top-up.');
                       document.myForm.amountF.value="";
                      document.myForm.amountF.focus();
                      return false;
                } */
        /*    if(selectedOne==true){
            alert('Select either any voucher or enter amount but not both');
             if(selectList.length+'' !='undefined')
            selectList[selectedradio].checked=false;
            else
            selectList.checked=false;
            document.myForm.amountF.focus();
            return false;
            }*/
                // Vijaya Added for email id as part of COCC12651
               if(document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_FLEXI"){ 
               if(document.myForm.emailAddr.value == null || document.myForm.emailAddr.value ==""){
                  alert("Please enter Email ID");
                  document.getElementById("emailAddr").focus();
                  return false;
                 }
                 }
                 
                if(document.myForm.emailAddr.value != null && document.myForm.emailAddr.value !=""){
                 if(emailID() == false)
                   return false;
               }
           
              if(selectedOne == false){
               alert('Select the voucher you want to recharge');
               return false;
              }
  
              document.myForm.selectedValue.value="Flexi";

             document.myForm.methodToCall.value="getFlexiData";

            document.myForm.action="ERechargeFlexi.do";

             //document.myForm.submit();
            }
           
      document.myForm.submit();
      return true;
  }


//  added by kalluri bhaskar  as part OF BRMKT285

// added by kalluri bhaskar
function Submittion3(recharge_type)
  {

 var amountF="";
 var selectList="";
 if(recharge_type=='flexi'){
   amountF = document.myForm.amountF.value;
   selectList = document.forms[0].amountF;
   }
 if(recharge_type=='pin')  
    selectList = document.forms[0].amountP;
    // COCC7453 end
   var selectedOne = false;
   var selectedPhone = '';
   var selectedradio=null;
                                     if(selectList!=null && selectList.length+'' !='undefined')
                                         {
                                           for(var i=0;i<selectList.length;i++){
                                            if(selectList[i].checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList[i].value;
                                              selectedradio=i;
                                            }
                                         }
                                         }else{
                                          if( selectList!=null && selectList.checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList.value;
                                            }
                                         }
                            if(amountF=="")
                            {
                               if(selectedOne == false &&  recharge_type=='flexi' ){
                                  alert('Please enter the amount to recharge');
                                  document.myForm.amountF.focus();
                                  return false;
                                 }
                                 // Vijaya Added for email id as part of COCC12651
                                 if((document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_PIN")
                                  || (document.myForm.productType.value != null && (document.myForm.productType.value == "DATACARD-VDATA" || document.myForm.productType.value == "DATACARD-HSIA") )
                                 ){ 
                                  if(document.myForm.emailAddr.value == null || document.myForm.emailAddr.value ==""){
                                   alert("Please enter Email ID");
                                   document.getElementById("emailAddr").focus();
                                   return false;
                                  }
                                 }
                                  if(document.myForm.emailAddr.value != null && document.myForm.emailAddr.value !=""){
                                   if(emailID() == false)
                                    return false;
                                  }
                                   // Vijaya Added for email id as part of COCC12651  
                                  if(selectedOne == false &&  recharge_type=='pin' ){
                                  alert('Select the voucher you want to recharge');
                                  return false;
                                 }   
                                 
                                   document.myForm.methodToCall.value="addToPin";//// modified by Yamini for COCC4614 
                                   document.myForm.selectedValue.value="Pin";
                                   document.myForm.action="ERechargeAction.do";
                                   //document.myForm.submit();
                                   //return true;
                            }
            else
            {
         /*    if( parseInt(amountF)<10 &&  recharge_type=='flexi' )
                {
                      alert('Please enter Minimum Rs.10 for top-up.');
                       document.myForm.amountF.value="";
                      document.myForm.amountF.focus();
                      return false;
                } */
        /*    if(selectedOne==true){
            alert('Select either any voucher or enter amount but not both');
             if(selectList.length+'' !='undefined')
            selectList[selectedradio].checked=false;
            else
            selectList.checked=false;
            document.myForm.amountF.focus();
            return false;
            }*/
                // Vijaya Added for email id as part of COCC12651
               if(document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_FLEXI"){ 
               if(document.myForm.emailAddr.value == null || document.myForm.emailAddr.value ==""){
                  alert("Please enter Email ID");
                  document.getElementById("emailAddr").focus();
                  return false;
                 }
                 }
                 
                if(document.myForm.emailAddr.value != null && document.myForm.emailAddr.value !=""){
                 if(emailID() == false)
                   return false;
               }
           
              if(selectedOne == false){
               alert('Select the voucher you want to recharge');
               return false;
              }
document.myForm.selectedValue.value="Flexi";
document.myForm.methodToCall.value="getFlexiData";
document.myForm.action="FlexiRechargeAction.do";
   //document.myForm.submit();
            }
           document.myForm.submit();
      return true;
  }


//  added by kalluri bhaskar  as part OF BRMKT285



  function Submittion(recharge_type)
  {

 var amountF="";
 var selectList="";
 if(recharge_type=='flexi'){
   amountF = document.myForm.amountF.value;
   selectList = document.forms[0].amountF;
   }
 if(recharge_type=='pin')  
    selectList = document.forms[0].amountP;
    // COCC7453 end
   var selectedOne = false;
   var selectedPhone = '';
   var selectedradio=null;
                                     if(selectList!=null && selectList.length+'' !='undefined')
                                         {
                                           for(var i=0;i<selectList.length;i++){
                                            if(selectList[i].checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList[i].value;
                                              selectedradio=i;
                                            }
                                         }
                                         }else{
                                          if( selectList!=null && selectList.checked == true){
                                              selectedOne = true;
                                              selectedPhone = selectList.value;
                                            }
                                         }
                            if(amountF=="")
                            {
                               
                                
                                 if(selectedOne == false &&  recharge_type=='flexi' ){
                                  alert('Please enter the amount to recharge');
                                  document.myForm.amountF.focus();
                                  return false;
                                 }
                                 // Vijaya Added for email id as part of COCC12651
                                 if((document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_PIN")
                                  || (document.myForm.productType.value != null && (document.myForm.productType.value == "DATACARD-VDATA" || document.myForm.productType.value == "DATACARD-HSIA") )
                                 ){ 
                                  if(document.myForm.emailAddr1.value == null || document.myForm.emailAddr1.value ==""){
                                   alert("Please enter Email ID");
                                   document.getElementById("emailAddr1").focus();
                                   return false;
                                  }
                                  else 
                                   {
                                   document.myForm.emailAddr.value=document.myForm.emailAddr1.value;
                                   }
                                  }
                                  if(document.myForm.emailAddr1.value != null && document.myForm.emailAddr1.value !="")
                                  {
                                   if(emailID() == false)
                                   {
                                    return false;
                                   }
                                   else 
                                   {
                                    document.myForm.emailAddr.value=document.myForm.emailAddr1.value;
                                   }
                                  }
                                   // Vijaya Added for email id as part of COCC12651  
                                  if(selectedOne == false &&  recharge_type=='pin' ){
                                  alert('Select the voucher you want to recharge');
                                  return false;
                                 }   
                                 
                                   document.myForm.methodToCall.value="addToPin";//// modified by Yamini for COCC4614 
                                   document.myForm.selectedValue.value="Pin";
                                   document.myForm.action="ERechargeAction.do";
                                   //document.myForm.submit();
                                   //return true;
                            }
            else
            {
         /*    if( parseInt(amountF)<10 &&  recharge_type=='flexi' )
                {
                      alert('Please enter Minimum Rs.10 for top-up.');
                       document.myForm.amountF.value="";
                      document.myForm.amountF.focus();
                      return false;
                } */
        /*    if(selectedOne==true){
            alert('Select either any voucher or enter amount but not both');
             if(selectList.length+'' !='undefined')
            selectList[selectedradio].checked=false;
            else
            selectList.checked=false;
            document.myForm.amountF.focus();
            return false;
            }*/
                // Vijaya Added for email id as part of COCC12651
               if(document.myForm.recharge_type.value != null && document.myForm.recharge_type.value == "E-STICK_FLEXI"){ 
               if(document.myForm.emailAddr1.value == null || document.myForm.emailAddr1.value ==""){
                  alert("Please enter Email ID");
                  document.getElementById("emailAddr1").focus();
                  return false;
                 }
                 else {
                       document.myForm.emailAddr.value=document.myForm.emailAddr1.value;
                       }
                 }
                 
                if(document.myForm.emailAddr1.value != null && document.myForm.emailAddr1.value !=""){
                //alert("EMAIL IS NOT NULL - Submittion2");
                 if(emailID() == false){
                   return false;}
                    else {
                         document.myForm.emailAddr.value=document.myForm.emailAddr1.value;
                         }
                }
               // Vijaya Added for email id as part of COCC12651
              if(selectedOne == false){
               alert('Select the voucher you want to recharge');
               return false;
              }
            document.myForm.selectedValue.value="Flexi";
            document.myForm.action="ValidateAction.do";
            }
           
      document.myForm.submit();
      return true;
  }
      
 function emailID()
{
   var va19 = document.myForm.emailAddr1.value;
   var remail =   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/; 
    if(!remail.test(va19) || va19 == "" || va19 == 0 || va19.charAt(0) == '0')
      {
        var values = va19;
        var valueArr = values.split("@");
        var vrBef = valueArr[0];
        var vrAft = valueArr[1];
        
        
        var valuesChk = va19;
        var ValueChkArr = valuesChk.split(".");
        var vrBefChk = ValueChkArr[0];
        var vrAftChk = ValueChkArr[1];
        var reMailChk = /([a-zA-Z]{2,4})$/;
        var reNumChk = /([0-9]\*)$/;
        
        if(vrBef ==0 || vrAft == 0 || !reMailChk.test(vrAftChk) || !reNumChk.test(va19))
          {
            alert("Please enter valid Email ID ( eg. name@domain.com or name@domain.co.in )");
            document.myForm.emailAddr1.focus();  
            return false;
          }
          
          
        }
   return true;
}    

  function clearAmount()
  {
  document.myForm.amountF.value="";
  }
  function goBack()
  {
  document.myForm.action='recharge.jsp';
  document.myForm.submit();
  }
//  function PinBased()
//  {
//           var selectList = document.forms[0].amountP;
//           var selectedOne = false;
//           var selectedPhone = '';
//           if(selectList.length+'' !='undefined')
//           {
//             for(var i=0;i<selectList.length;i++){
//              if(selectList[i].checked == true){
//                selectedOne = true;
//                selectedPhone = selectList[i].value;
//              }
//           }
//           }else{
//            if(selectList.checked == true){
//                selectedOne = true;
//                selectedPhone = selectList.value;
//              }
//           }
//           if(selectedOne == false){
//            alert('Select the Voucher you want to Recharge');
//            return false;
//           }   
//           
//             document.myForm.methodToCall.value="addToPin";
//             document.myForm.action="ERechargeAction.do";
//             document.myForm.submit();
//             return true;
//           
//    }
  
  //--------------------------------------------------------------------------------------------------------------------------
  
  function Paynow_new()
  {
    document.myForm.methodToCall.value="goToBillDeskFlexi";  
    document.myForm.action="EBillDeskAction.do";
    document.myForm.submit();
    
  }
 function pinPayNow_new()
  {
    document.myForm.methodToCall.value="goToBillDeskPin";
    document.myForm.action="EBillDeskAction.do";
    document.myForm.submit();
  }
// modifications by Yamini for COCC4614 ends

  function isNumberKeyMhMu(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
     }
  
//  function Change()
//  {
//        
//       // document.myForm.selectedValue.value = document.myForm.select.value;
//        document.myForm.action='ePayChoose.jsp';
//        document.myForm.submit();
//  }
      
 function SubmittionPin()
  {
   var selectList = document.forms[0].amountP;
   var selectedOne = false;
   var selectedPhone = '';
   var selectedradio=null;
   if(selectList!=null && selectList.length+'' !='undefined')
    {
        for(var i=0;i<selectList.length;i++)
         {
              if(selectList[i].checked == true)
              {
                selectedOne = true;
                selectedPhone = selectList[i].value;
                selectedradio=i;
                
              }
          }
      }
      else
       {
        if( selectList!=null && selectList.checked == true){
            selectedOne = true;
            selectedPhone = selectList.value;
          }
       }
     if(selectedOne == false)
     {
       alert('Select the voucher you want to recharge ');
        return false;
      }   
           document.myForm.methodToCall.value="addToPin";
           document.myForm.selectedValue.value="Pin";
           document.myForm.action="ERechargeAction.do";

           
      document.myForm.submit();
      
  }  
  function backToPlanChoose(){
  //var mdn = document.forms[0].mdn.value;
  document.forms[0].methodToCall.value='loadPlan';
  document.forms[0].action="ERechargeAction.do";
  document.forms[0].submit();
  return true;
  }
  // added by kalluri bhaskar as part of BRMKT285
 
  function backToPlanChoose1(){

  //var mdn = document.forms[0].mdn.value;
  document.forms[0].methodToCall.value='loadflexiPlan1';
  document.forms[0].action="ERechargeFlexi.do";
  document.forms[0].submit();
  return true;
  }
    // added by kalluri bhaskar as part of BRMKT285
  
    function backToPlanChoose5(){

  //var mdn = document.forms[0].mdn.value;
  document.forms[0].methodToCall.value='loadHome';
  document.forms[0].action="ERechargeFlexi.do";
  document.forms[0].submit();
  return true;
  }
  
  
  
   function backToPlanChoose2(){
  //var mdn = document.forms[0].mdn.value;

  document.forms[0].methodToCall.value='loadflexiPlan';
  document.forms[0].action="FlexiRechargeAction.do";
  document.forms[0].submit();
  return true;
  }
  
  // added by kalluri bhaskar as part of BRMKT285
  // Vijaya Added as part of COCC11436
   function payByMobileBal(){
  document.forms[0].methodToCall.value='loadPayByMobileBal';
  document.forms[0].action="ERechargeAction.do";
  document.forms[0].submit();
  return true;
  }
//  function rcvPayByMobile(obj){
//    if(document.myForm.verificationCode.value==null || document.myForm.verificationCode.value=="" ){
//        alert('Please enter verification code');
//        document.myForm.verificationCode.value="";
//        document.myForm.verificationCode.focus();
//        return false;
//       
//       }
//      // this.href="message.html?iframe";
//  // msgPopUp();
//  document.forms[0].methodToCall.value='payByMobile';
//  document.forms[0].action="ERechargeAction.do";
//  document.forms[0].submit();
//  return true;
//  }
 
  
//  function msgPopUp(){
//   alert('Please wait, the request is in progress. Please do not refresh the page or click on the back button');
//  }
  function goBackSelectedPlan(){
 window.opener.document.forms[0].uniqueId.value = document.forms[0].uniqueId.value;
 window.opener.document.forms[0].amountP.value= document.forms[0].amountP.value+"#"+document.forms[0].planRiValue.value;
 window.opener.document.forms[0].mdn.value= document.forms[0].mdn.value;
 window.opener.document.forms[0].circleId.value=document.forms[0].circleId.value;
 window.opener.document.forms[0].accProfile.value=document.forms[0].accProfile.value;
 window.opener.document.forms[0].isFromTopUpConfirm.value=document.forms[0].isFromTopUpConfirm.value;
 window.opener.document.forms[0].fromBuyTopUp.value=document.forms[0].fromBuyTopUp.value;
 window.opener.document.forms[0].winProfile.value=document.forms[0].winProfile.value;
 window.opener.document.forms[0].stvRiValue.value=document.forms[0].stvRiValue.value;
 window.opener.document.forms[0].stvAmount.value=document.forms[0].stvAmount.value;
 window.opener.document.forms[0].recharge_type.value=document.forms[0].recharge_type.value;
 //Added by Bhaskar as part of COMKT3835 - start
 //alert(document.forms[0].productType.value);
 //alert(document.forms[0].businessType.value);
 //alert(" amountP" + window.opener.document.forms[0].amountP.value);
 window.opener.document.forms[0].productType.value=document.forms[0].productType.value;
 window.opener.document.forms[0].businessType.value=document.forms[0].businessType.value;
 //Added by Bhaskar as part of COMKT3835 - End
 window.opener.loadSelectedSTV();
 this.self.close();
 return false;

  }
 function goBackAllRcvPlans(){
  document.forms[0].recharge_type.value = 'Pin';
 window.opener.document.forms[0].uniqueId.value = document.forms[0].uniqueId.value;
 window.opener.document.forms[0].amountP.value= document.forms[0].amountP.value;
 window.opener.document.forms[0].mdn.value= document.forms[0].mdn.value;
 window.opener.document.forms[0].circleId.value=document.forms[0].circleId.value;
 window.opener.document.forms[0].accProfile.value=document.forms[0].accProfile.value;
 window.opener.document.forms[0].isFromTopUpConfirm.value=document.forms[0].isFromTopUpConfirm.value;
 window.opener.document.forms[0].fromBuyTopUp.value=document.forms[0].fromBuyTopUp.value;
 window.opener.document.forms[0].winProfile.value=document.forms[0].winProfile.value;
 window.opener.document.forms[0].stvRiValue.value=document.forms[0].stvRiValue.value;
 window.opener.document.forms[0].stvAmount.value=document.forms[0].stvAmount.value;
 window.opener.document.forms[0].recharge_type.value=document.forms[0].recharge_type.value;
  //Added by Bhaskar as part of COMKT3835 - start
 window.opener.document.forms[0].productType.value=document.forms[0].productType.value;
 window.opener.document.forms[0].businessType.value=document.forms[0].businessType.value;
 //Added by Bhaskar as part of COMKT3835 - End

  window.opener.loadAllSTV();
  this.self.close();
  return false;
  }
   function goBackSelectedPlan1(){
  document.forms[0].methodToCall.value='addToPin';
  document.forms[0].action="ERechargeAction.do";
  document.forms[0].submit();
  return true;
  }
  function goBackAllRcvPlans1(){
  document.forms[0].recharge_type.value = 'Pin';
  document.forms[0].methodToCall.value='loadPlanNew';
  document.forms[0].action="ERechargeAction.do";
  document.forms[0].submit();
  return true;
  }
 function goBuyTopUp(){
  if(document.forms[0].rechargeTypeFlag.value != null && document.forms[0].rechargeTypeFlag.value =='E-STICK_PIN'){
  document.forms[0].recharge_type.value = 'E-STICK_FLEXI';
  }else{
  document.forms[0].recharge_type.value = 'Flexi';
  }
  document.forms[0].fromPayByMobile.value = 'true';
  document.forms[0].action="ERechargeAction.do"; 
  document.forms[0].methodToCall.value='loadPlanNew'; 
  document.forms[0].submit();
   return true;
 }
   // Vijaya Added as part of COCC11436

  function FlexiBased()
  {
      var amountF = document.myForm.amountF.value;
      if(amountF=="")
      {
        alert('Please enter Amount');
        document.myForm.amountF.focus();
        return false;
      }
       document.myForm.selectedValue.value='Flexi';
      document.myForm.action="ValidateAction.do?amountF="+amountF;
      document.myForm.submit();
     
          
  }
// MH6453 added by rajeswari.
function checkPassword(password, pattern)
{
  var allValid=false;
       for (var i=0; i<password.length; i++)
        {
          if (pattern.indexOf(password.charAt(i)) > -1)
          {
                allValid = true;
                break;
          }
        }
     return allValid;
}
 function checkChangePassword(oldPsw,newPsw,renewPsw,oldPswId,newPswId,renewPswId)
{
      var num_valid="1234567890";
      var alph_valid="abcdefghijklmnopqrstuvwxyz"
      var alph_capt="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var allValid =false;
      var spcl_chars = "!@#$%^&*()+=-[]\\\';,./{}|:<>?\"";

  if(oldPsw=="")
   {
    alert("Please enter Old Password");
   document.getElementById(oldPswId).focus();
    return false;
   }
 else if(newPsw=="")
   {
    alert("Please enter New Password");
    document.getElementById(newPswId).focus();
    return false;
   }  
  else if(newPsw.length<8)
  {
    alert("Please enter atleast 8-16 characters for New Password.");
    document.getElementById(newPswId).focus();
    return false;
  }
   else if (num_valid.indexOf(newPsw.charAt(0))>-1 || spcl_chars.indexOf(newPsw.charAt(0))>-1)
  {
      alert('Your new password must not start with a digit/special character');
     document.getElementById(newPswId).focus();
      return false;
  }
   else if(newPsw == oldPsw)
  {
    alert("New Password should be different from current Password");
     document.getElementById(newPswId).focus();
    return false;
  }
 else if(! (checkPassword(newPsw,alph_valid)) )
  {
      alert("Your password must contain atleast one small letter");
      document.getElementById(newPswId).focus();
      return false;
  }
  else if(! (checkPassword(newPsw,alph_capt)) )
  {
      alert("Your password must contain atleast one capital letter");
       document.getElementById(newPswId).focus();
      return false;
  }
  else if(! (checkPassword(newPsw,num_valid)) )
  {
      alert("Your password must contain atleast one digit");
     document.getElementById(newPswId).focus();
      return false;
  }
  
  else if(! (checkPassword(newPsw,spcl_chars)) )
  {
      alert("Your password must contain atleast one special character");
      document.getElementById(newPswId).focus();
      return false;
  }
  else if(renewPsw=="")
   {
    alert("Please enter confirm Password");
     document.getElementById(renewPswId).focus();
    return false;
   }   
  else if(newPsw!=renewPsw)
   {
    alert("New Password and Confirm Password are not same. Please re-enter New Password and Confirm Password.");
    document.getElementById(newPswId).focus();
    return false;
   }  
  return true;
}


// MH6453 end by rajeswari.
//  function PinBased()
//  {
//           var selectList = document.forms[0].amountP;
//           var selectedOne = false;
//           var selectedPhone = '';
//           if(selectList.length+'' !='undefined')
//           {
//             for(var i=0;i<selectList.length;i++){
//              if(selectList[i].checked == true){
//                selectedOne = true;
//                selectedPhone = selectList[i].value;
//              }
//           }
//           }else{
//            if(selectList.checked == true){
//                selectedOne = true;
//                selectedPhone = selectList.value;
//              }
//           }
//           if(selectedOne == false){
//            alert('Select the Voucher you want to Recharge');
//            return false;
//           }   
//           
//             document.myForm.methodToCall.value="addToPin";
//             document.myForm.action="ERechargeAction.do";
//             document.myForm.submit();
//             return true;
//           
//    }

//-------------------------------------------------------------------------------------------------------

