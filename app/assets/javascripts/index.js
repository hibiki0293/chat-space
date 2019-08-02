$(function(){
  function buildHTML(user){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">
    ${user.name}
    </p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name= ${user.name} >追加</div>
  </div>`
  return html
  }




  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length > 0)  {
        users.forEach(function(user){
          var html = buildHTML(user)
          $('#user-search-result').append(html);
        });
      }
    })
    .fail(function(){
      alert('失敗しました');
      })

  })

  $(document).on("click", ".user-search-add" , function(){
    $(this).parent().remove();
    var user_id = $(this).data("user-id");
    var name = $(this).data("user-name");
    

    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value= ${user_id}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
    $("#chat-group-users").append(html);
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
})