(function(window, document, undefined) {

    var token = '529743973.41811e0.8c9bd524a4bb41cc8b89620f8db71288',
    // username = 'snip_art', // rudrastyh - my username :)
    userid = 529743973,
    // hashtag = 'snipart',
    num_photos = 16;
                                                     
  // $.ajax({ // the first ajax request returns the ID of user rudrastyh
  //   url: 'https://api.instagram.com/v1/users/search',
  //   dataType: 'jsonp',
  //   type: 'GET',
  //   data: {access_token: token, q: username}, // actually it is just the search by username
  //   success: function(data){
  //     console.log(data);
  //     $.ajax({
  //       url: 'https://api.instagram.com/v1/users/' + data.data[0].id + '/media/recent', // specify the ID of the first found user
  //       dataType: 'jsonp',
  //       type: 'GET',
  //       data: {access_token: token, count: num_photos},
  //       success: function(data2){
  //         console.log(data2);
  //         for(x in data2.data){
  //           $('ul').append('<li><img src="'+data2.data[x].images.low_resolution.url+'"></li>');  
  //         }
  //           },
  //       error: function(data2){
  //         console.log(data2);
  //       }
  //     });
  //   },
  //   error: function(data){
  //     console.log(data);
  //   }
  // });     

  

  var noHash = new RegExp('#([^\\s]*)','g');

  $.ajax({
    // url: 'https://api.instagram.com/v1/tags/' + username + '/media/recent',
    url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
    // url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: token, count: num_photos},
    success: function(data){
      // console.log(data);
      var x = 0;
      $(".content").each(function() {

       $(this).append($('<div>', {class: 'bg'}));
        var big = $(this).children('.bg');

        $(big).css('background-image', 'url(' + data.data[x].images.standard_resolution.url + ')');

        // console.log(data.data[x].caption.text);
        // Getting Image TAG, parsing and creating node
        var text = data.data[x].caption.text;
        var postText = text.replace(noHash, '');
        var tidbit = document.createElement('h3');
        txTidbit = document.createTextNode(postText);
        tidbit.appendChild(txTidbit);
        // Getting Image LIKES and creating node
        var liked = data.data[x].likes.count;
        var hearts = document.createElement('h2');
        txt = document.createTextNode('❤ ' + liked.toString());
        hearts.appendChild(txt);
        // Getting Image LINK and creating link
        var imgLink = data.data[x].link;
        var toLink = $('<a>',{
          // text: 'view on instagram',
          target: '_blank',
          class: 'button',
          href: imgLink,
        });

        toLink.append(hearts);


        // console.log("-- " + postText);
        var child = $(this).children('.caption');
        // child.append(postText);
        // console.log("likes " + liked.toString());
        // $(this).append('❤ ' + liked.toString());
        // var imageLikes = '❤ ' + liked.toString();

        // child.append(hearts);
        child.append(toLink);
        child.append(tidbit);
  
      
      // child.append(' ❤ ' + liked.toString());

        x++;
      });

    },
    error: function(data){
      // console.log(data);
      console.log("problem");
    }
  });

  $('.bioDes').fadeOut();

  $('.aboutClicker p').hover(function(){
    $('.bioDes').fadeToggle( "slow", "swing" );

  })    


})(this, this.document);
