class StaffsController < ApplicationController
  def index
    @pagy, @records = pagy(Staff.all)
  end
end
