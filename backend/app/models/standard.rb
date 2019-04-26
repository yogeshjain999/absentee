# == Schema Information
#
# Table name: standards
#
#  id         :bigint(8)        not null, primary key
#  standard   :string
#  section    :string
#  start_time :time
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  school_id  :bigint(8)
#

class Standard < ApplicationRecord
  has_many :attandances, class_name: "Attandance"
  has_many :students, class_name: 'Student'
  belongs_to :school, class_name: "School", foreign_key: "school_id"
end
