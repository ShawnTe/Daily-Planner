class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :name
      t.string :notes
      t.integer :time_est
      t.boolean :completed, default: false
      t.integer :user_id
      t.integer :brainjuice_id

      t.timestamps null: false
    end
  end
end
