class StudentsController < ApplicationController
  def index
    @standards = Standard.all
    @pagy, @records = pagy(Student.all)
  end
end
