class Standard < ApplicationRecord
  has_many :attandances, class_name: "Attandance"
  belongs_to :school, class_name: "School", foreign_key: "school_id"
enS