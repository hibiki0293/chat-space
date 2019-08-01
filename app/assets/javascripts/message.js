$(function() {
  
  function buildHTML(message){
    var html = `
      <div class="rightside__comments_user">
      <div class="rightside__comments_user-name">
        ${message.user.name} 
        </div>
      <div class="rightside__comments_user-date">
        ${message.created_at}
        </div>
      <div class="rightside__comments_text">
        ${message.content}
        <img src="${message.image.url}" class="lower-message__image" onerror="this.style.display='none'"/>  
        </div>  
      </div>
    </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log(url);
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
    $('.rightside__form_input').val('')
    $('.rightside__comments').animate({scrollTop: $('.rightside__comments')[0].scrollHeight})
    })
  .fail(function(){
    alert('error');
    })
  .always(function(data){
    $('.rightside__form_send').prop('disabled', false);
    })

  })

});