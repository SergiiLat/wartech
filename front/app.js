$(document).ready(function(){

var token = $.cookie("token")

  if (token) {
    $('#userInfo').removeClass('hidden')
    $('#login').addClass('hidden');
  }

  $('#btnLogin').click(function(){

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
      $('#login').removeClass('hidden');
      $('#userToken').text("");
      $('#userName').text("");
    })
  });

  $('body').on('click',".product-buy", function(e) {
      $.ajax({
      type: 'POST',
      data: {
        productId: $('.product-buy').parents('.product').attr('id').replace('product-', ''),
      },
      url: '/addToBasket',
      success: function (msg) {
        console.log(msg)
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
            return '<div class="product" id="product-' + product.id + '">'
              + '<span class="product-name">'+product.name+'</span>'
              + '<span class="product-price">'+product.price+'</span>'
              + '<button class="product-buy">Add to cart</button>'
              + '</div>'
          }).join('\n')
        )
      }
    });
  }

  getItems();



});
