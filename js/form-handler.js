document.addEventListener('DOMContentLoaded', function() {
    
    // Google Sheets URL - REPLACE WITH YOUR URL
    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwmdfLuiqZTnw3kuTgxIP21oiBHWBdepvZAe1FL8bp_xCQ6GUd0keLrhjNaM2otpXerJg/exec';
    
    const forms = document.querySelectorAll('form[action*="formsubmit.co"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Let FormSubmit handle the email
            // But also send to Google Sheets
            
            const formData = new FormData(this);
            
            // Send to Google Sheets (doesn't prevent FormSubmit)
            fetch(GOOGLE_SHEETS_URL, {
                method: 'POST',
                body: formData
            })
            .then(response => console.log('Saved to Google Sheets'))
            .catch(error => console.log('Google Sheets error:', error));
            
            // FormSubmit will handle the rest
        });
    });
    
});