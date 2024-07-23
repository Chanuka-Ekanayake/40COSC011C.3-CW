/*                                                                    The properties of use functions

•	updateCartCount(): Updates the cart count displayed in the UI. 
This function calculates the total number of items in the cart by summing the quantities of all cart items. It then updates the text content of the cart count element in the DOM. If the cart is empty, it hides the count display. 

•	addToCart(product, quantity = 1, size = 'Default'): 
Adds a product to the shopping cart. 
This function takes a product object, quantity, and size as parameters. It creates a cart item object with the product details and selected options. If the item already exists in the cart (matching product ID and size), it increases the quantity. Otherwise, it adds a new item to the cart. The function then updates the cart in local storage and calls updateCartCount(). 

•	removeItemFromCart(index): Removes an item from the cart. 
This function removes the item at the specified index from the cart array. It then updates the cart in local storage, re-renders the cart display, and updates the cart count. 

•	changeQuantity(index, delta): Changes the quantity of an item in the cart. 
This function adjusts the quantity of a cart item by the specified delta value (positive or negative). It ensures the quantity doesn't go below 1. After updating the quantity, it saves the cart to local storage, re-renders the cart, and updates the cart count. 

•	renderCart(): Renders the cart contents in the UI. 
This function creates and populates a table with the current cart items. For each item, it displays the image, name, size, price, quantity (with increase/decrease buttons), subtotal, and a remove button. It also calculates and displays the cart total. 

•	decreaseQuantity(e) and increaseQuantity(e): 
Event handlers for quantity adjustment buttons. 
These functions decrease or increase the quantity of a cart item when the respective buttons are clicked. They update the cart and UI accordingly. 

•	removeItem(e): Event handler for removing an item from the cart. 
This function removes the item at the specified index from the cart when the remove button is clicked. It then updates the cart and UI. 

•	updateCart(): Updates the cart in local storage and refreshes the UI. 
This function saves the current cart state to local storage, re-renders the cart display, and updates the cart count. 

•	updateProductDetails(product): Updates the product details page with the selected product's information. 
This function populates the product details page with the name, description, price, images, and size options of the selected product. It also sets up event listeners for thumbnail and size button clicks. 

•	updateTotal(): Updates the total price on the product details page. 
This function calculates and displays the total price based on the selected quantity and base price of the product. 

•	getCurrentProduct(): Retrieves the currently viewed product. 
This function extracts the product ID from the URL parameters and finds the corresponding product in the products array. 

•	getSelectedSize(): Retrieves the currently selected size. 
This function returns the text content of the active size button. 

•	updatePriceForSize(size): Updates the product price based on the selected size.
This function adjusts the product price based on the selected size option, using predefined multipliers for different sizes. 

•	displayCheckoutSummary(): Displays the order summary on the checkout page. 
This function populates the checkout page with a summary of the cart items, including names, sizes, quantities, and prices. It also calculates and displays the total order amount. 

•	Event Listeners: Set up various event listeners for page interactions. 
The script sets up multiple event listeners for different pages (index, product, cart, checkout) to handle user interactions such as adding to cart, changing quantities, proceeding to checkout, and placing orders. */



// Store Product data
const products = [
    { 
        id: 1, 
        name: 'Electric Scooter', 
        price: 200.00, 
        images: {
            '40KM': 'scooter/scooter.png',
            '50KM': 'scooter/scooter 2.png',
            '60KM': 'scooter/scooter 3.png'
        },
        description: 'Eco-friendly and efficient, electric scooters provide a sustainable transportation option, reducing carbon emissions and traffic congestion in urban areaseautiful and natural air purifiers that improve indoor air quality, enhance décor, and promote a healthier living environment',
        sizes: ['40KM', '50KM', '60KM']
    },

    { 
        id: 2, 
        name: 'Water Filter', 
        price: 120.00, 
        images: {
            'UV G2': 'waterfilter/waterfilter2.png',
            'G2': 'waterfilter/waterfilter1.png',
            'ClassicL': 'waterfilter/waterfilter3.png'
        },
        description: 'Advanced systems that ensure clean and safe drinking water by removing impurities and contaminants.',
        sizes: ['UV G2', ' G2', 'ClassicL']
    },


    { 
        id: 3, 
        name: 'Solar Light', 
        price: 50.00, 
        images: {
            '100LED': 'solar/solar1.png',
            '160LED': 'solar/solar3.png',
            '320LED': 'solar/solar2.png'
        },
        description: 'Long-lasting bulbs that consume less energy, helping to lower electricity bills and reduce environmental impact. Solar-powered outdoor lights harness the sun\'s energy to illuminate spaces without additional electricity costs.',
        sizes: ['100LED', '160LED', '320LED']
    },

    { 
        id: 4, 
        name: 'Air Purifying Plant', 
        price: 27.00, 
        images: {
            'Ariane Fern': 'plants/plant3.png',
            'Emerald Queen Fern': 'plants/plant2.png',
            'Murano Fern': 'plants/plant1.png'
        },
        description: 'Beautiful and natural air purifiers that improve indoor air quality, enhance décor, and promote a healthier living environment.',
        sizes: ['Ariane Fern', 'Emerald Queen Fern', 'Murano Fern']
    },

    { 
        id: 5, 
        name: 'Booklets', 
        price: 1.00, 
        images: {
            'Eco-friendly Living : For a Better Tomorrow': 'booklets/content.jpg',
            'Promoting Sustainable Living': 'booklets/content.png',
            'Practical Sustainability': 'booklets/71NdD5fcv2L._AC_UY218_.jpg'
        },
        description: 'These sustainable life booklets provide practical tips and guides for living an eco-friendly lifestyle. Made from recycled paper and printed with eco-friendly ink, they are perfect for anyone looking to reduce their environmental impact and live more sustainably.',
        sizes: ['Eco-friendly Living : For a Better Tomorrow', 'Promoting Sustainable Living', 'Practical Sustainability']
    },

    
    { 
        id: 6, 
        name: 'Notebook', 
        price: 0.50, 
        images: {
            'white': 'Book/book1.png',
            'black': 'Book/book2.png',
            'red': 'Book/book3.png'
        },
        description: 'This recyclable notebook is made from 100% recycled paper, featuring a durable cover also crafted from recycled materials. Perfect for eco-conscious students and professionals, it offers a sustainable solution for all your writing needs.',
        sizes: ['white', 'black', 'red']
    },

    { 
        id: 7, 
        name: 'Solar power Calculator ', 
        price: 5.00, 
        images: {
            'black': 'calculator/cal1.png',
            'Pink': 'calculator/cal2.png'
        },
        description: 'Our solar-powered calculators utilize solar energy, eliminating the need for batteries. They provide reliable, eco-friendly calculations, making them ideal for students and professionals who prioritize sustainability..',
        sizes: ['black', 'Pink']
    },

    { 
        id: 8, 
        name: 'Bamboo Pen Holder ', 
        price: 2.00, 
        images: {
            'Dark-Brown': 'pencilholder/pencilholder1.png',
            'Light-Brown': 'pencilholder/pencilholder2.png'
        },
        description: 'This bamboo pencil holder is made from sustainable bamboo, offering a durable and biodegradable solution for desk organization. Its natural finish adds a touch of elegance to any workspace.',
        sizes: ['Dark-Brown', 'Light-Brown']
    },

    { 
        id: 9, 
        name: 'Face Mask', 
        price: 0.75, 
        images: {
            'Black ': 'facemask/facemask2.png',
            'White ': 'facemask/facemask1.png',
            'Grey ': 'facemask/facemask3.png'
        },
        description: 'Single-use masks made from biodegradable materials, offering protection while minimizing environmental impact.',
        sizes: ['Black', 'White' , 'Grey']
    },

    { 
        id: 10, 
        name: 'Eco-Friendly Cleaning Products', 
        price: 8.00, 
        images: {
            'MULTI PURPOSE CLEANER': 'cleaning/clean3.png',
            'Window and Glass Cleaner': 'cleaning/clean2.png',
            'Bath and Shower Cleaner': 'cleaning/clean1.png'
        },
        description: 'Non-toxic and biodegradable cleaning supplies that keep your home clean while protecting the environment.',
        sizes: ['MULTI PURPOSE CLEANER', 'Window and Glass Cleaner ' , 'Bath and Shower Cleaner']
    },

    { 
        id: 11, 
        name: 'Coton Towel', 
        price: 10.00, 
        images: {
            'Blue': 'towel/towel1.png',
            'Brown': 'towel/towel3.png',
            'Yellow': 'towel/towel2.png'
        },
        description: 'Our bath towels are made from organic cotton, providing a soft, absorbent, and eco-friendly option. Free from synthetic dyes and chemicals, they offer a sustainable choice for your bathroom.',
        sizes: ['Blue', 'Brown' , 'Yellow']
    },

    { 
        id: 12, 
        name: 'Sun Cream', 
        price: 9.00, 
        images: {
            'SPF50': 'suncream/suncream1.png',
            'SPF90': 'suncream/suncream2.png',
            
        },
        description: 'Our natural sun cream is formulated with mineral-based ingredients, providing broad-spectrum protection against UVA and UVB rays. Free from harmful chemicals, it’s packaged in eco-friendly containers..',
        sizes: ['SPF50', 'SPF90']
    },

    { 
        id: 13, 
        name: 'Jackets', 
        price: 11.00, 
        images: {
            'Black': 'Jackets/jak1.png',
            'White': 'Jackets/jack2.png',
            'Red': 'Jackets/jack3.png',
            
        },
        description: 'These eco-friendly jackets are made from recycled materials, offering warmth and style without compromising sustainability. Perfect for those who want to stay warm and fashionable while protecting the environment.',
        sizes: ['Black', 'White' , 'Red']
    },

    { 
        id: 14, 
        name: 'Shoes', 
        price: 20.00, 
        images: {
            'Blue': 'shoes/shoes1.png',
            'Black': 'shoes/shoes3.png',
            'Red': 'shoes/shoes2.png',
            
        },
        description: 'Our eco-friendly shoes are made from recycled and sustainable materials, offering comfort and style while reducing environmental impact. Perfect for eco-conscious consumers.',
        sizes: ['Blue', 'Black' , 'Red']
    },

    { 
        id: 15, 
        name: 'UV Glass', 
        price: 12.00, 
        images: {
            'Green': 'sunglass/sunglass1.png',
            'Black': 'sunglass/sunglass2.png',
            'Red': 'sunglass/sunglass3.png',
            
        },
        description: 'Protect your eyes with our UV glasses, made from sustainable materials. They offer stylish protection against harmful UV rays while promoting environmental sustainability.',
        sizes: ['Green', 'Black' , 'Red']
    },

    { 
        id: 16, 
        name: 'Cap', 
        price: 5.00, 
        images: {
            'Black': 'caps/cap1.png',
            'White': 'caps/cap2.png',
            'Red': 'caps/cap3.png',
            
        },
        description: 'Our eco-friendly caps are made from organic cotton and recycled materials, offering a stylish and sustainable accessory. Perfect for sun protection and adding a fashionable touch to your outfit while promoting environmental consciousness.',
        sizes: ['Black', 'White' , 'Red']
    },

    { 
        id: 17, 
        name: 'Re-usable Water Bottle', 
        price: 2.00, 
        images: {
          'default': 'rec2/WaterBottle.png'
        },
        description: 'Eco-friendly reusable water bottle',
        sizes: ['default']
      }

    
];

// Cart initialization
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cart functions
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function addToCart(product, quantity = 1, size = 'Default') {
    const selectedImage = document.querySelector('.thumbnail.active')?.src || product.images[Object.keys(product.images)[0]];
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: size,
        image: selectedImage
    };
    
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id && item.size === cartItem.size);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function changeQuantity(index, delta) {
    if (cart[index].quantity + delta > 0) {
        cart[index].quantity += delta;
    }
    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// Render functions
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';
    const table = document.createElement('table');

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button class="decrease-qty" onclick="changeQuantity(${index}, -1)">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="increase-qty" onclick="changeQuantity(${index}, 1)">+</button>
            </td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item" onclick="removeItemFromCart(${index})">Remove</button></td>
        `;
        table.appendChild(row);
    });

    cartItemsContainer.appendChild(table);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

function updateProductDetails(product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-description').textContent = product.description || '';
    
    const totalElement = document.getElementById('total');
    totalElement.textContent = product.price.toFixed(2);
    totalElement.dataset.basePrice = product.price.toFixed(2);
    
    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.getElementById('thumbnails');
    const sizeButtonsContainer = document.querySelector('.size-buttons');
    
    if (thumbnailsContainer && sizeButtonsContainer) {
        thumbnailsContainer.innerHTML = '';
        sizeButtonsContainer.innerHTML = '';
        
        let isFirst = true;
        Object.entries(product.images).forEach(([size, img], index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img;
            thumbnail.alt = product.name;
            thumbnail.classList.add('thumbnail');
            if (isFirst) {
                thumbnail.classList.add('active');
                mainImage.src = img;
                isFirst = false;
            }
            
            const button = document.createElement('button');
            button.textContent = product.sizes[index];
            button.classList.add('size-button');
            if (index === 0) button.classList.add('active');
            
            thumbnail.addEventListener('click', () => {
                mainImage.src = img;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnail.classList.add('active');
                
                document.querySelectorAll('.size-button').forEach(b => b.classList.remove('active'));
                sizeButtonsContainer.children[index].classList.add('active');
                
                updatePriceForSize(product.sizes[index]);
            });
            
            button.addEventListener('click', () => {
                document.querySelectorAll('.size-button').forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumbnailsContainer.children[index].classList.add('active');
                
                mainImage.src = img;
                updatePriceForSize(product.sizes[index]);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
            sizeButtonsContainer.appendChild(button);
        });
    }

    const qtyInput = document.getElementById('qty');
    if (qtyInput) {
        qtyInput.value = 1;
    }
  
    updateTotal();
}


// Utility functions
function getCurrentProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    return products.find(p => p.id == productId);
}

function getSelectedSize() {
    const activeButton = document.querySelector('.size-button.active');
    return activeButton ? activeButton.textContent : 'Default';
}

function updatePriceForSize(size) {
    const product = getCurrentProduct();
    const basePrice = product.price;
    let newPrice = basePrice;

    const sizeIndex = product.sizes.indexOf(size);
    
    if (sizeIndex !== -1) {
        const multipliers = [1, 1.2, 1.5];
        newPrice *= multipliers[sizeIndex] || 1;
    }

    const totalElement = document.getElementById('total');
    totalElement.textContent = newPrice.toFixed(2);
    totalElement.dataset.basePrice = newPrice.toFixed(2);

    updateTotal();
}

function updateTotal() {
    const basePrice = parseFloat(document.getElementById('total').dataset.basePrice);
    const quantity = parseInt(document.getElementById('qty').value);
    const total = basePrice * quantity;
    document.getElementById('total').textContent = total.toFixed(2);
}

function displayCheckoutSummary() {
    const summaryItems = document.getElementById('summary-items');
    const summaryTotal = document.getElementById('summary-total');
    let total = 0;
  
    summaryItems.innerHTML = '';
    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <p>${item.name} - ${item.size} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
      `;
      summaryItems.appendChild(itemElement);
      total += item.price * item.quantity;
    });
  
    summaryTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  
    const shippingForm = document.getElementById('shipping-form');
    shippingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Order placed successfully!');
      cart = [];
      localStorage.removeItem('cart');
      updateCartCount();
      window.location.href = 'index.html';
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (window.location.pathname.includes('cart.html')) {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        renderCart();

        const continueShoppingBtn = document.getElementById('continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }
    } else if (window.location.pathname.includes('product.html')) {
        const productId = new URLSearchParams(window.location.search).get('id');
        if (productId) {
            const product = products.find(p => p.id == productId);
            if (product) {
                updateProductDetails(product);
            }
        }

        const qtyInput = document.getElementById('qty');
        const decreaseQtyBtn = document.getElementById('decrease-qty');
        const increaseQtyBtn = document.getElementById('increase-qty');

        if (decreaseQtyBtn && increaseQtyBtn && qtyInput) {
            decreaseQtyBtn.addEventListener('click', () => {
                if (parseInt(qtyInput.value) > 1) {
                    qtyInput.value = parseInt(qtyInput.value) - 1;
                    updateTotal();
                }
            });

            increaseQtyBtn.addEventListener('click', () => {
                qtyInput.value = parseInt(qtyInput.value) + 1;
                updateTotal();
            });

            qtyInput.addEventListener('change', updateTotal);
        }

        const buyNowBtn = document.getElementById('buy-now');
        const addToCartBtn = document.getElementById('add-to-cart');

        if (buyNowBtn && addToCartBtn) {
            buyNowBtn.addEventListener('click', () => {
                const product = getCurrentProduct();
                const quantity = parseInt(document.getElementById('qty').value);
                const size = getSelectedSize();
                addToCart(product, quantity, size);
                window.location.href = 'cart.html';
            });

            addToCartBtn.addEventListener('click', () => {
                const product = getCurrentProduct();
                const quantity = parseInt(document.getElementById('qty').value);
                const size = getSelectedSize();
                addToCart(product, quantity, size);
                
                const confirmationMessage = document.createElement('div');
                confirmationMessage.textContent = 'Item added to cart!';
                confirmationMessage.className = 'confirmation-message';
                document.body.appendChild(confirmationMessage);
                
                setTimeout(() => {
                    confirmationMessage.remove();
                }, 2000);
            });
        }
    } else if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const productLinks = document.querySelectorAll('.product-link');
        productLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.target.closest('.product').dataset.id;
                window.location.href = `product.html?id=${productId}`;
            });
        });

        document.querySelectorAll('.buy-now').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.id;
                const product = products.find(p => p.id == productId);
                if (product) {
                    addToCart(product);
                    window.location.href = 'cart.html';
                }
            });
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.closest('.product').dataset.id;
                const product = products.find(p => p.id == productId);
                if (product) {
                    addToCart(product);
                    
                    const confirmationMessage = document.createElement('div');
                    confirmationMessage.textContent = 'Item added to cart!';
                    confirmationMessage.className = 'confirmation-message';
                    document.body.appendChild(confirmationMessage);
                    
                    setTimeout(() => {
                        confirmationMessage.remove();
                    }, 2000);
                }
            });
        });

        const waterBottleButton = document.getElementById('buy-now-water-bottle');
        if (waterBottleButton) {
            waterBottleButton.addEventListener('click', () => {
                const product = products.find(p => p.id === 17);
                if (product) {
                    addToCart(product);
                    window.location.href = 'cart.html';
                }
            });
        }
    }

    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutSummary();
    }

    const checkoutButton = document.getElementById('proceed-to-checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if(cart.length == 0){
                alert("Cart is Empty");
                window.location.href = 'index.html';
            }else{
                window.location.href = 'checkout.html';
            }
        });
    }

    // Star rating functionality
    document.querySelectorAll('.rating').forEach(ratingContainer => {
        const stars = ratingContainer.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('selected');
                    } else {
                        s.classList.remove('selected');
                    }
                });
            });
        });
    });
});

// Buy-now button
document.addEventListener('DOMContentLoaded', () => {
    const buynowbtn = document.querySelector('.my-button1');
    if (buynowbtn) {
        buynowbtn.addEventListener('click', () => {
            window.location.href = 'product.html?id=1';
        });
    }
});

// Scroll event for sticky header
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("stickey", window.scrollY > 0);
});