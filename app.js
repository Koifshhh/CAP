var appName = 'CornellApplePie';

// variables fro displaying error messages
var bullet = '\u2022' + ' ';
var lineBreak = '\r\n';
var iErrorCode = 0;
var sLogAction = '';
var iReportTemp;
var iHighTemp = 107;
var iLowTemp = 94.9;
var aSymptomCheckBoxes = [];
//var iWarningTemp = 99.4;
var iWarningTemp = 100;

//var aValidStudent = [];
var sErrorMessage = '';

// validation variables

////////////////////////////////////////////////
// some standard js
///////////////////////////////////////////////
/*
 * function showdiv
 * This function changes the display to visible for the given element
 * @param string, {Id}, the name of the selection element to test.
*/
function showdiv(id){
    $("[id='"+id+"']").show();
}

/*
 * function hidediv
 * This function changes the display to none for the given element
 * @param string, {Id}, the name of the selection element to test.
*/
function hidediv(id){
    $("[id='"+id+"']").hide();
}

/*
 * function hideOnClick
 * This function hides the given element
*/
function hide_OnClick(elementId){
    $("#"+elementId).addClass('is-hidden');
}

///////////////////////////////////////////////
// an on ready script
//////////////////////////////////////////////
// I will be using the ready trigger to set up the button on click events for my examples
try{
    $(document).ready(function(){
        $('#indivRecords').addClass('is-hidden');
        $('#overlay').addClass('is-hidden');
        // update the user name
        $('#sMyDate').html(strDate);
        $('#sMyName').html(sName);
        $('#username').val(sUserName);
        $('#userid').val(sUserId);

        var sDivText = '<span class="temperature"><label for="temperature">Temperature in &#176; F</label><input aria-label="Temperature in &#176; F" type="text" name="health_tracker[temperature]" id="temperature" value="" maxlength=5 onChange="valueCheck();" placeholder="Enter your current temperature"/></span><br /><div class="symptomsRadios"><span >Are you experiencing <a href="https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html" target="_blank" style="text-decoration:underline;">COVID-19 symptoms</a> today?</span><label for="15-0" data-labelfor="15-0"><input aria-label="health_tracker[15]" type="radio" name="health_tracker[15]" class="radio 15 " id="15-0" value="no"  onchange="ShowHideDetailedSymptoms();"/>No</label><label for="15-1" data-labelfor="15-1"><input aria-label="health_tracker[15]" type="radio" name="health_tracker[15]" class="radio 15 " id="15-1" value="yes"  onchange="ShowHideDetailedSymptoms();"/>Yes</label></div>';
        $('#secondLoad').html(sDivText);
        sDivText = 'Please select all the symptom(s) that you have.<br />';
        for (var i = 0; i < aSymptoms.length; i++) {
            var j = i + 1;
            if(aSymptoms[i].length > 0){
                aSymptomCheckBoxes.push(j);
                sDivText = sDivText + '<span class="gi"><div class="symptomsRadios"><label for="'+j+'-0" data-labelfor="'+j+'-0"><input aria-label="health_tracker['+j+']" type="radio" name="health_tracker['+j+']" class="radio '+j+' " id="'+j+'-0" value="yes" />'+aSymptoms[i]+'</label></div></span>';
            }
        }
        $('#symptomDetails').html(sDivText);
        //hide submit buttons
        hideButtons();

        //if user has altered any of the symptoms radios
        //we want to make sure we run the check form function again
        $('.symptomsRadios').change(function(){
            $('#testButton').removeClass('is-hidden');
            $('#buttons').addClass('is-hidden');
        });

        $('#temperature').blur(function(){
            $('#testButton').removeClass('is-hidden');
            $('#buttons').addClass('is-hidden');
        });
    });
} catch (e) {
	console.log(e.message);    //this executes if jQuery isn't loaded
}

function ShowHideDetailedSymptoms(){
    if($('#15-0').prop('checked')){$('#symptomDetails').addClass('is-hidden');}
    if($('#15-1').prop('checked')){$('#symptomDetails').removeClass('is-hidden');}
}

function notOnCampus(){
    if($('#not_on_campus-0').prop('checked')){
        $('#sNotOnCampusToday').addClass('is-hidden');
        $("#temperature").prop('required', false);
        $('#on_campus').val('no');
        hideButtons();
    }
    if($('#not_on_campus-1').prop('checked')){
        $('#sNotOnCampusToday').removeClass('is-hidden');
        $("#temperature").prop('required', true);
        $('#on_campus').val('yes');
        hideButtons();
    }
    if($('#not_on_campus-2').prop('checked')){
        $('#sNotOnCampusToday').removeClass('is-hidden');
        $("#temperature").prop('required', true);
        $('#on_campus').val('No BUT reporting');
        hideButtons();
    }
}

//function to check the temperature field when user clicks out of the field
//so we can throw an alert right away if input is questionable
//instead of waiting until bottom of page
function valueCheck(){
    var sTempError = '';
    bValidateTemp = false;
    var iTemp = parseFloat($('#temperature').val());

    bValidateTemp = (((iTemp < iHighTemp) && (iTemp >= iLowTemp)) ? true : false);
    if(!bValidateTemp){
        sTempError = lineBreak + bullet + 'Temperature' + lineBreak + 'Temperature is blank or out of the accepted range.' + lineBreak + 'Please enter a valid temperature.' + lineBreak;
        $('#temperature').val('');
//        showInformationalMessage('Please complete the field(s): ', sTempError, '', 'warning');
        alert('Please complete the field(s): ' + sTempError + 'warning');
    } else {
        $('#sNotOnCampusToday').removeClass('is-hidden');
    }
}

//to hide buttons so users can't click 5 times
function hideButtons(){
    var buttons = $('#buttons').addClass('is-hidden');
    var testButton = $('#testButton').removeClass('is-hidden');
}

//to hide buttons so users can't click 5 times
function hideAllButtons(){
    $('#overlay').removeClass('is-hidden');
    var buttons = $('#buttons').addClass('is-hidden');
    $("#cancelDiv").addClass('is-hidden');
}

 function showButtons(){
    var moreButtons = $('#buttons').removeClass('is-hidden');
    var testButton = $('#testButton').addClass('is-hidden');
}

//NOTE: this is part of the code that is commented out
//as a result of the committee changes; leaving this in for now
//$('#other-1').change(function(){
//    if($(this).is(':checked') && $(this).val() === 'Yes'){
//        $('.hideOther').removeClass('is-hidden');
//    }
//});
//
//$('#other-0').change(function(){
//    if($(this).is(':checked') && $(this).val() === 'No'){
//        $('.hideOther').addClass('is-hidden');
//    }
//});

//to check that student completed the required fields
function bAllRequiredSet(){
    var isCheckedOnCampus = false;
    if($('#on_campus').val().length > 0){isCheckedOnCampus = true;}
    var isCheckedHasSymptoms = false;
    if($('#15-0').prop('checked') || $('#15-1').prop('checked')){ isCheckedHasSymptoms = true;}
    var isCheckedBeenExposed = false;
//    if($('#TitleId').val() == 1){
//        if($('#18-1').prop('checked')){ isCheckedBeenExposed = true;}
        if($('#18-0').prop('checked') || $('#18-1').prop('checked')){ isCheckedBeenExposed = true;}
    //} else {
    //    if($('#19-0').prop('checked') || $('#19-1').prop('checked')){ isCheckedBeenExposed = true;}
//    }
    var isCheckedNotOnCampusToday = false;
    if($('#not_on_campus-0').prop('checked')){ isCheckedNotOnCampusToday = true;}
    var bTempCheck = false;
    iErrorCode = 0;
    iReportTemp = 0;
//NOTE: this is part of the code that is commented out
//as a result of the committee changes; leaving this in for now
//    var bOtherCheck = false;
//    var bOtherText = false;
    var bRadioChecked = false;
    var sError = '';
    sLogAction = 'CheckForm';
    if(! isCheckedNotOnCampusToday){
        bTempCheck = true;
        if(($('#temperature').val() == 'Enter your current temperature') || ($('#temperature').val().length < 1)){
            bTempCheck = false;
        }

        //means they didn't fill out the temperature field at all
        if(!bTempCheck){
            sError = lineBreak + bullet + 'Temperature' + lineBreak + 'You have not filled in your temperature for today.' + lineBreak ;
            iErrorCode = 1;
        }

        //cast the temperature string to a float so we can check that the number is a valid temperature
        var iTemp = parseFloat($('#temperature').val(), 10);
        var bTempCheck1 = false;

        //check that the temperature is a good number
        bTempCheck1 = (((iTemp < iHighTemp) && (iTemp > iLowTemp)) ? true : false);

        //so they filled in the temperature field, but the number they input is outside our accepted range
        if((bTempCheck) && (!bTempCheck1)){
            sError = sError + bullet + 'Temperature' + lineBreak + 'Temperature is blank or out of the accepted range.' + lineBreak + 'Please enter a valid temperature.' + lineBreak;
            //then reset the value to blank so the placeholder shows up again
            $('#temperature').val('');
            if(iErrorCode != 1){
                iErrorCode = 2;
            }
        } else {
            if(iTemp > iWarningTemp){
                iErrorCode = 3;
            }
            iReportTemp = iTemp;
        }
        if(! isCheckedOnCampus){
            sError = sError + bullet + 'On Campus' + lineBreak + 'You have not selected if you would be on campus today or not.' + lineBreak ;
        }
        if(! isCheckedHasSymptoms){
            sError = sError + bullet + 'Have Symptoms' + lineBreak + 'You have not selected if you are experiencing COVID-19 symptoms today.' + lineBreak ;
        }
        if(! isCheckedBeenExposed){
            sError = sError + bullet + 'Close Contact' + lineBreak + 'You have not selected if you have had close contact with someone in the last 48 hours.' + lineBreak ;
        }

        //now, let's check to see if the clicked the radio indicating
        //they have an "other" symptom
        //NOTE: this is part of the code that is commented out
        //as a result of the committee changes; leaving this in for now
    //    bOtherCheck = (($('#other-1').prop("checked")) ? true : false);
    //
    //    //if they did indicate another symptom, now we make sure
    //    //they filled in the text area for what that other symptom is
    //    if(bOtherCheck){
    //        //now check to see if the text area is filled in
    //        bOtherText = (($.trim($('#other_symptom').val()).length > 2) ? true : false);
    //
    //        if(!bOtherText){
    //            bOtherCheck = false;
    //            sError = sError + bullet + 'Describe other symptom' + lineBreak;
    //        }
    //    }

        //if the temp is filled in and it's valid
        //then let's check to see if any of the radios are checked "Yes"
        //NOTE: this is part of the code that is commented out
        //as a result of the committee changes; leaving this in for now
        if(bTempCheck1 && isCheckedOnCampus && isCheckedHasSymptoms && isCheckedBeenExposed){
            if($('#15-1').prop('checked')){
                //here's where to write validation to see if any symptoms
                //are set to yes
                $('input[type=radio]').each(function(){
                    if(($(this).is(':checked')) && ($(this).val() == 'yes')){
                        bRadioChecked = true;
                        if(iErrorCode == 1){
                            iErrorCode = 4;
                        } else if(iErrorCode == 2){
                            iErrorCode = 5;
                        } else if(iErrorCode == 3){
                            iErrorCode = 6;
                        } else if(iErrorCode == 4){
                            iErrorCode = 7;
                        } else if(iErrorCode == 5){
                            iErrorCode = 8;
                        } else if(iErrorCode == 6){
                            iErrorCode = 9;
                        }
                    }
                });
            } else {
                $(aSymptomCheckBoxes).each(function( index, val ) {
                    sId = val +'-0';
                    $('#' + sId).prop('checked',false);
                });
            }

    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ///////// The changes to the wording below is ugly needs improvement ///////////
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
            //set these so we know who to contact
    //        var sEntity = 'Human Resources';

            var sNote = 'DO NOT REPORT TO WORK ON CAMPUS TODAY';
            var sEntity = 'You are required to contact HR at 319-895-4243 for next steps regarding your work place.';
    //        var sAction = ' will be notified of your possible symptom(s), and you should contact your ';
            var sAction = ' Also, if you haven\'t already done so, contact your doctor for advice related to your symptoms and possible testing for COVID-19.';
    //NOTE: this is part of the code that is commented out
    //as a result of the committee changes; leaving this in for now
    //        var sPhoneNumber = '319-895-4243';
    //        var sHealthcare = 'healthcare provider, if you have not already done so.';
            var sHealthcare = '';

            //if the user is a student, reassign the default values of the vars
            if($('#student_check').val() !== ''){
                if($('#not_on_campus-2').prop('checked')){
                    sMenuLink = 'https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html (copy and paste into your browser)';
                    sNote = 'Thank you for completing the symptom checker. Since you have indicated possible symptoms, you will need to quarantine until you can be tested.';
                    sEntity = 'To find a testing center in your location, use  this link:' + sMenuLink;
                    sEntity = sEntity + ' or call your local health department for options.' + lineBreak;
                    sAction = '  You will receive another email from the Student Health Center with additional information. ';
                } else {
                    sMenuLink = 'https://cornell.cafebonappetit.com/#panel-daypart-menu-1 (copy and paste into your browser)';
                    sNote = 'Due to your response, you will need to quarantine in your room.';
                    sNote = sNote + ' If this is a weekday (Monday- Friday) please contact the Student Health Center (319-895-4292) immediately for further instructions.';
                    sEntity = 'If this is Saturday or Sunday, you will need to quarantine in your room and contact the Student Health Center (319-895-4292) first thing Monday morning.';
                    sEntity = sEntity + ' You will have food delivered, please use these links for the menu:' + sMenuLink;
                    sEntity = sEntity + ' and email your choices to this address: meals@Cornellcollege.edu';
        //            sEntity = 'Student Health';
    //                sNote = 'REMAIN IN YOUR ROOM TODAY AND CONTACT THE STUDENT HEALTH CENTER';
    //                sEntity = 'Immediately call the Student Health Center at 319-895-4292 for guidance in next steps regarding your symptoms and/or positive contact.';
        //            sAction = ' should be contacted at 319-895-4292, and you should contact your ';
                    sAction = ' This is an important step to keep our campus community healthy. Also notify your professor, coach, and/or workstudy supervisor that you will not be attending today. ';
                }
            }

    /*
            //if the user is a FT faculty member in AD, reassign the default values
            if($('#faculty_check').val() === 'faculty'){
                sNote = 'DO NOT REPORT TO WORK ON CAMPUS TODAY';
                sEntity = 'You are required to contact Academic Affairs at 319-895-4210 for next steps regarding your work place.';
                sAction = ' Also, if you haven\'t already done so, contact your doctor for advice related to your symptoms and possible testing for COVID-19.';
    //            sEntity = 'Academic Affairs';
    //NOTE: this is part of the code that is commented out
    //as a result of the committee changes; leaving this in for now
    //            sPhoneNumber = '319-895-4210';
            }
    */
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////

            //if we have valid data, see if we need to show popup with warning
    //NOTE: this is part of the code that is commented out
    //as a result of the committee changes; leaving this in for now
    //        if((iTemp > iWarningTemp) || (bOtherCheck) || (bRadioChecked)){
            if((iTemp > iWarningTemp) || (bRadioChecked)){
    //NOTE: this is part of the code that is commented out
    //as a result of the committee changes; leaving this in for now
//                showInformationalMessage(sNote, sEntity + sAction + sHealthcare, '', 'warning');
                alert(sNote+' '+ sEntity + sAction + sHealthcare + ' warning');
            }
            //putSystemLog();
            showButtons();
        } else {
            hideButtons();
            //putSystemLog();
//            showInformationalMessage('Please complete the field(s): ', sError, '', 'warning');
            alert('Please complete the field(s): '+ sError+' warning');
        }
    } else {
        //putSystemLog();
        showButtons();
    }
}

if ('serviceworker' in navigator) {
  navigator.serviceworker.register('/sw.js')
    .then((reg) => console.log('service worker registered', reg))
    .catch((err) => console.log('service worker not registered', err));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////AJAX Stuff ////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var ValidStudents = baseUrl+'ajax.php/aGetAllStudents';
// Auto Complete code uses //code.jquery.com/ui/1.11.0/jquery-ui.js & //code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css
//$().ready(function() {
//}
