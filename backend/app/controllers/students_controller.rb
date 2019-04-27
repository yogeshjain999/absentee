class StudentsController < ApplicationController
  def index
    @standards = Standard.all
    @pagy, @records = pagy(Student.all)
    respond_to do |format|
      format.html
      format.json { render json: StudentDatatable.new(view_context) }
    end
  end
end
