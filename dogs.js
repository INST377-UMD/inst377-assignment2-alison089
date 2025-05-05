function fetchRandomDogImages() {
    fetch('https://dog.ceo/api/breeds/image/random/10')
        .then(response => response.json())
        .then(data => {
            const carousel = document.getElementById('dogCarousel');
            carousel.innerHTML = '';
            
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Random dog';
                carousel.appendChild(img);
            });
            
            if (typeof slider === 'function') {
                slider('.dog-carousel');
            }
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
}

function fetchDogBreeds() {
    fetch('https://api.thedogapi.com/v1/breeds')
        .then(response => response.json())
        .then(breeds => {
            const buttonsContainer = document.getElementById('breedButtons');
            
            breeds.forEach(breed => {
                const button = document.createElement('button');
                button.className = 'breed-button';
                button.textContent = breed.name;
                button.dataset.breedId = breed.id;
                
                button.addEventListener('click', function() {
                    displayBreedInfo(breed);
                });
                
                buttonsContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching dog breeds:', error);
        });
}

function displayBreedInfo(breed) {
    const infoContainer = document.getElementById('breedInfo');
    infoContainer.style.display = 'block';
    
    infoContainer.innerHTML = `
        <h4>${breed.name}</h4>
        <p><strong>Breed Group:</strong> ${breed.breed_group || 'N/A'}</p>
        <p><strong>Life Span:</strong> ${breed.life_span}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
        <p><strong>Weight:</strong> ${breed.weight.imperial} lbs (${breed.weight.metric} kg)</p>
        <p><strong>Height:</strong> ${breed.height.imperial} in (${breed.height.metric} cm)</p>
        <p><strong>Bred For:</strong> ${breed.bred_for || 'N/A'}</p>
    `;
}

function addPageSpecificCommands(commands) {
    commands['load dog breed :breed'] = function(breed) {
        const buttons = document.querySelectorAll('.breed-button');
        const lowerBreed = breed.toLowerCase();
        
        for (const button of buttons) {
            if (button.textContent.toLowerCase().includes(lowerBreed)) {
                button.click();
                break;
            }
        }
    };
    return commands;
}

document.addEventListener('DOMContentLoaded', function() {
    fetchRandomDogImages();
    fetchDogBreeds();
    
    window.addPageSpecificCommands = addPageSpecificCommands;

});