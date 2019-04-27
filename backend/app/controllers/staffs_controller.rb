class StaffsController < ApplicationController
  def index
    respond_to do |format|
      format.html {  }
      format.json { render json: StaffDatatable.new(view_context)}
    end
    @pagy, @records = pagy(Staff.all)
  end
end
