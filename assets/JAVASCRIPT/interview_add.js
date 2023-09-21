$(document).ready(function() {
    $('#interviewForm').submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/interviews/create',
            data: formData,
            success: function(data) {
                var interview = data;

                // Reset the form
                $('#interviewForm')[0].reset();

                var displayInfo = `
                    <div class="sub-container" id="${interview._id}">
                        <div id="company-image">
                            <img src="/IMAGE/company.png" alt="" height="150" width="150">
                        </div>
                        <div class="details">
                            <label>Company Name:</label> &nbsp;&nbsp; <span>${interview.companyName}</span>
                        </div>
                        <div class="details">
                            <label>Role:</label> &nbsp;&nbsp; <span>${interview.role}</span>
                        </div>
                        <div class="details">
                            <label>Address:</label> &nbsp;&nbsp; <span>${interview.address}</span>
                        </div>
                        <div class="details">
                            <label>Date:</label> &nbsp;&nbsp; <span>${ new Date(interview.date).toISOString().split('T')[0] }</span>
                        </div>
                        <a href="/interviews/delete/${ interview._id }" class="delete-student" >
                            <input type="button" value="Delete" id="interview_delete">
                        </a>
                        <a href="" >
                            <input type="submit" value="Allocate To Student" id="interview_allocation">
                        </a> 
                    </div>`;

                $('.container').prepend(displayInfo);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});