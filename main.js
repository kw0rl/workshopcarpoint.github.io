let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    menu.classList.remove('active');
}

let cart = [];
let totalPrice = 0;
let removedItem = null; // To store temporarily removed item
let undoTimeout = null; // To store the timeout ID for undo
let countdownInterval = null; // To store the interval ID for countdown

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;
    updateCart();
}

function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - RM${item.price.toFixed(2)}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = "<i class='bx bxs-trash'></i>";
        deleteButton.onclick = () => removeFromCart(index);
        li.appendChild(deleteButton);
        cartItemsElement.appendChild(li);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

function removeFromCart(index) {
    removedItem = { ...cart[index], index }; // Store the removed item and its index
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCart();

    // Show undo message
    const undoMessage = document.getElementById('undo-message');
    const countdownElement = document.getElementById('countdown');
    undoMessage.classList.add('show');
    undoMessage.classList.remove('hide');
    
    // Initialize countdown
    let countdown = 5;
    countdownElement.textContent = `(${countdown})`;

    // Update countdown every second
    countdownInterval = setInterval(() => {
        countdown -= 1;
        countdownElement.textContent = `(${countdown})`;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            undoMessage.classList.remove('show');
            undoMessage.classList.add('hide');
            removedItem = null;
        }
    }, 1000);

    // Set a timeout to permanently remove the item after 5 seconds
    undoTimeout = setTimeout(() => {
        clearInterval(countdownInterval);
        undoMessage.classList.remove('show');
        undoMessage.classList.add('hide');
        removedItem = null;
    }, 5000);
}

function undoRemove() {
    if (removedItem) {
        cart.splice(removedItem.index, 0, { name: removedItem.name, price: removedItem.price });
        totalPrice += removedItem.price;
        updateCart();

        // Hide undo message and clear timeout and interval
        const undoMessage = document.getElementById('undo-message');
        undoMessage.classList.remove('show');
        undoMessage.classList.add('hide');
        clearTimeout(undoTimeout);
        clearInterval(countdownInterval);
        removedItem = null;
    }
}

function checkout() {
    alert(`Total price: RM${totalPrice.toFixed(2)}`);
    // Reset the cart after user clicks OK on the alert
    cart = [];
    totalPrice = 0;
    updateCart();
}

let menu = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    menu.classList.toggle('active');
    search.classList.remove('active');
}

//hide menu and search box on scroll
window.onscroll = () => {
    menu.classList.remove('active');
    search.classList.remove('active');
}

//header
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

//slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function updateSliderPosition() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSliderPosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSliderPosition();
}

updateSliderPosition();

//color
function changeTheme(color) {
    const body = document.querySelector('body');

    // Remove any existing theme classes
    body.classList.remove('theme-red', 'theme-magenta', 'theme-green');

    // Check if the user selected a custom color or default
    if (color === 'default') {
        // Revert to the default theme
        body.style.backgroundColor = '';
        body.style.color = '';
    } else {
        // Add the new theme class based on user selection
        body.classList.add(`theme-${color}`);
    }
}
