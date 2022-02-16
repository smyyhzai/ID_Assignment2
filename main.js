(function(){
    // Add to Cart Interaction - by CodyHouse.co
    var cart = document.getElementsByClassName('js-cd-cart');
    if(cart.length > 0) {
        var cartAddBtns = document.getElementsByClassName('js-cd-add-to-cart'),
            cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
            cartList = cartBody.getElementsByTagName('ul')[0],
            cartListItems = cartList.getElementsByClassName('cd-cart__product'),
            cartTotal = cart[0].getElementsByClassName('cd-cart__checkout')[0].getElementsByTagName('span')[0],
            cartCount = cart[0].getElementsByClassName('cd-cart__count')[0],
            cartCountItems = cartCount.getElementsByTagName('li'),
            cartUndo = cart[0].getElementsByClassName('cd-cart__undo')[0],
            productId = document.getElementById('productId'), //this is a placeholder -> use your real product ids instead
            cartTimeoutId = false,
            animatingQuantity = false;
          initCartEvents();
  
  
          function initCartEvents() {
              // add products to cart
              for(var i = 0; i < cartAddBtns.length; i++) {(function(i){
                  cartAddBtns[i].addEventListener('click', addToCart);
              })(i);}
  
              // open/close cart
              cart[0].getElementsByClassName('cd-cart__trigger')[0].addEventListener('click', function(event){
                  event.preventDefault();
                  toggleCart();
              });
              
              cart[0].addEventListener('click', function(event) {
                  if(event.target == cart[0]) { // close cart when clicking on bg layer
                      toggleCart(true);
                  } else if (event.target.closest('.cd-cart__delete-item')) { // remove product from cart
                      event.preventDefault();
                      removeProduct(event.target.closest('.cd-cart__product'));
                  }
              });
  
              // update product quantity inside cart
              cart[0].addEventListener('change', function(event) {
                  if(event.target.tagName.toLowerCase() == 'select') quickUpdateCart();
              });
  
              //reinsert product deleted from the cart
              cartUndo.addEventListener('click', function(event) {
                  if(event.target.tagName.toLowerCase() == 'a') {
                      event.preventDefault();
                      if(cartTimeoutId) clearInterval(cartTimeoutId);
                      // reinsert deleted product
                      var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted')[0];
                      Util.addClass(deletedProduct, 'cd-cart__product--undo');
                      deletedProduct.addEventListener('animationend', function cb(){
                          deletedProduct.removeEventListener('animationend', cb);
                          Util.removeClass(deletedProduct, 'cd-cart__product--deleted cd-cart__product--undo');
                          deletedProduct.removeAttribute('style');
                          quickUpdateCart();
                      });
                      Util.removeClass(cartUndo, 'cd-cart__undo--visible');
                  }
              });
          };
  
          function addToCart(event) {
              event.preventDefault();
              if(animatingQuantity) return;
              var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
              //update cart product list
              addProduct(this);
              //update number of items 
              updateCartCount(cartIsEmpty);
              //update total price
              updateCartTotal(this.getAttribute('data-price'), true);
              //show cart
              Util.removeClass(cart[0], 'cd-cart--empty');
          };
  
          function toggleCart(bool) { // toggle cart visibility
              var cartIsOpen = ( typeof bool === 'undefined' ) ? Util.hasClass(cart[0], 'cd-cart--open') : bool;
          
              if( cartIsOpen ) {
                  Util.removeClass(cart[0], 'cd-cart--open');
                  //reset undo
                  if(cartTimeoutId) clearInterval(cartTimeoutId);
                  Util.removeClass(cartUndo, 'cd-cart__undo--visible');
                  removePreviousProduct(); // if a product was deleted, remove it definitively from the cart
  
                  setTimeout(function(){
                      cartBody.scrollTop = 0;
                      //check if cart empty to hide it
                      if( Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], 'cd-cart--empty');
                  }, 500);
              } else {
                  Util.addClass(cart[0], 'cd-cart--open');
              }
          };

          //pic = document.getElementById("prodimg").value = document.getElementById("prodimg").innerHTML
          //pic = document.getElementsByClassId("cd-cart__image").value = document.getElementById("prodimg").innerHTML;

          //price = document.getElementById('price');
          //prodname = document.getElementById('productname');
          //pic = document.getElementById('prodimg');

          function addProduct(target) {
			// this is just a product placeholder
			// you should insert an item with the selected product info
			// replace productId, productName, price and url with your real product info
			// you should also check if the product was already in the cart -> if it is, just update the quantity
			productId = productId + 1;
			var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0"><img src="product-preview.png" alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">Product Name sweater 1</a></h3><span class="cd-cart__price">$10.00</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';

            //var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0"><img src="images/Screenshot 2022-02-07 120040.jpg"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">Product Name</a></h3><span class="cd-cart__price">$25.99</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ 1 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ 1 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
            //var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0"><img src="images/Screenshot 2022-02-07 120055.jpg"</a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">Product Name</a></h3><span class="cd-cart__price">$25.99</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ 2 +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ 2 +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';

			//var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0">'+ pic +'</a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">'+ prodname +'</a></h3><span class="cd-cart__price">'+ price +'</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
			cartList.insertAdjacentHTML('beforeend', productAdded);
		};
  
          function removeProduct(product) {
              if(cartTimeoutId) clearInterval(cartTimeoutId);
              removePreviousProduct(); // prduct previously deleted -> definitively remove it from the cart
              
              var topPosition = product.offsetTop,
                  productQuantity = Number(product.getElementsByTagName('select')[0].value),
                  productTotPrice = Number((product.getElementsByClassName('cd-cart__price')[0].innerText).replace('$', '')) * productQuantity;
  
              product.style.top = topPosition+'px';
              Util.addClass(product, 'cd-cart__product--deleted');
  
              //update items count + total price
              updateCartTotal(productTotPrice, false);
              updateCartCount(true, -productQuantity);
              Util.addClass(cartUndo, 'cd-cart__undo--visible');
  
              //wait 8sec before completely remove the item
              cartTimeoutId = setTimeout(function(){
                  Util.removeClass(cartUndo, 'cd-cart__undo--visible');
                  removePreviousProduct();
              }, 8000);
          };
  
          function removePreviousProduct() { // definitively removed a product from the cart (undo not possible anymore)
              var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
              if(deletedProduct.length > 0 ) deletedProduct[0].remove();
          };
  
          function updateCartCount(emptyCart, quantity) {
              if( typeof quantity === 'undefined' ) {
                  var actual = Number(cartCountItems[0].innerText) + 1;
                  var next = actual + 1;
                  
                  if( emptyCart ) {
                      cartCountItems[0].innerText = actual;
                      cartCountItems[1].innerText = next;
                      animatingQuantity = false;
                  } else {
                      Util.addClass(cartCount, 'cd-cart__count--update');
  
                      setTimeout(function() {
                          cartCountItems[0].innerText = actual;
                      }, 150);
  
                      setTimeout(function() {
                          Util.removeClass(cartCount, 'cd-cart__count--update');
                      }, 200);
  
                      setTimeout(function() {
                          cartCountItems[1].innerText = next;
                          animatingQuantity = false;
                      }, 230);
                  }
              } else {
                  var actual = Number(cartCountItems[0].innerText) + quantity;
                  var next = actual + 1;
                  
                  cartCountItems[0].innerText = actual;
                  cartCountItems[1].innerText = next;
                  animatingQuantity = false;
              }
          };
  
          function updateCartTotal(price, bool) {
              cartTotal.innerText = bool ? (Number(cartTotal.innerText) + Number(price)).toFixed(2) : (Number(cartTotal.innerText) - Number(price)).toFixed(2);
          };
  
          function quickUpdateCart() {
              var quantity = 0;
              var price = 0;
  
              for(var i = 0; i < cartListItems.length; i++) {
                  if( !Util.hasClass(cartListItems[i], 'cd-cart__product--deleted') ) {
                      var singleQuantity = Number(cartListItems[i].getElementsByTagName('select')[0].value);
                      quantity = quantity + singleQuantity;
                      price = price + singleQuantity*Number((cartListItems[i].getElementsByClassName('cd-cart__price')[0].innerText).replace('$', ''));
                  }
              }
  
              cartTotal.innerText = price.toFixed(2);
              cartCountItems[0].innerText = quantity;
              cartCountItems[1].innerText = quantity+1;
          };
    }
  })();


//search bar
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  
  //filter types of clothes
  filterSelection("all")
  function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("card");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
  }
  
  function AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
  }
  
  function RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);     
      }
    }
    element.className = arr1.join(" ");
  }
  
  // Add active class to the current button (highlight it)
  var btnContainer = document.getElementById("myBtnContainer");
  var btns = btnContainer.getElementsByClassName("btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(){
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
  