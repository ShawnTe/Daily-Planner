class Brainjuice < ActiveRecord::Base
  belongs_to :user
  has_many :todos
end
