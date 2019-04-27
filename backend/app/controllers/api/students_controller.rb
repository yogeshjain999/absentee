class Api::StudentsController < BaseController
  def index
    school_id  = Standard.find(params[:standard_id]).school_id
    students  = Student.where(standard_id: params[:standard_id], school_id: school_id)
    render_success(data: students.as_json(only: [:roll_no, :name, :gender]), status: 200)
  end
end