$(function() {
  
  function buildHTML(message){
    var Addimage = (message.image.url !== null)? `<img src="${message.image.url}" class="lower-message__image">`:''
    var html = `
      <div class="rightside__comments_user" data-id = "${message.id}">
      <div class="rightside__comments_user-name">
        ${message.user.name} 
        </div>
      <div class="rightside__comments_user-date">
        ${message.created_at}
        </div>
      <div class="rightside__comments_text">
        ${message.content}
        ${Addimage}
        </div>  
      </div>
    </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  
    .done(function(data){
      var html = buildHTML(data);
      $('.rightside__comments').append(html)
      $('#new_message')[0].reset()
      $('.rightside__comments').animate({scrollTop: $('.rightside__comments')[0].scrollHeight})
    })
    .fail(function(){
      alert('error');
      })
    .always(function(data){
      $('.rightside__form_send').prop('disabled', false);
    })

  })


  var reloadMessages = function() {
    console.log("aaaa")
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id =  $(".rightside__comments_user:last").data('id');
    group_id = $(".rightside__group").data('id');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: `/groups/${group_id}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message)
        $('.rightside__comments').append(insertHTML)
        $('.rightside__comments').animate({scrollTop: $('.rightside__comments')[0].scrollHeight}, "fasts")
      });

    })
    .fail(function() {
      console.log('error');
    });
  };
  group_id = $(".rightside__group").data('id');
  if(location.pathname == `/groups/${group_id}/messages`){
  setInterval(reloadMessages, 5000);
  }
});