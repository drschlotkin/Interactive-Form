// Hide elements on start up
$('#colors-js-puns').hide();
const other = $('#other-title').detach()
$('p').hide();
$('#name').focus();
$('#payment').val('credit card')
$("#payment option[value='select_method']").attr("disabled", true)


// Display 'Job Role: Other' element
$('#title').on('change',  () => {
    $('#title').val() === 'other' ? $(other).insertAfter('#title') : $('#other-title').hide();
})


// Variables for registration form
let totalCost = 0;
const main = "input[name='all']";
const frameworks = "input[name='js-frameworks']";
const express = "input[name='express']";
const libraries = "input[name='js-libs']";
const node = "input[name='node']";
const build = "input[name='build-tools']";
const npm = "input[name='npm']";


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
=======================
DISABLE/ENABLE ACTIVITIES BASED ON THE TIME SLOTS AND CALCULATE TOTAL COST */

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
    $(checkbox).prop('disabled', false).parent().css('color', 'black').css('cursor', 'pointer');
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
        $('#credit-card').hide();
        $('div:last-child p').hide();
        $('div:nth-last-child(2) p').show();
    };
    
    if ($('#payment').val() == 'bitcoin'){
        $('#credit-card').hide();
        $('div:nth-last-child(2) p').hide();
        $('div:last-child p').show();
    };
});


/*==============
Register Button 
================
CHECK AND HIGHLIGHT ALL REQUIRED FIELDS */


// For styling purposes only (horizontal rule above 'Register' Button)
$('button').wrap("<legend id='btn'></legend>");


$('button').on('click', (e) => {

    // Name and email input fields
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

    // 'Job Role: other' field
    if ($('#other-title').is(':not(:hidden)') && $('#other-title').val() == ''){
        $("#other-title").addClass('redBorder').attr('placeholder', 'Please enter a job role...')
    }

    $('#other-title').on('change keypress', () => highlight('#other-title'));


    // Loop through activities
    let empty = true
    $('input[type=checkbox]:checked').each(function () { $(this).is(':checked') ? empty = false : empty = true });
    
    if (empty){
        $('.activities legend').first().addClass('redText').text('Please select at least one activity:')
    } 

    // Credit card information
    if ($('#cc-num').val() == '') $("#cc-num").addClass('redBorder').prev().addClass('redText');
    if ($('#zip').val() == '') $("#zip").addClass('redBorder').prev().addClass('redText');
    if ($('#cvv').val() == '') $("#cvv").addClass('redBorder').prev().addClass('redText');
    
    
    /*=====================================================================================================================
    I'M TRYING TO FIGURE OUT HOW TO LOOP THROUGH ALL THE INPUT FIELDS TO MAKE SURE THEY ARE FILLED OUT BEFORE I SUBMIT FORM
    |                   |               |
    |                   |               |
    v                   v               v                                                                                  */
    
    $("input").each(function() {
        
        if ($(this).val() == ''){
          
        }else{
            e.preventDefault();
        }
                 
    });
});    

// Reset input fields back to original styling once text is entered
$('#name').on('change keypress', () => highlight('#name'))
$('#mail').on('change keypress', () => highlight('#mail'));
$('.activities').on('change', () => {$('.activities legend').first().removeClass('redText').text('Register for Activities')});
$('#cc-num').on('change keypress', () => highlight('#cc-num'));
$('#zip').on('change keypress', () => highlight('#zip'));
$('#cvv').on('change keypress', () => highlight('#cvv'));


const highlight = (field) => {
    $(field).removeClass('redBorder', 'placeholder').prev().removeClass('redText')
    if (event.which == 13) $(field).blur()
}

/*=================================
CODE THAT WILL PROBABLY GET DELETED
===================================*/

 // Remove 'Select Payment' option
    // let payment = $('#payment').find("option").eq(0);
    // if (payment.val() == 'select_method') payment.remove();


// Create error message element if no payment is selected
// $('<p id="select"></p>').insertBefore('#credit-card');

// If no payment method is selected
    // if ($('#payment').find("option").eq(0).val() == 'select_method'){
    //     $('#select').show()
    //     $('#select').text('Please select a payment method')
    // }
// $('#credit-card').hide();

 // Hide error message element
    // $('#select').hide()