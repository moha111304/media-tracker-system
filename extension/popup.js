document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:5001/media'
    const media_list = document.getElementById('media-list'); 

    // Function to show popups of data
    async function popup() {
        try {
            // Get the CURRENT values from the UI
            const searchVal = document.getElementById('search-input')?.value ?? '';
            const statusVal = document.getElementById('status-filter')?.value ?? '';
            
            // Build the params based on those current values
            const params = new URLSearchParams();
            if (searchVal) params.append('title', searchVal);
            if (statusVal) params.append('tracking_status', statusVal);
            
            const queryString = params.toString();
            const finalUrl = queryString ? `${url}?${queryString}` : url;

            const response = await fetch(finalUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            // Clearing the "Loading..." text first
            media_list.innerHTML = '';

            if (data.length > 0) {
                data.forEach(item => {
                    const div = document.createElement('div');
                    const childSpan = document.createElement('span');
                    const updateButton = document.createElement('button');

                    // class for styling
                    div.className = 'item-row'; 

                    childSpan.textContent = `${item.title} - ${item.tracking_status}`

                    updateButton.textContent = '+1';
    
                    // Event Listener, while we have access to 'item'
                    updateButton.addEventListener('click', () => {
                        updateButton.disabled = true; // Stop double-clicking
                        updateProgress(item.id, item.current_progress, item.tracking_status);
                    });

                    // Append children to the div
                    div.appendChild(childSpan);
                    div.appendChild(updateButton);

                    media_list.appendChild(div);
                });
            } else {
                media_list.textContent = 'No items found.';
            }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    async function updateProgress(id, current_progress, tracking_status) {
        try {
             const response = await fetch(`${url}/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ current_progress: current_progress + 1, 
                        tracking_status: tracking_status })
             });
             
        const result = await response.json();

        if (response.ok) {
            console.log('Successfully updated:', result);
            popup();  
        } else {
            alert(`Update Failed: ${result.error || 'Unknown Error'}`);
            popup();  
        }

        } catch (err) {
            console.error('Fetch Error:', err);
        }
    }

    // For the dropdown
    document.getElementById('status-filter').addEventListener('change', popup);

    let searchTimeout;
    // For the search box
    document.getElementById('search-input').addEventListener('input', () => {
        console.log("Typing detected..."); // Check if event fires
        clearTimeout(searchTimeout); 
        searchTimeout = setTimeout(() => {
            console.log("Timeout finished, calling popup()"); // Check if debounce works
            popup();
        }, 300);
    });

    popup();
});