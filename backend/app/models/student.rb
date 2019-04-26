class Student < ApplicationRecord
  translates :name
  globalize_accessors :locales => [:en, :'mr-IN'], :attributes => [:name]
end
