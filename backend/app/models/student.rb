class Student < ApplicationRecord
  translates :name
  globalize_accessors :locales => [:en, :'mr-IN'], :attributes => [:name]
  has_many :attendances, class_name: "Attendance"
  belongs_to :standard, class_name: "Standard", foreign_key: "standard_id"
  belongs_to :school, class_name: "School", foreign_key: "school_id"
end
