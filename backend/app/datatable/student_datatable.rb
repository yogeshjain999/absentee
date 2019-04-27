class StudentDatatable
  delegate :params, :current_user, to: :@view

  def initialize(view)
    @view = view
    @students = Student.all
    @total_count = @students.count
  end

  def as_json(options = {})
    {
      sEcho:                params[:sEcho].to_i,
      aaData:               data,
      iTotalRecords:        @total_count,
      iTotalDisplayRecords: @total_count
    }
  end

  private

  def data
    arr = []
    @students.map do |student|
      arr <<  [
        student.registration_no,
        student.roll_no,
        student.name,
        student.guardian_name,
        student.guardian_mobile_no
      ]
    end
    arr
  end
end
