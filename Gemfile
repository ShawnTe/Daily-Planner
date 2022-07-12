source 'https://rubygems.org'

# PostgreSQL driver
gem 'pg'

# Sinatra driver
gem 'sinatra'
gem 'sinatra-contrib'

gem 'activesupport', '~>7.0.3'
gem 'activerecord', '~>7.0.3'

gem 'rake'

gem 'shotgun'
gem 'dotenv'


group :test do
  gem 'shoulda-matchers'
  gem 'rack-test'
  gem 'rspec', '~>3.0'
  gem 'capybara'
end

group :test, :development do
  gem 'factory_girl'
  gem 'faker', github: 'stympy/faker'
end
