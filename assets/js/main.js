

const dropdown = document.getElementById('filterDropdown');
const arrowIcon = dropdown.querySelector('.arrow-icon');

dropdown.addEventListener('click', () => {
  arrowIcon.classList.toggle('rotate');
});


  // Fetch products from the API
        async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const products = await response.json();
                displayProducts(products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        function displayProducts(products) {
            const productRow1 = document.getElementById('product-row');
            const productRow2 = document.getElementById('product-row-2');
            productRow1.innerHTML = '';
            productRow2.innerHTML = '';

            const firstRowProducts = products.slice(0, 3);
            const secondRowProducts = products.slice(3, 6);

            function createProductCard(product) {
                return `
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="product-card p-3 bg-light text-center h-100">
                            <div class="d-flex justify-content-start">
                                <button class="btn btn-light btn-sm add-cart-btn">
                                    <i class="fas fa-cart-plus"></i> Add to Cart
                                </button>
                            </div>
                            <img src="${product.image}" 
                                 alt="${product.title}" 
                                 class="product-img img-fluid my-2">
                        </div>
                        <div class="mt-2 d-flex justify-content-between align-items-center">
                            <div>
                                <div class="product-name">${product.title.substring(0, 20)}...</div>
                                <div class="product-desc text-muted small">${product.category}</div>
                            </div>
                            <span class="btn-cell btn-sm">€${product.price.toFixed(2)}</span>
                        </div>
                    </div>
                `;
            }

            firstRowProducts.forEach(product => {
                productRow1.innerHTML += createProductCard(product);
            });

            secondRowProducts.forEach(product => {
                productRow2.innerHTML += createProductCard(product);
            });
        }

    

        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', async (e) => {
                e.preventDefault();
                const filterType = e.target.getAttribute('data-filter');
                try {
                    const response = await fetch('https://fakestoreapi.com/products');
                    let products = await response.json();

                    if (filterType === 'title') {
                        products.sort((a, b) => a.title.localeCompare(b.title));
                    } else if (filterType === 'price') {
                        products.sort((a, b) => a.price - b.price);
                    } else if (filterType === 'category') {
                        products.sort((a, b) => a.category.localeCompare(b.category));
                    }

                    displayProducts(products);
                } catch (error) {
                    console.error('Error filtering products:', error);
                }
            });
        });

        document.querySelector('.my-search').addEventListener('input', async (e) => {
            const searchTerm = e.target.value.toLowerCase();
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                let products = await response.json();
                products = products.filter(product => 
                    product.title.toLowerCase().includes(searchTerm) || 
                    product.category.toLowerCase().includes(searchTerm)
                );
                displayProducts(products);
            } catch (error) {
                console.error('Error searching products:', error);
            }
        });

        fetchProducts();


 const categoryDropdownBtn = document.getElementById('mobileCategoryDropdown');
  const categoryIcon = document.getElementById('mobileCategoryIcon');

  categoryDropdownBtn.addEventListener('show.bs.dropdown', function () {
    categoryIcon.classList.remove('fa-chevron-down');
    categoryIcon.classList.add('fa-chevron-up');
  });

  categoryDropdownBtn.addEventListener('hide.bs.dropdown', function () {
    categoryIcon.classList.remove('fa-chevron-up');
    categoryIcon.classList.add('fa-chevron-down');
  });

    const toggler = document.getElementById('menuToggler');
  const offcanvas = document.getElementById('offcanvasMenu');

  offcanvas.addEventListener('show.bs.offcanvas', () => {
    toggler.innerHTML = '<i class="fas fa-times"></i>'; 
  });

  offcanvas.addEventListener('hidden.bs.offcanvas', () => {
    toggler.innerHTML = '<i class="fas fa-bars"></i>'; 
  });