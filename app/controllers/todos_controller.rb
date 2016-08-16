# Show all todos
get '/todos' do
  @todos = Todo.all
  erb :'/index'
end

# Form to create new todo
get '/todos/new' do
  erb :'/todos/new'
end

# Create new todos
post '/todos' do
  todo = Todo.new(params[:todo])
  todo.brainjuice_id = bj_id
  if todo.save
    if request.xhr?
      p todo
      p "*" * 50
      todo.to_json
    else
      redirect '/todos'
    end
  else
    @errors = todo.errors.full_messages
    redirect '/todos'
  end
    # erb :'/todos/new'
end

# Show specific todos
get '/todos/:id' do
  erb :'/todos/show'
end

# Form to edit todo
get '/todos/:id/edit' do
  erb :'/todos/edit'
end

# Update a todo
put '/todos/:id' do
  redirect '/todos'
end

# Delete todos
delete '/todos/:id' do
  redirect '/todos'
end

