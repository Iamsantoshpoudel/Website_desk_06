// Form Validation
$(document).ready(function() {
    // Form submit event
    $('#fruitkha-contact').submit(function(event) {
      event.preventDefault();
      var name = $('#name').val().trim();
      var email = $('#email').val().trim();
      var phone = $('#phone').val().trim();
      var subject = $('#subject').val().trim();
      var message = $('#message').val().trim();
  
      // Validate form fields
      if (name === '') {
        $('#name-error').html('Please enter your name');
      } else if (name.length < 5) {
        $('#name-error').html('Name must be at least 5 characters');
      } else {
        $('#name-error').html('');
      }
  
      if (email === '') {
        $('#email-error').html('Please enter your email');
      } else if (!validateEmail(email)) {
        $('#email-error').html('Invalid email address ');
      } else {
        $('#email-error').html('');
      }
  
      if (phone === '') {
        $('#phone-error').html('Please enter your phone number');
      } else if (phone.length < 10) {
        $('#phone-error').html('Phone number must be at least 10 digits');
      } else {
        $('#phone-error').html('');
      }
  
      if (subject === '') {
        $('#subject-error').html('Please enter a subject');
      } else if (subject.length < 10) {
        $('#subject-error').html('Subject must be at least 10 characters');
      } else {
        $('#subject-error').html('');
      }
  
      if (message === '') {
        $('#message-error').html('Please enter a message');
      } else if (message.length < 10) {
        $('#message-error').html('Message must be at least 10 characters');
      } else {
        $('#message-error').html('');
      }
  
      // Submit form if all fields are valid
      if (name !== '' && email !== '' && phone !== '' && subject !== '' && message !== '') {
        $.ajax({
          type: 'POST',
          url: 'mail.php',
          data: {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
          },
          headers: {
            'X-CSRF-Token': '{{ csrf_token }}' // Add CSRF token (if using a framework like Laravel)
          },
          success: function(data) {
            $('#success').html('Form submitted successfully!');
            $('#fruitkha-contact')[0].reset();
          }
        });
      }
    });
  });
  
  // Function to validate email address
  function validateEmail(email) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  
  // Change color of message to match page color
  var pageColor = $('body').css('background-color');
  $('#message-error').css('color', pageColor);
  
  // Apply color to message dynamically
  function applyColorToMessage() {
    var pageColor = getPageColor();
    $('#message-error').css('color', pageColor);
  }
  
  function getPageColor() {
    return $('body').css('background-color');
  }
  
  applyColorToMessage();
  
  $(document).on('DOMSubtreeModified', 'body', function() {
    applyColorToMessage();
  });