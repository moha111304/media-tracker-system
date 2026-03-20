/**
 * Global Utilities
 * High-end UI components like Toast notifications.
 */

const Utils = {
    /**
     * Show a non-blocking notification toast
     * @param {string} message - Text to display
     * @param {string} type - 'success' or 'error'
     */
    showToast: (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        // Inline styles if you haven't added them to CSS yet
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            background: type === 'success' ? '#00dac6' : '#cf6679',
            color: '#000',
            borderRadius: '8px',
            fontWeight: 'bold',
            zIndex: '9999',
            animation: 'slideIn 0.3s ease-out'
        });

        document.body.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
};

window.Utils = Utils;