// Typewriter effect
const typewriterText = document.querySelector('#typewriter span');
const phrases = [
  'Head of Cyber Security',
  'IT Manager',
  'AWS Certified Professional',
  'Security Specialist'
];

let phraseIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < phrases[phraseIndex].length) {
    typewriterText.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriterText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 500);
  }
}

// Start the typewriter effect
setTimeout(type, 1000);