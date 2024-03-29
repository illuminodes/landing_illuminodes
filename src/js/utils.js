import Toastify from 'toastify-js'
import  List from 'list.js';

export const newList = (id, options) => {
    return new List(id, options);
}

export const showSuccessMessage = (message) => {
    Toastify({
        text: message,
        duration: 2100,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // Toast is at the bottom
        position: "left", // Toast is on the right
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#27B825",
            color: "#ffffff",
            position: "fixed", // Fixed position relative to the viewport
            right: "24px", // Align to the right edge of the screen
            bottom: "24px", // Align to the bottom of the screen
            padding: "12px", // Padding inside the toast
            width: "auto", // Width auto-adjusts to content
            borderRadius: "6px", // Optional, for rounded corners
            boxShadow: "0 0 10px rgba(0,0,0,0.5)" // Optional, for shadow effect
        },
        onClick: function() { } // Callback after click
    }).showToast();
}

export const showErrorMessage = (message) => {
    Toastify({
        text: message,
        duration: 2100,
        destination: "",
        newWindow: true,
        close: true,
        gravity: "bottom", // Toast is at the bottom
        position: "left", // Toast is on the right
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#B82525",
            color: "#ffffff",
            position: "fixed", // Fixed position relative to the viewport
            right: "24px", // Align to the right edge of the screen
            bottom: "24px", // Align to the bottom of the screen
            padding: "12px", // Padding inside the toast
            width: "auto", // Width auto-adjusts to content
            borderRadius: "6px", // Optional, for rounded corners
            boxShadow: "0 0 10px rgba(0,0,0,0.5)" // Optional, for shadow effect
            
        },
        onClick: function() { } // Callback after click
    }).showToast();
}

