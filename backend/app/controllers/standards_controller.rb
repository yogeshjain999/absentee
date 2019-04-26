class StandardsController < ApplicationController
  def index
    @pagy, @records = pagy(Standard.all)
  end
end
