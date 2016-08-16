require 'faker'

User.delete_all
Todo.delete_all
Brainjuice.delete_all

2.times do
  User.create(name: Faker::Name.name, email: Faker::Internet.email, password: "123")
end

times = [5, 15, 30, 60]
20.times do
  Todo.create(name: Faker::Hipster.sentence(word_count = 4), time_est: times.sample, completed: false, user_id: 1+ rand(2), brainjuice_id: 1 + rand(3))
end

Brainjuice.create(name: "High", user_id: 1)
Brainjuice.create(name: "Medium", user_id: 1)
Brainjuice.create(name: "Low", user_id: 1)

Brainjuice.create(name: "High", user_id: 2)
Brainjuice.create(name: "Medium", user_id: 2)
Brainjuice.create(name: "Low", user_id: 2)
