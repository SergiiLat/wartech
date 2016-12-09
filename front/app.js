$(document).ready(function(){

var token = $.cookie("token")
var basket;

  if (token) {
    $('#userInfo').removeClass('hidden')
    $('#login').addClass('hidden');

  }else{
    $('.navbar').addClass('hidden');
  }
  
  $('#btnLogin').click(function(e){

    e.preventDefault()

    var email = $('#email').val();
    var password = $('#password').val();

    $.post('/login',{email: email, password: password},function(data){
      if (!data.token)
      {
        console.log('error')
        alert('Bad login or password')
      }
      else
      {
        $('#userInfo').removeClass('hidden')
        $('#login').addClass('hidden');
        $('#email').val("");
        $('#password').val("");
        $.cookie("token",data.token)
        token = data.token;
        getItems();
      }
    })
  });

  $('#btnLogout').click(function(){
    $.get('/logout',function(data){
      $.removeCookie('token');
      $('#products').html("");
      $('#userInfo').addClass('hidden')
      $('.navbar').addClass('hidden')
      $('#login').removeClass('hidden');
      $('#userToken').text("");
      $('#userName').text("");
    })
  });




  $('body').on('click',".product-buy", function(e) {
    $.ajax({
      type: 'POST',
      data: {
        productId: $(this).attr('product_id')//$('.product-buy').parents('.product').attr('id').replace('product-', ''),
      },
      url: '/addToBasket',
      success: function (msg) {
        console.log(msg)
        getBasket();
      }})

  })

  $('body').on('click',".product-remove", function(e) {
    $.ajax({
      type: 'POST',
      data: {
        productId: $(this).attr('basket_id')
      },
      url: '/removeFromBasket',
      success: function (msg) {
        console.log(msg)
        getBasket();
      }})

  })


  var getItems = function(){
    $.ajax({
      type:"GET",
      beforeSend: function (request)
      {
        request.setRequestHeader("Authorization", token);
      },
      url: "/allItems",
      success: function(products) {
        $('#products').html(
          products.map(function(product) {
            return '<div class="product row" id="product-' + product.id + '">'
              + '<div class="product-name col-md-5">'+product.name+'</div>'
              + '<div class="product-price col-md-5">'+product.price+'</div>'
              + '<button class="product-buy btn btn-default col-md-2">Add to cart</button>'
              + '</div>'
          }).join('\n')
        )
      }
    });
  }

  var getBasket = function(){
    if (token)
    {
      $.get('/showBasket',function(response){
        console.log(response);
        if (!response.error)
        {
          $('#basketItems').html(
          response.data.map(function(basketItem) {
            return '<div class="basket-product" id="basket-product-' + basketItem.item_id + '">'
              + '<span class="basket-product-name">'+basketItem.name+'</span>'
              + '<span class="basket-product-price">'+basketItem.price+'</span>'
              + '<button class="product-remove" basket_id="'+basketItem.id+'">Remove</button>'
              + '</div>'
          }).join('\n')
          );

        }

      })
    }
  }




  getItems();
  getBasket();


});
