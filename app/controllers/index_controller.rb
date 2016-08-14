get '/' do
  # calendars
  erb :index
end

get '/grid' do
  erb :grid
end


# def redirect
#   client = Signet::OAuth2::Client.new({
#     client_id: ENV.fetch('GOOGLE_API_CLIENT_ID'),
#     client_secret: ENV.fetch('GOOGLE_API_CLIENT_SECRET'),
#     authorization_uri: 'https://accounts.google.com/o/oauth2/auth',
#     scope: Google::Apis::CalendarV3::AUTH_CALENDAR_READONLY,
#     redirect_uri: url_for(:action => :callback)
#   })

#   redirect_to client.authorization_uri.to_s
# end

# def calendars
#   client = Signet::OAuth2::Client.new(access_token: session[:access_token])

#   service = Google::Apis::CalendarV3::CalendarService.new

#   service.authorization = client

#   @calendar_list = service.list_calendar_lists
# end

# ==========

# require 'google/apis/drive_v2'
# require 'google/api_client/client_secrets'

# client_secrets = Google::APIClient::ClientSecrets.load
# auth_client = client_secrets.to_authorization
# auth_client.update!(
#   :scope => 'https://www.googleapis.com/auth/drive.metadata.readonly',
#   :redirect_uri => 'http://www.example.com/oauth2callback'
# )



# /// testing example below

# require 'rubygems'
# require 'google_calendar'


# # Create an instance of the calendar.

# cal = Google::Calendar.new(:client_id     => '739264926242-diu9kf45da7oer2mbef1g1q0iipu4k7u.apps.googleusercontent.com', 
#                            :client_secret => 'GOmOJC6CgFIoIMxw14o1nB5ly',
#                            :calendar      => 'qlgg01d50c4ie5n5iufk642ap4@group.calendar.google.com',
#                            :redirect_url  => "http://localhost:9393/oauth2callback", # this is what Google uses for 'applications'
#                            :access_type => 'offline',
#                            :approval_prompt => 'force'
#                            )

# puts "Do you already have a refresh token? (y/n)"
# has_token = $stdin.gets.chomp

# if has_token.downcase != 'y'

#   # A user needs to approve access in order to work with their calendars.
#   puts "Visit the following web page in your browser and approve access."
#   puts cal.authorize_url
#   puts "\nCopy the code that Google returned and paste it here:"

#   # Pass the ONE TIME USE access code here to login and get a refresh token that you can use for access from now on.
#   refresh_token = cal.login_with_auth_code( $stdin.gets.chomp )

#   puts "\nMake sure you SAVE YOUR REFRESH TOKEN so you don't have to prompt the user to approve access again."
#   puts "your refresh token is:\n\t#{refresh_token}\n"
#   puts "Press return to continue"
#   $stdin.gets.chomp

# else

#   puts "Enter your refresh token"
#   refresh_token = $stdin.gets.chomp
#   cal.login_with_refresh_token(refresh_token)

#   # Note: You can also pass your refresh_token to the constructor and it will login at that time.

# end

# event = cal.create_event do |e|
#   e.title = 'A Cool Event'
#   e.start_time = Time.now
#   e.end_time = Time.now + (60 * 60) # seconds * min
# end

# puts event

# event = cal.find_or_create_event_by_id(event.id) do |e|
#   e.title = 'An Updated Cool Event'
#   e.end_time = Time.now + (60 * 60 * 2) # seconds * min * hours
# end

# puts event

# # All events
# puts cal.events

# # Query events
# puts cal.find_events('your search string')