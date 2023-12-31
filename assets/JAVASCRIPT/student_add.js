
$(document).ready(function() {
    
$('#studentForm').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Serialize form data to send via AJAX
    var formData = $(this).serialize();

    $.ajax({
        type: 'post',
        url: '/students/add', // Updated URL
        data: formData,
        success: function(data) {
            console.log(data);
            var student = data;

             // Reset the form
             $('#studentForm')[0].reset();

            var displayInfo = `
                <div id="${student._id}" class="display_info">
                    <div id="student-image">
                        <img src="/IMAGE/student.png" alt="" height="150" width="150">
                    </div>
                    <div class="info">
                        <label class="label">First Name:</label>
                        <span id="first-name" class="std_detail">${student.firstName}</span>
                    </div>
                    <div class="info">
                        <label class="label">Last Name:</label>
                        <span id="last-name" class="std_detail">${student.lastName}</span>
                    </div>
                    <div class="info">
                        <label class="label">Email:</label>
                        <span id="email" class="std_detail">${student.email}</span>
                    </div>
                    <div class="info">
                        <label class="label">Mobile Number:</label>
                        <span id="contact" class="std_detail">${student.mobileNumber}</span>
                    </div>
                    <div class="info">
                        <label class="label">Address:</label>
                        <span id="address" class="std_detail">${student.address}</span>
                    </div>
                </div>
                <a href="/students/delete/${student._id}">
                    <input type="submit" value="Delete" id="student_delete">
                </a>
                <a href="/students/display/${student._id}">
                    <input type="submit" value="More Details" id="student_detail">
                </a>
            `;

            // Prepend the new content to the detail-container
            $('.detail-container').prepend(displayInfo);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // This provides a smooth scroll effect, if supported by the browser
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
});

});

