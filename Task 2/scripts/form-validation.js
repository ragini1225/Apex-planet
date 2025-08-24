// Form Validation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccessMessage');
    
    // Validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            required: false,
            pattern: /^[\+]?[0-9\-\(\)\s]+$/,
            minLength: 10
        },
        subject: {
            required: true
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 1000
        }
    };
    
    // Error messages
    const errorMessages = {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        minLength: 'This field is too short',
        maxLength: 'This field is too long',
        pattern: 'Please enter a valid format'
    };
    
    // Validate single field
    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        if (!rules) return { isValid: true };
        
        // Check required
        if (rules.required && (!value || value.trim() === '')) {
            return { 
                isValid: false, 
                message: errorMessages.required 
            };
        }
        
        // Skip other validations if field is empty and not required
        if (!rules.required && (!value || value.trim() === '')) {
            return { isValid: true };
        }
        
        // Check minimum length
        if (rules.minLength && value.length < rules.minLength) {
            return { 
                isValid: false, 
                message: `Minimum ${rules.minLength} characters required` 
            };
        }
        
        // Check maximum length
        if (rules.maxLength && value.length > rules.maxLength) {
            return { 
                isValid: false, 
                message: `Maximum ${rules.maxLength} characters allowed` 
            };
        }
        
        // Check pattern
        if (rules.pattern && !rules.pattern.test(value)) {
            if (fieldName === 'email') {
                return { 
                    isValid: false, 
                    message: errorMessages.email 
                };
            } else if (fieldName === 'phone') {
                return { 
                    isValid: false, 
                    message: errorMessages.phone 
                };
            } else if (fieldName === 'fullName') {
                return { 
                    isValid: false, 
                    message: 'Only letters and spaces allowed' 
                };
            } else {
                return { 
                    isValid: false, 
                    message: errorMessages.pattern 
                };
            }
        }
        
        return { isValid: true };
    }
    
    // Display field error
    function displayFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Display field success
    function displayFieldSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Clear field validation
    function clearFieldValidation(fieldName) {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        
        if (field && errorElement) {
            field.classList.remove('error', 'success');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Real-time validation for each field
    function setupRealTimeValidation() {
        Object.keys(validationRules).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                // Validate on blur
                field.addEventListener('blur', function() {
                    const validation = validateField(fieldName, this.value);
                    if (validation.isValid) {
                        displayFieldSuccess(fieldName);
                    } else {
                        displayFieldError(fieldName, validation.message);
                    }
                });
                
                // Clear validation on focus
                field.addEventListener('focus', function() {
                    clearFieldValidation(fieldName);
                });
                
                // Real-time validation on input for email field
                if (fieldName === 'email') {
                    field.addEventListener('input', function() {
                        if (this.value.length > 0) {
                            const validation = validateField(fieldName, this.value);
                            if (validation.isValid) {
                                displayFieldSuccess(fieldName);
                            } else if (this.value.length > 5) { // Only show error after user has typed reasonable amount
                                displayFieldError(fieldName, validation.message);
                            }
                        }
                    });
                }
            }
        });
    }
    
    // Validate entire form
    function validateForm() {
        let isFormValid = true;
        const formData = new FormData(form);
        
        Object.keys(validationRules).forEach(fieldName => {
            const value = formData.get(fieldName) || '';
            const validation = validateField(fieldName, value);
            
            if (validation.isValid) {
                displayFieldSuccess(fieldName);
            } else {
                displayFieldError(fieldName, validation.message);
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    // Handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Validating...';
        
        // Validate form
        setTimeout(() => {
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission
                submitBtn.textContent = 'Sending...';
                
                setTimeout(() => {
                    // Show success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    
                    // Show toast notification
                    showToast('Form submitted successfully!', 'success');
                    
                    // Reset form after 5 seconds
                    setTimeout(() => {
                        form.reset();
                        form.style.display = 'block';
                        successMessage.style.display = 'none';
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                        
                        // Clear all validations
                        Object.keys(validationRules).forEach(clearFieldValidation);
                    }, 5000);
                }, 1500);
            } else {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                showToast('Please fix the errors above', 'error');
            }
        }, 500);
    }
    
    // Initialize validation
    if (form) {
        setupRealTimeValidation();
        form.addEventListener('submit', handleFormSubmit);
        
        // Prevent browser's default validation
        form.setAttribute('novalidate', 'true');
    }
    
    console.log('Form validation initialized');
});