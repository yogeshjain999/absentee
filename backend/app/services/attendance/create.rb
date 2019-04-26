# Responsible for importing item master vessel tags
class Attendance::Create

  def initialize(roll_nos, standard_id, date)
    @standard_id = standard_id
    @roll_nos = roll_nos
    @date = date
  end

  def call
    student_ids = Student.where(roll_no: @roll_nos, standard_id: @standard_id).pluck(:id)
    students_attendance_taken_ids = Attendance.where(date: @date, standard_id: @standard_id).pluck(:student_id)
    student_ids = student_ids - students_attendance_taken_ids
    standard = Standard.find @standard_id
    school_id = standard.school_id
    attendances = []
    student_ids.each do |student_id|
      attendances << Attendance.new(present: false,
                                    date: @date,
                                    school_id: school_id,
                                    standard_id: @standard_id,
                                    student_id: student_id )
    end
    imported_data = Attendance.import attendances
    imported_data.ids.present? ? imported_data.ids : []
  end
end
