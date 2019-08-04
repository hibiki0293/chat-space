class Api::MessagesController < ApplicationController
  before_action :set_group
  def index
    @messages = @group.messages.includes(:user)
   
    respond_to do |format|
      format.html 
      format.json { @newmessages = @messages.where('id > ?', params[:id])}
    end
  end

  private

  def set_group
    @group = Group.find(params[:group_id])
  end

end