// formValidation.js
import { formInfoDB } from './FirebaseConfig.js'; // Adjust the path as needed

// Save form data to Firebase
function saveToFirebase(name, email, phone, subject, message) {
    const newFormInfo = formInfoDB.push(); // Use the imported reference
    newFormInfo.set({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    }, function (error) {
        if (error) {
            showToast("<i class='fa-solid fa-circle-xmark'></i> Error submitting the form data", "error");
        } else {
            showToast("<i class='fa-solid fa-circle-check'></i> Successfully submitted", "success");
            $('#poudel-contact')[0].reset(); // Reset form after successful submission
        }
    });
}

$(document).ready(function () {
    $('#poudel-contact').submit(function (event) {
        event.preventDefault(); // Prevent form submission
        
        let isValid = true;

        // Clear previous error messages
        $('.error').html('');
        $('#form_status').html(''); // Clear previous status message

        // Get form values
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const phone = $('#phone').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();

        // Validate fields
        if (name === '') {
            $('#name-error').html("Please enter your name");
            isValid = false;
        } else if (name.length < 5) {
            $('#name-error').html("Name must be at least 5 characters");
            isValid = false;
        }

        if (email === '') {
            $('#email-error').html("Please enter your email");
            isValid = false;
        } else if (!validateEmail(email)) {
            $('#email-error').html("Invalid email address");
            isValid = false;
        }

        if (phone === '') {
            $('#phone-error').html("Please enter your phone number");
            isValid = false;
        } else if (phone.length < 10) {
            $('#phone-error').html("Phone number must be at least 10 digits");
            isValid = false;
        }

        if (subject === '') {
            $('#subject-error').html("Please enter a subject");
            isValid = false;
        } else if (subject.length < 10) {
            $('#subject-error').html("Subject must be at least 10 characters");
            isValid = false;
        }

        if (message === '') {
            $('#message-error').html("Please enter a message");
            isValid = false;
        } else if (message.length < 10) {
            $('#message-error').html("Message must be at least 10 characters");
            isValid = false;
        }

        // If form is valid, submit the data to Firebase
        if (isValid) {
            saveToFirebase(name, email, phone, subject, message);
            $('#form_status').html("<i class='fa-solid fa-circle-check'></i> Form is being submitted...");
        } else {
            $('#form_status').html("<i class='fa-solid fa-circle-exclamation'></i> Please fix the errors in the form");
        }
    });
});

// Function to validate email address
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Function to show toast notification
function showToast(msg, type) {
    let toastBox = document.getElementById("toastBox");
    let toast = document.createElement("div");
    toast.classList.add("toast", type); // Add type class for styling
    toast.innerHTML = msg; // Set the message content

    // Append to toast box and show
    toastBox.appendChild(toast);
    $(toast).fadeIn(300).css({ opacity: 1, transform: 'translateX(0)' }); // Animate in

    // Fade out and remove after 6 seconds
    setTimeout(function () {
        $(toast).fadeOut(300, function () {
            toast.remove(); // Remove from DOM
        });
    }, 6000);
}
