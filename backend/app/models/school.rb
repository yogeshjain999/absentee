class School < ApplicationRecord
  has_many :students, class_name: "Student"
  has_many :standards, class_name: "Standard"
  has_many :staffs, class_name: 'Staff'
end
