// AOS Init
AOS.init({
    once: true
});

// Mobile menu toggle
if (document.getElementById("menu-toggle")) {
    document.getElementById("menu-toggle").addEventListener("click", function () {
        document.getElementById("nav-links").classList.toggle("active");
    });
}

// Partner logos slider
const partnerSwiper = new Swiper('.partners-swiper', {
    loop: true,
    loopedSlides: 12,
    slidesPerView: 'auto',
    spaceBetween: 0,
    allowTouchMove: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    speed: 6000,
});

// Review slider
const reviewSwiper = new Swiper('.review-swiper', {
    loop: true,
    loopedSlides: 3,
    slidesPerView: 1,
    spaceBetween: 20,
    allowTouchMove: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    speed: 6000,

    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 15,
        }
    }
});

// Video Overlay
const videoDiv = document.getElementById('videoDiv');
if (videoDiv) {
    const videoOverlay = document.getElementById('videoOverlay');
    const overlayContent = document.getElementById('overlayContent');

    // Ketika video div diklik, tampilkan overlay merah
    videoDiv.addEventListener('click', function () {
        videoOverlay.classList.add('active');
    });

    // Ketika overlay merah diklik, sembunyikan overlay
    videoOverlay.addEventListener('click', function () {
        videoOverlay.classList.remove('active');
    });

    overlayContent.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Mencegah event bubbling agar overlay tidak langsung hilang
    videoDiv.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// Video Overlay Review
const videoDivReview = document.getElementById('videoDivReview');
if (videoDivReview) {
    const videoOverlayReview = document.getElementById('videoOverlayReview');
    const overlayContentReview = document.getElementById('overlayContentReview');

    // Ketika video div diklik, tampilkan overlay merah
    videoDivReview.addEventListener('click', function () {
        videoOverlayReview.classList.add('active');
    });

    // Ketika overlay merah diklik, sembunyikan overlay
    videoOverlayReview.addEventListener('click', function () {
        videoOverlayReview.classList.remove('active');
    });

    overlayContentReview.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Mencegah event bubbling agar overlay tidak langsung hilang
    videoDiv.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}

// To Top
const toTopButton = document.querySelector('.to-top');

// Fungsi untuk menangani event scroll
function handleScroll() {
    if (!toTopButton) {
        return;
    }
    if (window.scrollY > 0) {
        toTopButton.style.right = '12px';
        toTopButton.style.transform = 'rotate(00deg)';
    } else {
        toTopButton.style.right = '-60px';
        toTopButton.style.transform = 'rotate(90deg)';
    }
}

// Tambahkan event listener untuk scroll
window.addEventListener('scroll', handleScroll);

if (toTopButton) {
    toTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Product Detail
const triggers = document.querySelectorAll(".tab-trigger");
const contents = document.querySelectorAll(".tab-content");

if (triggers && contents) {
    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            // reset
            triggers.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // activate
            trigger.classList.add("active");
            document.getElementById(trigger.dataset.tab).classList.add("active");
        });
    });
}

// Plan Selection Interactive Script
document.addEventListener('DOMContentLoaded', function () {
    const plans = document.querySelectorAll('.plan');
    const selectedPlanInput = document.getElementById('selectedPlan');

    // Function to select a plan
    function selectPlan(selectedPlan) {
        // Remove selection from all plans
        plans.forEach(plan => {
            plan.setAttribute('aria-selected', 'false');
            plan.classList.remove('selected', 'just-selected');
        });

        // Add selection to clicked plan
        selectedPlan.setAttribute('aria-selected', 'true');
        selectedPlan.classList.add('selected', 'just-selected');

        // Remove animation class after animation completes
        setTimeout(() => {
            selectedPlan.classList.remove('just-selected');
        }, 300);

        // Update hidden input value
        const planName = selectedPlan.getAttribute('data-name');
        if (selectedPlanInput) {
            selectedPlanInput.value = planName;
        }

        // Optional: Trigger custom event for integration
        document.dispatchEvent(new CustomEvent('planSelected', {
            detail: {
                name: planName,
                price: selectedPlan.getAttribute('data-price'),
                period: selectedPlan.getAttribute('data-period')
            }
        }));
    }

    // Add click event listeners to all plans
    plans.forEach(plan => {
        plan.addEventListener('click', function () {
            selectPlan(this);
        });

        // Add keyboard support (Enter and Space)
        plan.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPlan(this);
            }
        });
    });
});

// Optional: Function to programmatically select a plan
function selectPlanByName(planName) {
    const plan = document.querySelector(`[data-name="${planName}"]`);
    if (plan) {
        plan.click();
    }
}

// Optional: Function to get currently selected plan
function getSelectedPlan() {
    const selectedPlan = document.querySelector('.plan[aria-selected="true"]');
    if (selectedPlan) {
        return {
            name: selectedPlan.getAttribute('data-name'),
            price: selectedPlan.getAttribute('data-price'),
            period: selectedPlan.getAttribute('data-period')
        };
    }
    return null;
}

// Dropdown navbar
const authToggle = document.getElementById('auth-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

if (authToggle && dropdownMenu) {
    authToggle.addEventListener('click', function (e) {
        e.stopPropagation();

        // Toggle dropdown
        dropdownMenu.classList.toggle('show');
        authToggle.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!authToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('show');
            authToggle.classList.remove('active');
        }
    });

    // Prevent dropdown from closing when clicking inside it
    dropdownMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
}


// FancyBox
Fancybox.bind("[data-fancybox]", {
    animated: true,
    Thumbs: false
});

// Selection Display
document.addEventListener("DOMContentLoaded", function () {
    const plans = document.querySelectorAll(".plan");
    const hiddenInput = document.getElementById("selectedPlan");

    const selName = document.getElementById("selName");
    const selPrice = document.getElementById("selPrice");
    const selectionDisplay = document.getElementById("selectionDisplay");

    // Fungsi untuk update pilihan
    function updateSelection(plan) {
        // Reset semua plan
        plans.forEach(p => {
            p.setAttribute("aria-selected", "false");
            p.removeAttribute("data-selected");
            p.classList.remove("active");
        });

        // Tandai yang aktif
        plan.setAttribute("aria-selected", "true");
        plan.setAttribute("data-selected", "true");
        plan.classList.add("active");

        // Update hidden input
        hiddenInput.value = plan.dataset.name;

        // Update tampilan
        selName.textContent = plan.dataset.name;
        selPrice.textContent = `$${plan.dataset.price}`;

        // Opsional: kalau mau ada animasi highlight
        selectionDisplay.classList.add("highlight");
        setTimeout(() => selectionDisplay.classList.remove("highlight"), 600);
    }

    // Pasang event listener untuk semua plan
    plans.forEach(plan => {
        plan.addEventListener("click", () => updateSelection(plan));
        plan.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                updateSelection(plan);
            }
        });
    });
});

// Function to show sweet alert
function showAlert(type = 'success', title = 'Success!', message = 'The product has been added to your shopping cart.') {
    const overlay = document.getElementById('alertOverlay');
    const container = document.getElementById('alertContainer');
    const icon = document.getElementById('alertIcon');
    const alertTitle = document.querySelector('.alert-title');
    const alertMessage = document.querySelector('.alert-message');
    const cartBtn = document.querySelector('.add-to-cart');

    // Update alert content
    alertTitle.textContent = title;
    alertMessage.textContent = message;

    // Update icon based on type
    const iconElement = icon.querySelector('i');
    if (type === 'success') {
        icon.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
        iconElement.className = 'bx bx-check';
    } else if (type === 'warning') {
        icon.style.background = 'linear-gradient(45deg, #ff9800, #f57c00)';
        iconElement.className = 'bx bx-error-circle';
    } else if (type === 'error') {
        icon.style.background = 'linear-gradient(45deg, #f44336, #d32f2f)';
        iconElement.className = 'bx bx-x';
    }

    // Add bounce effect to cart button (only if exists)
    if (cartBtn) {
        cartBtn.classList.add('bounce');
        setTimeout(() => cartBtn.classList.remove('bounce'), 600);
    }

    // Show overlay
    overlay.style.visibility = 'visible';

    // Animate overlay fade in
    gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
    });

    // Animate container scale in with bounce
    gsap.fromTo(container,
        {
            scale: 0.5,
            rotation: -10
        },
        {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)"
        }
    );

    // Animate icon
    gsap.fromTo(icon,
        {
            scale: 0,
            rotation: -180
        },
        {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "elastic.out(1, 0.5)"
        }
    );

    // Show checkmark after icon animation (only for success)
    if (type === 'success') {
        setTimeout(() => {
            icon.classList.add('show-checkmark');
        }, 600);
    }

    // Animate title and message
    gsap.fromTo(".alert-title, .alert-message",
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.4,
            stagger: 0.1,
            ease: "power2.out"
        }
    );

    // Animate buttons
    gsap.fromTo(".alert-btn",
        {
            y: 20,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }
    );
}

function closeAlert() {
    const overlay = document.getElementById('alertOverlay');
    const container = document.getElementById('alertContainer');

    // Animate out
    gsap.to(container, {
        scale: 0.8,
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
    });

    gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
            overlay.style.visibility = 'hidden';
            // Reset for next time
            gsap.set(container, { scale: 0.5, y: 0, opacity: 1 });
            document.getElementById('alertIcon').classList.remove('show-checkmark');
        }
    });
}

function goToCart() {
    closeAlert();
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 400);
}

function goToDashboard() {
    closeAlert();
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 400);
}

// Function to add product to cart (localStorage) - MODIFIED
function addToCart() {
    // Get product data
    const productName = "Antivirus Safezone";
    const imageUrl = "assets/detail-product/dashboard-main.jpg";

    // Get selected plan data
    const selectedPlan = document.querySelector('.plan[aria-selected="true"]');
    if (!selectedPlan) {
        showAlert('warning', 'Warning!', 'Please choose a package before proceeding.');
        return;
    }

    const selectedPackage = selectedPlan.getAttribute('data-name');
    const price = selectedPlan.getAttribute('data-price');

    // Create product object
    const productData = {
        id: Date.now(), // Simple ID generator using timestamp
        imageUrl: imageUrl,
        productName: productName,
        selectedPackage: selectedPackage,
        price: parseFloat(price),
        quantity: 1,
        dateAdded: new Date().toISOString()
    };

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if same product with same package already exists
    const existingProductIndex = cart.findIndex(item =>
        item.productName === productName &&
        item.selectedPackage === selectedPackage
    );

    if (existingProductIndex !== -1) {
        // If exists, show warning alert
        showAlert('warning', 'Product Already Exists!', 'This product is already in your shopping cart.');
    } else {
        // If not exists, add new product
        cart.push(productData);
        showAlert('success', 'Success!', 'The product has been added to your shopping cart.');
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Optional: Update cart count display
    updateCartCount();
}

// Function to update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Update cart count in UI (if you have a cart counter element)
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Function to get cart data
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Function to remove item from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Function to clear entire cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    showAlert('success', 'Keranjang Dibersihkan!', 'Semua produk telah dihapus dari keranjang.');
}

// Function to update quantity
function updateQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (newQuantity <= 0) {
            // Remove item if quantity is 0 or negative
            cart.splice(productIndex, 1);
        } else {
            cart[productIndex].quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

// Add event listener to "Add to Cart" button
document.addEventListener('DOMContentLoaded', function () {
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }

    // Initialize cart count on page load
    updateCartCount();

    // Add event listeners for alert overlay
    const overlay = document.getElementById('alertOverlay');
    if (overlay) {
        // Close alert when clicking overlay
        overlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeAlert();
            }
        });
    }

    // Close alert with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAlert();
        }
    });
});

// FAQ
// Mendapatkan semua elemen FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        const isActive = question.classList.contains('active');

        // Tutup semua FAQ yang terbuka
        faqItems.forEach(otherItem => {
            const otherQuestion = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');

            otherQuestion.classList.remove('active');
            otherAnswer.classList.remove('active');
        });

        // Jika FAQ yang diklik belum aktif, buka
        if (!isActive) {
            question.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Event listener untuk keyboard accessibility
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// History Page
const mockPurchases = [
    {
        id: "1",
        orderNumber: "ORD-2024-001",
        date: "2024-01-15",
        products: [
            { name: "Safezone Total Protection", type: "Antivirus", price: 89.99, duration: "1 Year" },
            { name: "VPN Premium", type: "VPN Service", price: 49.99, duration: "1 Year" },
        ],
        status: "active",
        total: 139.98,
        downloadUrl: "/downloads/safezone",
    },
    {
        id: "2",
        orderNumber: "ORD-2023-089",
        date: "2023-12-10",
        products: [{ name: "Norton 360 Deluxe", type: "Security Suite", price: 99.99, duration: "1 Year" }],
        status: "expired",
        total: 99.99,
    },
    {
        id: "3",
        orderNumber: "ORD-2024-002",
        date: "2024-01-20",
        products: [{ name: "Kaspersky Internet Security", type: "Antivirus", price: 79.99, duration: "2 Years" }],
        status: "processing",
        total: 79.99,
    },
];

let selectedTab = 'all';

// Helper functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getStatusClass(status) {
    const classes = {
        'active': 'status-active',
        'completed': 'status-completed',
        'processing': 'status-processing',
        'expired': 'status-expired'
    };
    return classes[status] || 'status-expired';
}

// Fungsi utama untuk mendapatkan ikon Boxicons berdasarkan status
function getStatusIconBoxicons(status) {
    const icons = {
        'active': 'bx-check-circle',
        'completed': 'bx-check-circle',
        'processing': 'bx-time',
        'expired': 'bx-x-circle'
    };
    return icons[status] || 'bx-package';
}

function createProductHTML(product) {
    return `
        <div class="product-item">
            <div class="product-info">
                <div class="product-icon">
                    <i class="bx bx-shield icon icon-primary"></i>
                </div>
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <p class="product-meta">${product.type} • ${product.duration}</p>
                </div>
            </div>
            <div class="product-price">$${product.price}</div>
        </div>
    `;
}

function createPurchaseCardHTML(purchase) {
    const productsHTML = purchase.products.map(createProductHTML).join('');
    const downloadButton = purchase.downloadUrl ?
        `<button class="action-button">
            <i class="bx bx-download icon"></i>
            Download
        </button>` : '';

    return `
        <div data-aos="fade-up" class="purchase-card">
            <div class="card-header">
                <div class="card-header-content">
                    <div class="order-info">
                        <h3>Order #${purchase.orderNumber}</h3>
                        <p class="order-date">Purchased on ${formatDate(purchase.date)}</p>
                    </div>
                    <div class="status-badge ${getStatusClass(purchase.status)}">
                        <i class="bx ${getStatusIconBoxicons(purchase.status)} icon"></i>
                        <span style="margin-left: 8px; text-transform: capitalize;">
                            ${purchase.status}
                        </span>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <div class="products-list">
                    ${productsHTML}
                </div>
                <div class="card-footer">
                    <div class="total-price">
                        Total: <span class="total-amount">$${purchase.total}</span>
                    </div>
                    <div class="action-buttons">
                        <button class="action-button">
                            <i class="bx bx-show icon"></i>
                            View Details
                        </button>
                        ${downloadButton}
                        <button class="action-button">
                            <i class="bx bx-receipt icon"></i>
                            Invoice
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderPurchases() {
    const purchaseList = document.getElementById('purchaseList');
    if (purchaseList) {
        const emptyState = document.getElementById('emptyState');
        const emptyStateMessage = document.getElementById('emptyStateMessage');

        const filteredPurchases = mockPurchases.filter(purchase => {
            if (selectedTab === 'all') return true;
            return purchase.status === selectedTab;
        });

        if (filteredPurchases.length === 0) {
            purchaseList.style.display = 'none';
            emptyState.style.display = 'block';

            if (selectedTab === 'all') {
                emptyStateMessage.textContent = "You haven't made any purchases yet.";
            } else {
                emptyStateMessage.textContent = `No ${selectedTab} orders found.`;
            }
        } else {
            purchaseList.style.display = 'block';
            emptyState.style.display = 'none';
            purchaseList.innerHTML = filteredPurchases.map(createPurchaseCardHTML).join('');
        }
    }
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(tab => tab.classList.remove('active'));
            button.classList.add('active');
            selectedTab = button.getAttribute('data-tab');
            renderPurchases();
        });
    });
}

function init() {
    setupTabs();
    renderPurchases();
}

document.addEventListener('DOMContentLoaded', init);

// Cart functionality
let cartItems = [];
let discountPercent = 0;
const TAX_RATE = 0.11; // 11%

// Function to get cart data from localStorage
function getCartFromStorage() {
    try {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
        console.error('Error parsing cart data from localStorage:', error);
        return [];
    }
}

// Function to save cart data to localStorage
function saveCartToStorage(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart data to localStorage:', error);
    }
}

// Function to get product icon based on product name
function getProductIcon(productName) {
    const icons = {
        'Antivirus Safezone': 'bx-bug',
        'Password Manager': 'bx-key',
        'VPN Service': 'bx-lock-alt',
        'Email Security': 'bx-envelope'
    };
    return icons[productName] || 'bx-shield';
}

// Function to get product category based on product name
function getProductCategory(productName) {
    const categories = {
        'Antivirus Safezone': 'Software & Tools',
        'Password Manager': 'Security Hardware',
        'VPN Service': 'Security Services',
        'Email Security': 'Software & Tools'
    };
    return categories[productName] || 'Security Services';
}

// Function to render cart items
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');

    if (cartItemsList) {
        const cartHTML = cartItems.map((item, index) => {
            const icon = getProductIcon(item.productName);
            const category = getProductCategory(item.productName);

            return `
                    <div class="content" data-item-id="${item.id}">
                        <div class="cover">
                            <i class="bx ${icon} icon"></i>
                            <div>
                                <h3>${item.productName}</h3>
                                <p>${item.selectedPackage}</p>
                                <p class="category">${category}</p>
                            </div>
                        </div>
                        <h3>$${item.price.toFixed(2)}</h3>
                        <button class="btn-remove" onclick="removeItem(${item.id})">
                            <i class="bx bx-x"></i>
                        </button>
                    </div>
                `;
        }).join('');

        cartItemsList.innerHTML = cartHTML;
    }
}

// Function to calculate totals
function calculateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * (discountPercent / 100);
    const discountedSubtotal = subtotal - discountAmount;
    const tax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + tax;

    // Update UI
    if (document.getElementById('subtotal')) {
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('discount').textContent = `-$${discountAmount.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
}

// Function to remove item from cart
function removeItem(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    saveCartToStorage(cartItems);
    renderCartItems();
    calculateTotals();
}

// Function to apply promo code
function applyPromoCode() {
    const promoCode = document.getElementById('promo-code').value.trim().toUpperCase();
    const promoCodes = {
        'SAVE10': 10,
        'SAVE20': 20,
        'WELCOME': 15,
        'STUDENT': 25
    };

    if (promoCodes[promoCode]) {
        discountPercent = promoCodes[promoCode];
        alert(`Promo code applied! You saved ${discountPercent}%`);
        calculateTotals();
    } else if (promoCode === '') {
        alert('Please enter a promo code');
    } else {
        alert('Invalid promo code');
    }
}

// Function to handle checkout
function handleCheckout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    cartItems = [];
    saveCartToStorage(cartItems);
    renderCartItems();
    calculateTotals();
    showAlert('success', 'Success!', 'Success to Checkout!');
}

// Function to load cart on page load
function loadCart() {
    cartItems = getCartFromStorage();
    renderCartItems();
    calculateTotals();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    loadCart();

    // Promo code functionality
    if (document.getElementById('apply-promo')) {
        document.getElementById('apply-promo').addEventListener('click', applyPromoCode);
        document.getElementById('promo-code').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                applyPromoCode();
            }
        });
        // Checkout functionality
        document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
    }
});