json.array! @newmessages do |message|
  json.content message.content
  json.image message.image
  json.created_at message.created_at
  json.user message.user
  json.id message.id
end