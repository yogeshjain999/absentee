class Staff < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable
  belongs_to :school, class_name: "School", foreign_key: "school_id"

  validates :mobile_number, uniqueness: true
end
