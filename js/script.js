// Variables for registration form
let totalCost = 0;
const main = "input[name='all']";
const frameworks = "input[name='js-frameworks']";
const express = "input[name='express']";
const libraries = "input[name='js-libs']";
const node = "input[name='node']";
const build = "input[name='build-tools']";
const npm = "input[name='npm']";


// Hide elements and assign default values/attributes
$('#colors-js-puns').hide();
$('#other-title').hide()
$('#name').focus();
$('#payment').val('credit card');
$("#payment option[value='select_method']").attr("disabled", true);


// Display 'Job Role: Other' element
$('#title').on('change',  () => $('#title').val() === 'other' ? $('#other-title').show() : $('#other-title').hide());


// Email validation
$('#mail').on('keyup', () => {
    let regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    if (regex.test($('#mail').val()) || $('#mail').val() == ''){
        $('#mail').prev().text('Email:').css('color', 'black');
    }else{
        $('#mail').prev().text('Please enter a valid email address:').css('color', '#e60000');
       
    };
});


/*===============
T-Shirt Selection
=================*/

$("#design").on('change', () => {

    // Remove 'Select Theme' selection   
    let design = $('#design').find("option").eq(0);
    if (design.val() == 'Select Theme') design.remove();
    
    // Match T-Shirt color based on design
    if ($('#design').val() == 'js puns'){
        $('#colors-js-puns').show();
        $('#color').val('cornflowerblue');
        for (let i = 0; i <=5; i++){
            (i < 3) ? $(`#color :eq(${i})`).show() : $(`#color :eq(${i})`).hide();
        };
    }else{
        $('#colors-js-puns').show();
        $('#color').val('tomato');
        for (let i = 0; i <=5; i++){
            (i < 3) ? $(`#color :eq(${i})`).hide() : $(`#color :eq(${i})`).show();
        };
    }; 
});


/*=====================
Activities Registration
=======================*/
 
// Disable or enable activities based on the time slots and calculate total cost
$(main).on('click', () => $(main).is(':checked') ? add(200) : sub(200));
$(frameworks).on('click', () => $(frameworks).is(':checked') ? addCost(express, 100) : subCost(express, 100));
$(libraries).on('click', () => $(libraries).is(':checked') ? addCost(node, 100): subCost(node, 100));
$(express).on('click', () => $(express).is(':checked') ? addCost(frameworks, 100) : subCost(frameworks, 100));
$(node).on('click', () => $(node).is(':checked') ? addCost(libraries, 100) : subCost(libraries, 100));
$(build).on('click', () => $(build).is(':checked') ? add(100) : sub(100));
$(npm).on('click', () => $(npm).is(':checked') ? add(100) : sub(100));

// If activity is 'checked', calculate total cost and disable time conflicting fields
const addCost = (checkbox, cost) => {
    add(cost);
    $(checkbox).prop('disabled', true).css('cursor', 'not-allowed').parent().css('color', 'gray');
};

// If activity is 'unchecked', subtract from total cost and enable fields
const subCost = (checkbox, cost) => {
    sub(cost);
    $(checkbox).prop('disabled', false).css('cursor', 'pointer').parent().css('color', 'black');
};

// Addition function
const add = (cost) => {
    totalCost += cost;
    $('h3').show();
    $('#total').text(totalCost);
}

// Subtract function
const sub = (cost) => {
    totalCost -= cost;
    if (totalCost <= 0) $('h3').hide();
    $('#total').text(totalCost);
}


/*===========
Payment Info 
=============*/

$('#payment').on('change', () => {
   
    // Display payment info based on selection 
    if ($('#payment').val() == 'credit card'){
        $('#credit-card').show();
        $('div:last-child p').hide();
        $('div:nth-last-child(2) p').hide();
    } 

    if ($('#payment').val() == 'paypal') {
        eraseCreditInfo()
        $('#credit-card').hide();
        $('div:last-child p').hide();
        $('div:nth-last-child(2) p').show();

    };
    
    if ($('#payment').val() == 'bitcoin'){
        eraseCreditInfo()
        $('#credit-card').hide();
        $('div:nth-last-child(2) p').hide();
        $('div:last-child p').show();
    };
});

// Erase credit card info when another payment is selected
const eraseCreditInfo = () => {
    $('input', $('.credit-card')).each(function (){
        $(this).val('').removeClass('redBorder').prev().removeClass('redText')
    })
}
 

/*==============
Register Button 
================*/

// Check and highlight all required fields
$('button').on('click', (e) => {
    
    // Name and email fields
    if ($('#name').val() == '') {
        $("#name").addClass('redBorder')
                .attr('placeholder', 'Please enter a name...')
                .prev().addClass('redText');
    };
    if ($('#mail').val() == ''){
        $("#mail").addClass('redBorder')
                .attr('placeholder', 'Please enter an email...')
                .prev().addClass('redText');
    };
    
  
    // Loop through activities - At least one must be checked
    let empty = true
    $('input[type=checkbox]:checked').each(function () { $(this).is(':checked') ? empty = false : empty = true });
    if (empty) $('.activities legend').first().addClass('redText').text('Please select at least one activity:');


    // Credit card information - Check for correct format
    if ($('#payment').val() == 'credit card'){

        if ($('#cc-num').val() == '') {
            $("#cc-num").addClass('redBorder').prev().addClass('redText');
        }else{
            let ccRegex = /^[0-9]{13,16}$/;
            if (!ccRegex.test($('#cc-num').val())) $("#cc-num").addClass('redBorder').prev().addClass('redText');
        };   

        if ($('#zip').val() == '') {
            $("#zip").addClass('redBorder').prev().addClass('redText');
        }else{
            let zipRegex = /^[0-9]{5}$/;
            if (!zipRegex.test($('#zip').val())) $("#zip").addClass('redBorder').prev().addClass('redText');
        };

        if ($('#cvv').val() == '') {
            $("#cvv").addClass('redBorder').prev().addClass('redText');
        }else{
            let ccvRegex = /^[0-9]{3}$/;
            if (!ccvRegex.test($('#cvv').val())) $("#cvv").addClass('redBorder').prev().addClass('redText');
        };
    }
    
    // Submit form if there are no error messages
    $('*').each(function () {
        if ($(this).is('.redText, .redBorder')){
            e.preventDefault();
            
        }
    })
});    


// Reset input fields back to original styling once text is entered
$('#name').on('change keypress', () => highlight('#name'))
$('#mail').on('change keypress', () => highlight('#mail'));
$('.activities').on('change', () => {$('.activities legend').first().removeClass('redText').text('Register for Activities')});
$('#cc-num').on('change keypress', () => highlight('#cc-num'));
$('#zip').on('change keypress', () => highlight('#zip'));
$('#cvv').on('change keypress', () => highlight('#cvv'));

const highlight = (field) => {
    $(field).removeClass('redBorder', 'placeholder').prev().removeClass('redText');
    if (event.which == 13) $(field).blur();
};