json.array! @newmessages do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at.strftime("%Y-%m-%d %H:%M")
  json.user message.user
  json.hoge message.id
end