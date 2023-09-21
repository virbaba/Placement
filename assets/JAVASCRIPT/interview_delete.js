$(document).ready(function() {
    $('.delete-interview').on('click', function(e) {
        e.preventDefault(); // Prevent default behavior of anchor tag

        const interviewId = $(this).data('id');
        $.ajax({
            url: `/interviews/delete/${interviewId}`,
            type: 'get',
            success: function(response) {
                // Update UI to reflect the deleted document
                $(`#interview-${interviewId}`).remove(); // Assuming student element has an ID like 'student-<studentId>'
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});
