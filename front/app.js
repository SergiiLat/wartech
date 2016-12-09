$(document).ready(function(){

var token = $.cookie("token")
var basket;

  if (token) {
    $('#userInfo').removeClass('hidden')
    $('.starter-template').removeClass('hidden')
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
        $('.navbar').removeClass('hidden')
        $('.starter-template').removeClass('hidden')
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

      $('.starter-template').addClass('hidden')

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
              + '<div class="col-md-5 product-name ">'+product.name+'</div>'
              + '<div class="col-md-5 product-price ">'+product.price+'</div>'
              + '<div class="col-md-2"><button class="product-buy btn btn-success" product_id="'+product.id+'">Add to cart</button></div>'
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
            return '<div class="basket-product row" id="basket-product-' + basketItem.item_id + '">'
              + '<div class="col-md-4  basket-product-name">'+basketItem.name+'</div>'
              + '<div class="col-md-5 basket-product-price">'+basketItem.price+'</div>'
              + '<div class="col-md-3 "><button class="product-remove btn btn-danger" basket_id="'+basketItem.id+'">Remove</button></div>'
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
