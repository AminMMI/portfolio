const sky = document.getElementById('sky');
  
function createCube() {
  const cube = document.createElement('div');
  const size = Math.random() * 3 + 1; // Random size between 1px and 4px
  const xPos = Math.random() * window.innerWidth; // Random x position
  const yPos = Math.random() * window.innerHeight; // Random y position
  const animationDuration = Math.random() * 2 + 2; // Random duration between 2 and 4 seconds
  const delay = Math.random() * 4; // Random delay for the animation start

  cube.style.position = 'absolute';
  cube.style.width = `${size}px`;
  cube.style.height = `${size}px`;
  cube.style.backgroundColor = '#fff';
  cube.style.opacity = Math.random(); // Random opacity
  cube.style.top = `${yPos}px`;
  cube.style.left = `${xPos}px`;
  cube.style.borderRadius = '50%'; // Transform the square into a circle
  cube.style.animation = `twinkleAndMove ${animationDuration}s infinite ease-in-out ${delay}s`;

  sky.appendChild(cube);
}

// Create a number of cubes (e.g., 200 cubes)
for (let i = 0; i < 200; i++) {
  createCube();
}


// CSS animation for the twinkling effect and movement
const style = document.createElement('style');
style.innerHTML = `
@keyframes twinkleAndMove {
0% {
transform: translateZ(0) scale(0.5);
opacity: 0;
}
40% {
opacity: 1;
}
70% {
transform: translateZ(500px) scale(1.5);
opacity: 0.8;
}
100% {
transform: translateZ(1000px) scale(2);
opacity: 0;
}
`;
document.head.appendChild(style);

  
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
  const image = document.getElementById('image');


  if (title1) {
      title1.innerHTML = splitLetters(title1.textContent);
  }

  if (title2) {
      title2.innerHTML = splitLetters(title2.textContent);
  }


  // Animation des lettres pour titre1
 // Sélectionne toutes les lettres
const letters = document.querySelectorAll("#titre1 span");

// Positionne chaque lettre aléatoirement avant l'animation
letters.forEach(letter => {
    gsap.set(letter, {
        x: (Math.random() - 0.5) * 1000, 
        y: (Math.random() - 0.5) * 1000, 
        opacity: 0
    });
});

// Animation pour ramener les lettres à leur position d'origine
gsap.to(letters, {
    duration: 1,
    x: 0,
    y: 0,
    opacity: 1,
    stagger: 0.1,
    ease: "power2.out"
});

// Animation pour l'image 
gsap.to(image, {
  opacity: "1",
  ease: "power2.out",
scrollTrigger: {
  trigger: image,
  start: "top 50%",
  end: "top 40%",
  scrub: 1, 
}
});

  // Animation texte de présentation

  const texte = "Un étudiant en 2ème année de but mmi ! Âgé de 21 ans, je continue ma formation en me spécialisant dans le développement web. J'aime ce que je fais au sein de l'IUT et m'épanouis pleinement dans ce domaine. Actuellement, je suis activement en recherche de stage de 2 mois minimum qui commencerait en Avril 2025. Cela me permettrait de gagner de l'expérience en entreprise, parfaire mes connaissances et surtout valider mon année ! En espérant que mon portfolio vous plaise, je vous souhaite une bonne visite !";
  const texteElement = document.getElementById("presentation-text");
  let charTextIndex = 0; 

  function typeEffect() {
    if (charTextIndex < texte.length) {
      texteElement.textContent += texte.charAt(charTextIndex);
      charTextIndex++; 
      setTimeout(typeEffect, 20); 
    }
  }
 typeEffect();

//  Slider des projets

var position = 0;
var sliderWidth = document.querySelector('.js-slider').offsetWidth;
var picsWidth = document.querySelector('.js-pics').offsetWidth;
var pics = document.querySelector('.js-pics');


position += sliderWidth;
pics.style.left = "-" + position + "px";

function decaleGauche() {
    position += sliderWidth;
    if (position >= picsWidth - sliderWidth) {
        retourDebut();
    } else {
        pics.style.left = '-' + position + 'px';
    }
}

function decaleDroite() {
    position -= sliderWidth;
    if (position <= 0) {
        allerFin();
    } else {
        pics.style.left = '-' + position + 'px';
    }
}

function retourDebut() {
    pics.style.left = '-' + position + 'px';
    setTimeout(function() {
        position = 0;
        position += sliderWidth;
        pics.style.left = "-" + position + 'px';
        pics.style.transition = "0s";
        setTimeout(function() {
            pics.style.transition = ""; 
        }, 10);
    }, 350);
}

function allerFin() {
    pics.style.left = "-" + position + 'px';
    setTimeout(function() {
        position = picsWidth - sliderWidth;
        position -= sliderWidth;
        pics.style.left = "-" + position + 'px';
        pics.style.transition = "0s";
        setTimeout(function() {
            pics.style.transition = ""; 
        }, 10);
    }, 350);
}

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowLeft") {
      decaleDroite();
  } else if (event.key === "ArrowRight") {
      decaleGauche();
  }
});



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

