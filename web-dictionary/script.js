
const sectionElement = document.querySelector('section');
        const card = document.querySelector('.card');

        async function fetchMeaning(word) {
            const apiUrl = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const response = await apiUrl.json();

            card.innerHTML = '';

            if (response.length > 0) {
                const wordData = response[0];
                card.innerHTML = `<h2>Meanings for ${word}</h2>`;
                // i took help of chatgpt to get this algo to extract data 
                // i can write this code in simpler method but it will take time
                // Display phonetics
                if (wordData.phonetics && wordData.phonetics.length > 0) {
                    card.innerHTML += "<p><b>Phonetics:</b></p>";
                    wordData.phonetics.forEach(phonetic => {
                        if (phonetic.text) {
                            card.innerHTML += `<p>${phonetic.text}</p>`;
                        }
                    });
                }

                // Display meanings
                if (wordData.meanings && wordData.meanings.length > 0) {
                    wordData.meanings.forEach((meaning, index) => {
                        card.innerHTML += `<p><b>${index + 1}. ${meaning.partOfSpeech}:</b></p>`;
                        meaning.definitions.forEach((definitionObj, defIndex) => {
                            card.innerHTML += `<p><em>Definition ${defIndex + 1}:</em> ${definitionObj.definition}</p>`;
                            if (definitionObj.example) {
                                card.innerHTML += `<p><em>Example:</em> ${definitionObj.example}</p>`;
                            }
                            if (definitionObj.synonyms && definitionObj.synonyms.length > 0) {
                                card.innerHTML += `<p><em>Synonyms:</em> ${definitionObj.synonyms.join(', ')}</p>`;
                            }
                        });
                    });
                  
                    
                }
            } else {
                card.classList.remove('card');
                card.style.backgroundColor='rgba(255, 0, 0, 0.474)'
                card.style.textAlign='center'
                card.style.marginTop='20px'
                card.innerHTML = `<p>No meanings found for "${word}"</p>`;
              

               

        // Reset animation
        
            }
        }

        btn.addEventListener('click', function() {
            const word = document.getElementById('form1').value;
            
            card.style.backdropFilter = 'blur(10px)';

                  
            sectionElement.style.display = 'none';
            card.style.backgroundColor = ' transparent';
            card.style.backdropFilter = 'blur(100%)';
            fetchMeaning(word);
        });