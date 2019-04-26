# == Schema Information
#
# Table name: students
#
#  id                           :bigint(8)        not null, primary key
#  registration_no              :string
#  roll_no                      :integer
#  gender                       :string
#  dob                          :datetime
#  guardian_name                :string
#  guardian_mobile_no           :string
#  guardian_alternate_mobile_no :string
#  created_at                   :datetime         not null
#  updated_at                   :datetime         not null
#  address                      :string
#  school_id                    :bigint(8)
#

class Student < ApplicationRecord
  translates :name
  globalize_accessors :locales => [:en, :'mr-IN'], :attributes => [:name]
  has_many :attendances, class_name: "Attendance"
  belongs_to :school, class_name: "School", foreign_key: "school_id"
end
