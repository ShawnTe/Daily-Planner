source 'https://rubygems.org'

# PostgreSQL driver
gem 'pg'

# Sinatra driver
gem 'sinatra'
gem 'sinatra-contrib'

gem 'activesupport', '~>4.2.0'
gem 'activerecord', '~>4.2.0'

# gem 'google-api-client', '~> 0.9', require: 'google/apis/calendar_v3'
gem 'google_calendar'
gem 'google-api-client', :require => 'google/api_client'
# gem 'omniauth-google-oauth2', :git => 'https://github.com/zquestz/omniauth-google-oauth2.git'



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
