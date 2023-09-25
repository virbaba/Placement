$(document).ready(function() {
    $('.delete-student').on('click', async function(e) {
        e.preventDefault(); // Prevent default behavior of anchor tag

        const studentId = $(this).data('id');

        try {
            const response = await fetch(`/students/delete/${studentId}`, {
                method: 'get'
            });

            const data = await response.json();

            if (data.success) {
                new Noty({
                    type: 'success',
                    text: data.message,
                    timeout: 1500
                }).show();

                // Update UI to reflect the deleted student
                $(`#student-${studentId}`).remove(); // Assuming student element has an ID like 'student-<studentId>'
            } else {
                new Noty({
                    type: 'error',
                    text: data.message,
                    timeout: 1500
                }).show();
            }
        } catch (error) {
            console.error('Error:', error);
            new Noty({
                type: 'error',
                text: 'An error occurred while deleting the student.',
                timeout: 1500
            }).show();
        }
    });
});
