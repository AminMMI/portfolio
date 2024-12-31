

  
  function splitLetters(text) {
      return text.split('').map(letter => {
          if (letter === ' ') {
              return ' ';
          }
          return `<span>${letter}</span>`;
      }).join('');
  }

  // Vérifier que les éléments sont bien sélectionnés
  const title1 = document.getElementById('titre1'); 
  const title2 = document.getElementById('titre2'); 
  const title3 = document.getElementById('title__presentation');


  if (title1) {
      title1.innerHTML = splitLetters(title1.textContent);
  }

  if (title2) {
      title2.innerHTML = splitLetters(title2.textContent);
  }

  if (title3) {
      title3.innerHTML = splitLetters(title3.textContent);
  }

  // Animation des lettres pour titre1
  gsap.to("#titre1 span", {
      duration: 1,
      rotateY: 360,
      stagger: 0.1,
      ease: "power2.inOut",
  });

  // Animation de réécriture du h1

  const titles = ["Web Developerr", "Creative Coderr", "Problem Solverr"];
  const textElement = document.getElementById("titre2");
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffectTitles() {
    const currentTitle = titles[currentIndex];
    
    if (!isDeleting) {
      charIndex++;
      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeEffectTitles, 1500); // Pause before deleting
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % titles.length;
      }
    }
    
    textElement.textContent = currentTitle.slice(0, charIndex);
    setTimeout(typeEffectTitles, isDeleting ? 50 : 100); // Adjust speed
  }

  typeEffectTitles();


  // Animation texte de présentation

  const texte = "Hi! My name is Amin Benazzouz. I'm a young student in the field of web development. I'm passionate about web development, creative design, and communication. Explore my website to discover my various projects! And don't hesitate to contact me for any collaboration. See you soon!";
  const texteElement = document.getElementById("presentation-text");
  let charTextIndex = 0; // Correctly initialized here

  function typeEffect() {
    if (charTextIndex < texte.length) {
      texteElement.textContent += texte.charAt(charTextIndex);
      charTextIndex++; // Increment the character index
      setTimeout(typeEffect, 20); // Call typeEffect again after a delay
    }
  }

  typeEffect();



  // Charger le fichier JSON avec fetch()
fetch('data.json')
.then(response => response.json())
.then(skillsData => {

  // Fonction pour afficher les données dans la modal
  document.querySelectorAll('.showDivLink').forEach(link => {
      link.addEventListener('click', function(event) {
         

          // Récupérer le nom de la compétence à partir de l'attribut data-skill
          const skillName = event.target.getAttribute('data-skill');

          // Trouver la compétence correspondante dans le JSON
          const skill = skillsData.find(skill => skill.skill.name.toLowerCase() === skillName);

          // Mettre à jour le contenu de la modal avec les informations de la compétence
          const modalContent = document.querySelector('.webskills__content');
          modalContent.innerHTML = `
              <a href="#skills" class="modal__close">&times;</a>
              <h2>${skill.skill.name}</h2>
              <img class="webskills__content-img" src="${skill.skill.illustration}" alt="${skill.skill.name} Illustration">
              <p>${skill.skill.text}</p>
          `;
      });
  });
})
.catch(error => {
  console.error('Erreur lors du chargement du fichier JSON:', error);
});
