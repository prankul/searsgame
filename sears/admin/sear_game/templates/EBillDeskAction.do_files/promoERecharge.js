
function isNumberKey1(evt)
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
         document.myForm.methodToCall.value='loadHome';
         document.myForm.action="PromoERechargeAction.do";
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
     
  function NEXT1()
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
      document.myForm.action="PromoERechargeAction.do";
  
      document.myForm.submit();
      return true;
  }
  
  function pinPayNow1(amt,mdn,profile,circle,rechargename,amount,talktime,adminfee,servicetax,benefits,validity,uniqueId,productType,rechargeType)//productType added as dynamic by Bhaskar as part of COMKT3835
  {
    
     if((document.myForm.productType.value != null && (document.myForm.productType.value == "DATACARD-VDATA" || document.myForm.productType.value == "DATACARD-HSIA") )
       || (document.myForm.productType.value != null && document.myForm.productType.value == "DONGLE")
      ){ 
       if(document.myForm.emailAddr1.value == null || document.myForm.emailAddr1.value ==""){
        alert("Please enter Email ID");
        document.getElementById("emailAddr1").focus();
          return false;
       }
     }
    
    var emailId = document.forms[0].emailAddr1.value;
    
    if(document.myForm.emailAddr1.value != null && document.myForm.emailAddr1.value !=""){
    if(emailID() == false)
    return false;
    }
    else
    {
     document.myForm.emailAddr.value = document.myForm.emailAddr1.value;
    }
    document.forms[0].action="rechargeHome.jsp";
    document.forms[0].submit();
    var child =window.open('EBillDeskAction.do?methodToCall=goToBillDeskPin&rechargeType='+rechargeType+'&productType='+productType+'&uniqueId='+uniqueId+'&amount_pin='+amt+'&mdn='+mdn+'&accProfile='+profile+'&circleId='+circle+'&rechargename='+rechargename+'&amount='+amount+'&talktime='+talktime+'&adminfee='+adminfee+'&servicetax='+servicetax+'&benefits='+benefits+'&validity='+validity+'&emailId='+emailId+'', null,'height=700,width=700,toolbar=no,menubar=no,location=yes,scrollbars=yes,resize=yes');
    child.focus();
    return false;
      /* document.myForm.methodToCall.value='postBillDesk';
       document.myForm.action="EBillDeskAction.do";
       document.myForm.submit();
       return true; */
    
    
  }
  function pinPayNow2(amt,mdn,profile,circle,rechargename,amount,talktime,adminfee,servicetax,benefits,validity,uniqueId,productType)//productType getting dynamically : Added by Bhaskar as part of COMKT3835
  {
    
    document.forms[0].action="rechargeHome.jsp";
    document.forms[0].submit();
    var child =window.open('EBillDeskAction.do?methodToCall=goToBillDeskPin&productType='+productType+'&uniqueId='+uniqueId+'&amount_pin='+amt+'&mdn='+mdn+'&accProfile='+profile+'&circleId='+circle+'&rechargename='+rechargename+'&amount='+amount+'&talktime='+talktime+'&adminfee='+adminfee+'&servicetax='+servicetax+'&benefits='+benefits+'&validity='+validity+'', null,'height=700,width=700,toolbar=no,menubar=no,location=yes,scrollbars=yes,resize=yes');
    child.focus();
    return false;
      /* document.myForm.methodToCall.value='postBillDesk';
       document.myForm.action="EBillDeskAction.do";
       document.myForm.submit();
       return true; */
  }
  
  
 function emailID()
{
   var va19 = document.forms[0].emailAddr1.value;
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
            document.forms[0].emailAddr.focus();  
            return false;
          }
          
          
        }
   
}
  
  function payByMobile(){
  
    if(document.myForm.emailAddr1.value != null && document.myForm.emailAddr1.value !=""){
    if(emailID() == false)
    return false;
    }
    document.myForm.emailAddr.value = document.myForm.emailAddr1.value;
       document.myForm.methodToCall.value='loadPayByMobileBalance';
       document.myForm.action="PromoERechargeAction.do";
       document.myForm.submit();
       return true;
  }
    function payByMobileBalance(){
       if(document.myForm.verificationCode.value==null || document.myForm.verificationCode.value=="" ){
        alert('Please enter verification code');
        document.myForm.verificationCode.value="";
        document.myForm.verificationCode.focus();
        return false;
       }
       promoMsgPopUp();
       document.myForm.methodToCall.value='payByMobileBalance';
       document.myForm.action="PromoERechargeAction.do";
       document.myForm.submit();
       return true;
  }
   function promoMsgPopUp(){
   alert('Please wait, the request is in progress. Please do not refresh the page or click on the back button');
  }
   function Submittion1(recharge_type)
  {

 var amountF="";
 var selectList="";
 if(recharge_type=='flexi')
   amountF = document.myForm.amountF.value;
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
                                  if(selectedOne == false &&  recharge_type=='pin' ){
                                  alert('Select the voucher you want to recharge');
                                  return false;
                                 }   
                                 
                                   document.myForm.methodToCall.value="loadPinVoucherPlan";//// modified by Yamini for COCC4614 
                                  // document.myForm.selectedValue.value="Pin";
                                   document.myForm.action="PromoERechargeAction.do";
                                   //document.myForm.submit();
                                   //return true;
                            }
            else{
           /* if( parseInt(amountF)<10 &&  recharge_type=='flexi' )
            {
                  alert('Please enter Minimum Rs.10 for top-up.');
                   document.myForm.amountF.value="";
                  document.myForm.amountF.focus();
                  return false;
            }*/
        /*    if(selectedOne==true){
            alert('Select either any voucher or enter amount but not both');
             if(selectList.length+'' !='undefined')
            selectList[selectedradio].checked=false;
            else
            selectList.checked=false;
            document.myForm.amountF.focus();
            return false;
            }*/
            document.myForm.selectedValue.value="Flexi";
            document.myForm.action="ValidateAction.do";
            }
           
      document.myForm.submit();
      return true;
  }
   function backToPlanChoose1(){
  //var mdn = document.forms[0].mdn.value;
  document.forms[0].methodToCall.value='loadPinVoucherPlan';
  document.forms[0].action="PromoERechargeAction.do";
  document.forms[0].submit();
  return true;
  }
  function backToPinVouchers1(){
  document.forms[0].action="PromoERechargeAction.do"; 
  if( document.forms[0].isLoadPinVoucher.value != null && document.forms[0].isLoadPinVoucher.value == 'true'){
   document.forms[0].methodToCall.value='loadPlan'; 
   document.forms[0].backFlag.value = 'true';
   }else{
    document.forms[0].methodToCall.value='loadHome'; 
   }
 // document.forms[0].action="PromoERechargeAction.do?methodToCall=loadPlan&param="+conn_type;";
  document.forms[0].submit();
  return true;
  }
  
 function backToHome1(){
  document.forms[0].action="PromoERechargeAction.do"; 
  //alert(document.forms[0].backHome.value);
  if( document.forms[0].backHome.value != ""){
     document.forms[0].methodToCall.value='loadHome'; 
  }else{
    document.forms[0].methodToCall.value='loadPlan'; 
  }
  document.forms[0].submit();
   return true;
 }
 
 function goToTopUp(){
  document.forms[0].recharge_type.value = 'Flexi';
  document.forms[0].fromPayByMobile.value = 'true';
  document.forms[0].action="ERechargeAction.do"; 
  document.forms[0].methodToCall.value='loadPlanNew'; 
  document.forms[0].submit();
   return true;
 }
 function loadSelectedPlan(){
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
 window.opener.document.forms[0].productType.value=document.forms[0].productType.value;
 window.opener.document.forms[0].businessType.value=document.forms[0].businessType.value;
 //Added by Bhaskar as part of COMKT3835 - End
 
 window.opener.loadSelectedRecharge();
 this.self.close();
 return false;
 }
 
 function loadAllPlans(){
 document.forms[0].isFromTopUpConfirm.value = 'true';
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
 window.opener.document.forms[0].city.value=document.forms[0].city.value;
 //Added by Bhaskar as part of COMKT3835 - start
 window.opener.document.forms[0].productType.value=document.forms[0].productType.value;
 window.opener.document.forms[0].businessType.value=document.forms[0].businessType.value;
 //Added by Bhaskar as part of COMKT3835 - End
 
 window.opener.loadAllRechargPlans();
  this.self.close();
  return false;
 }
 
  function backStvPlan(){
  document.forms[0].action="PromoERechargeAction.do"; 
  if(document.forms[0].fromSTV.value =='true'){
  document.forms[0].methodToCall.value='loadPlan'; 
  }else{
  document.forms[0].methodToCall.value='loadPinVoucherPlan'; 
  }
  
  document.forms[0].submit();
  return true;
 }
