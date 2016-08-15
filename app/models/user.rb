class User < ActiveRecord::Base
  has_many :todos
  has_many :brainjuices
  # has_and_belongs_to_many :brainjuices

end
