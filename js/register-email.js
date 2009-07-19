/*
    Modal PHP Ajax Form

    @author:    Kien Tran (kientran@kientran.com)
    @version:   1.0
    @date:      16 July 2009

    This project aims to create a basic php form submitter with AJAX
    support while maintaining complete graceful degredation in case
    of issues with the Javascript on the client side.  

    This code is the AJAX handler.  It uses jQuery and SimpleModal
    by Eric Martin (http://www.ericmmartin.com/projects/simplemodal/)

    The code will bind to the link on the HTML page, overriding
    it's default action to go to the PHP form, and instead calling
    the form via jQuery.get().  It will then bind it's own event
    handlers to the form's buttons and execute the code here.

    This code also provides a simple validation example that updates
    the modal box without having to send an POST request to the
    form.

*/

$(document).ready(function () {
    // Bind newsletter click event
    $('a.newsletter-signup').click(function (e) {
        e.preventDefault();
        // Show modal form
        // onShow calls register.show to override the form button events
        // and create an AJAX based POST
        $.get("php/register-email.php", function(data){
            $(data).modal({
                overlayId: 'register-email-overlay',
                containerId: 'register-email-container',
                position: ['15%',],
                onShow: register.show
            });
        });
    });
});

var register = {
    show: function (dialog) {
    // Process form elements 
        // Bind to submit button on generated form, submit form to script
        $('#register-email-container .register-submit').click( function (e) {
            e.preventDefault();
            // Validate the email before you POST the form
            if (register.validate()) {
                // Post the form to the PHP Script it will respond with a message
                $.post('php/register-email.php', 
                    $('#register-email-container form').serialize(),
                    function (response) {
                        if (response == 'OK'.trim()) {
                            // Email was validated and sent
                            $('#register-email-container form').css( {display: 'none' });
                            $('#register-email-container .form-response').css( { color: 'black' } );
                            $('#register-email-container .form-response').html(
                                'Please Check your Email Inbox for the confirmation letter.'
                            );
                            // Append a close box link since the form is how hidden
                            $('#register-email-container .form-response').append(
                                '<br /><a href=javascript:jQuery.modal.close()>Close</a>'
                            );
                        }  
                        else {
                            // If the PHP response was not OK, print error message
                            $('#register-email-container .form-response').html(response);
                        }
                    }
                );
            }
            else {
                // Form email didn't validate
                $('#register-email-container .form-response').css( { color: 'red' } );
                $('#register-email-container .form-response').html('Invalid Email Address');
            }
        });
        // Bind to cancel button of generated form to close form
        $('#register-email-container .register-cancel').click( function (e) {
            e.preventDefault();
            $.modal.close();
        });
    },
    validate: function (dialog) {
        // Validate Form
        var emailRegEx = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var email = $('#register-email-container #email-input').val();
        if(emailRegEx.test(email) == true)
            return true;
        return false;
    }
};
