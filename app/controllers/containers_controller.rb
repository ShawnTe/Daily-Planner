require 'date'

get '/containers' do
  p Date.today
  p month_calendar
  redirect "/containers/#{Date.today}"
end

get '/containers/:date' do |d|
  @date = Date.parse d
  erb :'/containers/index'
end

