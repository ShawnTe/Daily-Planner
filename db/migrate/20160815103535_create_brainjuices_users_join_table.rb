class CreateBrainjuicesUsersJoinTable < ActiveRecord::Migration
  def change
     create_table :brainjuices_users, id: false do |t|
      t.belongs_to :user, index: true
      t.belongs_to :brainjuice, index: true
    end
  end
end
