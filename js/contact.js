// Contact form handling
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const formData = new FormData(form);
  
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = `
      <span class="flex items-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      </span>
    `;
  
    // Hide previous messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
  
    // Format email content
    const emailContent = `
  Name: ${formData.get('name')}
  Email: ${formData.get('email')}
  Message: ${formData.get('message')}
    `.trim();
  
    // Create mailto URL
    const mailtoUrl = `mailto:mohamedelsheikh4859@gmail.com?subject=Contact from Portfolio&body=${encodeURIComponent(emailContent)}`;
  
    // Simulate sending delay for better UX
    setTimeout(() => {
      try {
        // Open email client
        window.location.href = mailtoUrl;
  
        // Show success message
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-fadeIn');
  
        // Reset form
        form.reset();
  
        // Reset button state after delay
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = `
            <span class="relative z-10 flex items-center justify-center">
              <i class="fas fa-paper-plane mr-2 transition-transform duration-300 group-hover:translate-x-1"></i>
              <span>Send Message</span>
            </span>
          `;
        }, 1000);
  
      } catch (error) {
        // Show error message
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('animate-fadeIn');
  
        // Reset button state
        submitButton.disabled = false;
        submitButton.innerHTML = `
          <span class="relative z-10 flex items-center justify-center">
            <i class="fas fa-paper-plane mr-2 transition-transform duration-300 group-hover:translate-x-1"></i>
            <span>Send Message</span>
          </span>
        `;
      }
    }, 1500);
  }
  
  // Add form submit event listener
  document.getElementById('contactForm').addEventListener('submit', handleSubmit);