<?php

/*
    Modal PHP Ajax Form

    @author:    Kien Tran (kientran@kientran.com)
    @version:   1.0
    @date:      16 July 2009

    This project aims to create a basic php form submitter with AJAX
    support while maintaining complete graceful degredation in case
    of issues with the Javascript on the client side.  

    This code is a basic php form submitter.  It will work completely 
    independent of the AJAX code providing graceful degredation

    This code as is WILL NOT EMAIL ANYTHING!!!

    It is setup more as an raw framework and the actual emailing or
    listserv registration code is left to the developer.  Other
    exercises include appending header/footer template code around
    the form if the form was not called by an AJAX event. 

*/

require 'validate-email.php';

// Checks if the request came from an AJAX request
function isAjax(){
    return (isset($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && $_SERVER['HTTP_X_REQUESTED_WITH']=="XMLHttpRequest");
}

// Check if the acton:submit exist and was via POST
$action = isset($_POST["action"]) ? $_POST["action"] : "";

// If action:submit doesn't exist it wasn't a POST request
// Return (display) the form
if (empty($action)) 
{
    $output = "";

   // Send the signup form
    $output = <<<SFORM
<div class='register-email-content'>
<h1 class='form-header'>Sign Up for our Email Newsletter</h1>
<div class='form-response'></div>
<form name='emailform' method='post' action='register-email.php'>
    <input type='hidden' name='action' value='submit' />
    <label for='email-input'>Email:</label>
    <input type='text' id='email-input' name='email' />
    <br />
    <label>&nbsp;</label>
    <button type='submit' class='register-submit'>Submit</button>
    <button type='cancel' class='register-cancel'>Cancel</button>
</form>
</div>
SFORM;

    echo $output;
}
else if ($action == "submit")
{
    // Form was submitted, process it now
    $email = $_POST['email'];

    // Validate Email again, incase javascript is not active
    if (validEmail($email))
    {
        // Send Email OUT
        /*************************
         Impelementation left up to site developer based on their needs
        *************************/

        // If it's an AJAX Request, return OK, else print the message
        if (isAjax())
            echo "OK";
        else
            echo "Please Check your Email Inbox for the confirmation letter";
    }
    else
    {
        echo "Invalid Email Address";
    }

}

?>
