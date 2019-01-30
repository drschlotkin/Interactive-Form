// Hide/display elements on start up
$('#name').focus();
$('#other-title').hide();
$('p').hide();


// Variables for registration form
let totalCost = 0;
const main = "input[name='all']";
const frameworks = "input[name='js-frameworks']";
const express = "input[name='express']";
const libraries = "input[name='js-libs']";
const node = "input[name='node']";
const build = "input[name='build-tools']";
const npm = "input[name='npm']";


// Display text area if 'other' is selected, and hide it if its not.
$('#title').on('change',  () => {
    if ($('#title').val() === 'other'){
        $('#other-title').show() ;   
    }else{
        $('#other-title').hide();
    };
});


/*===============
T-Shirt Selection
=================*/
$("#design").on('focus change', () => {

    // Remove 'Select Theme' option    
    let design = $('#design').find("option").eq(0);
    if (design.val() == 'Select Theme') design.remove();

    //Match T-Shirt color based on design
    if ($('#design').val() == 'js puns'){
        $('#color').val('cornflowerblue');
            for (let i = 0; i <=5; i++){
                (i < 3) ? $(`#color :eq(${i})`).show() : $(`#color :eq(${i})`).hide();
            };
    }else{
        $('#color').val('tomato');
        for (let i = 0; i <=5; i++){
            (i < 3) ? $(`#color :eq(${i})`).hide() : $(`#color :eq(${i})`).show();
        };
    };
});


/*=====================
Activities Registration 
=======================*/
$(main).on('click', function() {
    $(this).is(':checked') ? add(200) : sub(200);
});

$(frameworks).on('click', function() {
    $(this).is(':checked') ? addCost(express, 100) : subCost(express, 100);
});

$(libraries).on('click',function() {
    $(this).is(':checked') ? addCost(node, 100): subCost(node, 100);
});

$(express).on('click', function() {
    $(this).is(':checked') ? addCost(frameworks, 100) : subCost(frameworks, 100);
});

$(node).on('click', function() {
    $(this).is(':checked') ? addCost(libraries, 100) : subCost(libraries, 100);
});

$(build).on('click', function() {
    $(this).is(':checked') ? add(100) : sub(100);
});

$(npm).on('click', function() {
    $(this).is(':checked') ? add(100) : sub(100);
});

// If activity is 'checked', calculate total cost and disable time conflicting fields
const addCost = (checkbox, cost) => {
    add(cost);
    $(checkbox).prop('disabled', true);
};

// If activity is 'unchecked', subtract from total cost and enable fields
const subCost = (checkbox, cost) => {
    sub(cost);
    $(checkbox).prop('disabled', false);
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


/*==========
Payment Info 
============*/
$('#payment').on('focus change', () => {

    // Remove Select Payment option
    let payment = $('#payment').find("option").eq(0);
    if (payment.val() == 'select_method') payment.remove();

    if ($('#payment').val() == 'credit card'){
        $('p').hide();
        $('#credit-card').show()
    }

    if ($('#payment').val() == 'paypal') {
        $('#credit-card').hide()
        $('p:nth-child(1)').show()
    }

    if ($('#payment').val() == 'bitcoin'){
        $('#credit-card').hide()
    }
})




$('button').on('click', (e) => {
    e.preventDefault()
})



// $('h3').show()
// $('#total').text(totalCost)
// $("input[name='js-libs']").prop('disabled', true)


// $("#design").on('change', () => {  
//     if ($('#design').val() == 'js puns'){
//         $('#color').val('cornflowerblue')
//         $('#color option[cost=cornflowerblue]').show()
//         $('#color option[cost=darkslategrey]').show()
//         $('#color option[cost=gold]').show()
//         $('#color option[cost=tomato]').hide()
//         $('#color option[cost=steelblue]').hide()
//         $('#color option[cost=dimgrey]').hide()
//     }else{
//         $('#color').val('tomato')
//         $('#color option[cost=tomato]').show()
//         $('#color option[cost=steelblue]').show()
//         $('#color option[cost=dimgrey]').show()
        
//         $('#color option[cost=cornflowerblue]').hide()
//         $('#color option[cost=darkslategrey]').hide()
//         $('#color option[cost=gold]').hide()
//     }
// });
// Highlight input fields if there is data
// $('fieldset input').blur(function(){
//     ($(this).val()) ? $(this).css("background-color","#ffffb3") : $(this).css("background-color","#c1deeb")
// });


