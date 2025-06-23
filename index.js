const heroName = document.getElementById('heroName');
const text = heroName.textContent;
heroName.textContent = "";

const nameParts = text.split(" ");

let totalDelay = 0;

function animateWord(word, baseDelay) {
  word.split("").forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = 'inline-block';
    span.style.animation = `typing 0.3s forwards`;
    span.style.animationDelay = `${baseDelay + i * 0.1}s`;
    heroName.appendChild(span);
  });
  return word.length * 0.1; // Return the delay added by this word
}

nameParts.forEach((part, index) => {
  totalDelay += animateWord(part, totalDelay);
  if (index < nameParts.length - 1) {
    heroName.appendChild(document.createElement('br'));
  }
});



/*
 * To adjust the scroll animation length (how far the heroName follows the scroll),
 * tweak the calculation below:
 *    window.scrollY < resumeTop - heroHeight - OFFSET
 * Increase OFFSET for a longer scroll before the name stops.
 */
const SCROLL_OFFSET = 40; // Increase this value for more scroll distance

window.addEventListener('scroll', () => {
  const hero = document.getElementById('heroName');
  const resume = document.querySelector('.resume');
  const heroRect = hero.getBoundingClientRect();
  const resumeRect = resume.getBoundingClientRect();

  // Distance from top of document to resume
  const resumeTop = resumeRect.top + window.scrollY;
  // Height of heroName
  const heroHeight = hero.offsetHeight;

  // Get the initial offsetTop of heroName relative to document
  const heroInitialTop = hero.getBoundingClientRect().top + window.scrollY;

  // Only start sticky when heroName hits the top of the viewport
  if (window.scrollY >= heroInitialTop && window.scrollY < resumeTop - heroHeight) {
    // Stick heroName to top as you scroll
    hero.style.position = 'fixed';
    hero.style.top = '0';
    hero.style.left = '0';
    hero.style.transform = '';
    hero.style.width = 'auto';
    hero.style.zIndex = '1000';
  } else if (window.scrollY < heroInitialTop) {
    // Initial state: keep heroName at its original position
    hero.style.position = 'absolute';
    hero.style.top = ''; // Use CSS value (e.g., 10%)
    hero.style.left = '0';
    hero.style.transform = '';
    hero.style.width = 'auto';
    hero.style.zIndex = '1000';
  } else {
    // Stop heroName at the top of resume
    hero.style.position = 'absolute';
    hero.style.top = (resumeTop - hero.parentElement.offsetTop - heroHeight) + 'px';
    hero.style.left = '0';
    hero.style.transform = '';
    hero.style.width = 'auto';
    hero.style.zIndex = '1000';
  }
});
