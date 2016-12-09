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
      }
    })
  });

  $('#btnLogout').click(function(){
    $.get('/logout',function(data){
      $('#userInfo').addClass('hidden')
      $('#login').removeClass('hidden');
      
      $('#userToken').text("");
      $('#userName').text("");
    })
  });
  
  $('.product-buy').click(function() {
      $.ajax({
        type: 'POST',
        data: {
          productId: $(this).parents('.product').attr('id').replace('product-'),
          token: token
        },
        url: '/addToBasket',
        success: function (msg) {
          console.log(msg)
        }})
  })

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
            + '<div class="product-name">'+product.name+'</div>'
            + '<div class="product-price">'+product.price+'</div>'
            + '<button class="product-buy">'
            + '</div>'
        }).join('\n')
      )
    }
  });


});
