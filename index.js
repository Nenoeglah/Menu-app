
// Fetch menu items from the server
fetch('http://localhost:3000/menuItems')
  .then(response => response.json())
  .then(data => {
    const itemContainer = document.querySelector('.item-container');
    const basketIcon = document.querySelector('.basket-icon');
    const cartContainer = document.getElementById('form-container');
    let cartItems = [];

    // Loop through the menu items and create elements dynamically
    data.forEach(item => {
      const newItem = document.createElement('div');
      newItem.classList.add('item');

      const itemImg = document.createElement('div');
      itemImg.classList.add('item-img');
      const img = document.createElement('img');
      // img.src = item.image;
      // itemImg.appendChild(img);
      // newItem.appendChild(itemImg);

      const itemDescription = document.createElement('div');
      itemDescription.classList.add('item-description');
      const itemName = document.createElement('h2');
      itemName.textContent = item.name;
      const itemPrice = document.createElement('h2');
      itemPrice.classList.add('price');
      itemPrice.textContent = item.price;
      const button = document.createElement('button');
      button.textContent = 'Add To Cart';
      button.addEventListener('click', () => {
        addToCart(item);
      });
      itemDescription.appendChild(itemName);
      itemDescription.appendChild(itemPrice);
      itemDescription.appendChild(button);
      newItem.appendChild(itemDescription);

      itemContainer.appendChild(newItem);
    });

    // Add event listener to the submit button
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', () => {
      // Get the search input value
      const searchInput = document.getElementById('search-input').value.trim().toLowerCase();

      // Find the matching item
      const matchedItem = data.find(item => item.name.toLowerCase() === searchInput);

      // Clear the item container
      itemContainer.innerHTML = '';

      // Check if the item is found
      if (matchedItem) {
        data.forEach(item => {
          const newItem = document.createElement('div');
          newItem.classList.add('item');

          const itemImg = document.createElement('div');
          itemImg.classList.add('item-img');
          const img = document.createElement('img');
          img.src = item.image;
          itemImg.appendChild(img);
          newItem.appendChild(itemImg);

          const itemDescription = document.createElement('div');
          itemDescription.classList.add('item-description');
          const itemName = document.createElement('h2');
          itemName.textContent = item.name;
          const itemPrice = document.createElement('h2');
          itemPrice.classList.add('price');
          itemPrice.textContent = item.price;
          const button = document.createElement('button');
          button.textContent = 'Add To Cart';
          button.addEventListener('click', () => {
            addToCart(item);
          });
          itemDescription.appendChild(itemName);
          itemDescription.appendChild(itemPrice);
          itemDescription.appendChild(button);
          newItem.appendChild(itemDescription);

          itemContainer.appendChild(newItem);

          if (item.name.toLowerCase() === searchInput) {
            newItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newItem.classList.add('highlight');
          }
        });
      } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Item not found';
        itemContainer.appendChild(errorMessage);
      }

      // Clear the search input
      document.getElementById('search-input').value = '';
    });

    // Function to add an item to the cart
    const addToCart = item => {
      cartItems.push(item);
      updateCartIcon();
    };

    // Function to update the cart icon with the number of items
    const updateCartIcon = () => {
      basketIcon.dataset.count = cartItems.length;
    };

    // Event listener for the place order button
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', () => {
      
      // Generate HTML for the ordered items and person's details
      let orderHTML = '';
      orderHTML += '<h3>Ordered Items:</h3>';
      if (cartItems.length > 0) {
        orderHTML += '<ul>';
        cartItems.forEach(item => {
          orderHTML += '<li>' + item.name + ' - ' + item.price + '</li>';
        });
        orderHTML += '</ul>';
      } else {
        orderHTML += '<p>No items in the cart</p>';
      }

      orderHTML += '<h3>Total Price:</h3>';
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
      orderHTML += '<p>' + totalPrice + '</p>';

      orderHTML += '<h3>Person\'s Details:</h3>';
      orderHTML += '<p>Name: ' + document.getElementById('name').value + '</p>';
      orderHTML += '<p>Contact: ' + document.getElementById('contact').value + '</p>';
      orderHTML += '<p>Email: ' + document.getElementById('email').value + '</p>';
      orderHTML += '<p>Address: ' + document.getElementById('address').value + '</p>';

      // Display the ordered items and person's details
      cartContainer.innerHTML = orderHTML;

      // Clear the cart and update the UI accordingly
      cartItems = [];
      updateCartIcon();
    });
  })
  .catch(error => {
    console.error('Error fetching menu items:', error);
  });





