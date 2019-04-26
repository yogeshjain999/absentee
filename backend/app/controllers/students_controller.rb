class StudentsController < ApplicationController
  def index
    @pagy, @records = pagy(Student.all)
  end
end
