$(document).ready(function() {
        $('.delete-student').on('click', function(e) {
            e.preventDefault(); // Prevent default behavior of anchor tag

            const studentId = $(this).data('id');
            console.log(studentId);
            $.ajax({
                url: `/students/delete/${studentId}`,
                type: 'get',
                success: function(response) {
                    // Update UI to reflect the deleted document
                    $(`#student-${studentId}`).remove(); // Assuming student element has an ID like 'student-<studentId>'
                },
                error: function(error) {
                    console.error(error);
                }
            });
        });
    });
