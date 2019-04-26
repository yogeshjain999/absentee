class Standard < ApplicationRecord
  has_many :attandances, class_name: "Attandance"
  has_many :students, class_name: 'Student'
  belongs_to :school, class_name: "School", foreign_key: "school_id"
end