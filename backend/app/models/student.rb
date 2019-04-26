class Student < ApplicationRecord
  translates :name
  globalize_accessors :locales => [:en, :'mr-IN'], :attributes => [:name]
  has_many :attendances, class_name: "Attendance"
end
