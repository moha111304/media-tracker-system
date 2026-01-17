document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:5001/media'
    const media_list = document.getElementById('media-list');

    // Function to show popups of data
    async function popup() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            // Clearing the "Loading..." text first
            media_list.innerHTML = '';

            if (data.length > 0) {
                data.forEach(item => {
                    const div = document.createElement('div');
                    // class for styling
                    div.className = 'item-row'; 
                    div.textContent = `${item.title} - ${item.tracking_status}`
                    media_list.appendChild(div);
                });
            } else {
                media_list.style.display = 'No items found.';
            }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    popup();
});