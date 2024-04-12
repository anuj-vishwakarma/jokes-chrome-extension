document.addEventListener('DOMContentLoaded', function() {
    const refreshButton = document.getElementById('refresh-button');
    const jokeElement = document.getElementById('jokeElement');

    // Function to fetch and display a joke
    function fetchAndDisplayJoke(jokeElement) {
        jokeElement.textContent = 'Loading...'; // Set loading text

        fetch('https://icanhazdadjoke.com/slack', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(jokeData => {
            const jokeText = jokeData.attachments[0].text;

           
            jokeElement.style.transition = 'opacity 0.5s ease-in-out';
            jokeElement.style.opacity = '0';
            setTimeout(() => {
                jokeElement.textContent = jokeText;
                jokeElement.style.opacity = '1';
            }, 100);
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
        });
    }


    fetchAndDisplayJoke(jokeElement);

   
    refreshButton.addEventListener('click', function() {
        fetchAndDisplayJoke(jokeElement);
        
        refreshButton.classList.add('clicked');
        setTimeout(() => {
            refreshButton.classList.remove('clicked');
        }, 150);
    });

    refreshButton.addEventListener('mouseenter', function() {
        refreshButton.style.cursor = 'pointer';
    });

    refreshButton.addEventListener('mouseleave', function() {
        refreshButton.style.cursor = 'default';
    });
});
