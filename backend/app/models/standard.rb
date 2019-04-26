class Standard < ApplicationRecord
  has_many :attandances, class_name: "Attandance"
enS