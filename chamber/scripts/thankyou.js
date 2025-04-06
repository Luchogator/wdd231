document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters (form data)
    const params = new URLSearchParams(window.location.search);
    const detailsContainer = document.getElementById('application-details');

    // If we have parameters, display them
    if (params.toString()) {
        // Clear loading message
        detailsContainer.innerHTML = '';

        // Create a list of details
        const detailsList = document.createElement('dl');

        // Map of field names to display names
        const fieldLabels = {
            'firstname': 'First Name',
            'lastname': 'Last Name',
            'title': 'Title/Position',
            'email': 'Email',
            'phone': 'Phone',
            'organization': 'Organization/Business',
            'description': 'Business Description',
            'membershipLevel': 'Membership Level',
            'timestamp': 'Submission Date/Time'
        };

        // Format the timestamp if it exists
        if (params.has('timestamp')) {
            const timestamp = params.get('timestamp');
            try {
                // Intenta convertir la marca de tiempo (como número) a una fecha legible
                const date = new Date(parseInt(timestamp));
                if (!isNaN(date)) {
                    params.set('timestamp', date.toLocaleString());
                }
            } catch (e) {
                console.error('Error formatting timestamp:', e);
                // Si hay un error, usamos el valor original
            }
        }

        // Add each form field to the details
        for (const [key, value] of params.entries()) {
            if (value && fieldLabels[key]) {
                const dt = document.createElement('dt');
                dt.textContent = fieldLabels[key] + ':';

                const dd = document.createElement('dd');
                dd.textContent = value;

                detailsList.appendChild(dt);
                detailsList.appendChild(dd);
            }
        }

        // Add the list to the container
        detailsContainer.appendChild(detailsList);
    } else {
        // If no parameters, show a message
        detailsContainer.innerHTML = '<p>No application details available. Please return to the <a href="join.html">application form</a>.</p>';
    }

    // Animate the content
    setTimeout(() => {
        document.querySelector('.thankyou-content').classList.add('show');
    }, 100);
}); 