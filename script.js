const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
/* =========================
   SIDE SECTION NAVIGATION
========================= */

const sectionNavLinks = document.querySelectorAll('.section-dots a');

const sectionIds = [
  'top',
  'packages',
  'service-area',
  'results',
  'booking',
  'reviews',
  'faq'
];

const sectionElements = sectionIds
  .map(id => document.getElementById(id))
  .filter(Boolean);

function updateSectionNavigation() {

  // ეკრანის იმ წერტილს ვიღებთ,
  // რომლის მიხედვითაც განვსაზღვრავთ მიმდინარე სექციას
  const scrollPoint = window.scrollY + window.innerHeight * 0.38;

  let currentSection = sectionElements[0];

  sectionElements.forEach(section => {
    if (section.offsetTop <= scrollPoint) {
      currentSection = section;
    }
  });

  sectionNavLinks.forEach(link => {
    link.classList.remove('active');
  });

  const activeLink = document.querySelector(
    `.section-dots a[data-section="${currentSection.id}"]`
  );

  if (activeLink) {
    activeLink.classList.add('active');
  }
}

/* Scroll-ზე მუდმივად ამოწმებს */
let ticking = false;

window.addEventListener('scroll', () => {

  if (!ticking) {

    window.requestAnimationFrame(() => {
      updateSectionNavigation();
      ticking = false;
    });

    ticking = true;
  }

}, { passive:true });


/* გვერდის ჩატვირთვისას */
window.addEventListener('load', updateSectionNavigation);

/* Resize-ის დროსაც */
window.addEventListener('resize', updateSectionNavigation);


/* ხაზზე დაჭერისას */
sectionNavLinks.forEach(link => {

  link.addEventListener('click', event => {

    event.preventDefault();

    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);

    if (!target) return;

    const headerOffset = 80;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior:'smooth'
    });

  });

});
