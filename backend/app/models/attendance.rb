class Attendance < ApplicationRecord

  belongs_to :student, class_name: "Student", foreign_key:"student_id"
  belongs_to :standard, class_name: "Standard", foreign_key:"standard_id"
end