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
  p params
  todo = Todo.new(params[:todo])
  todo.brainjuice_id = bj_id(params[:brainjuice_id])
  if todo.save
    if request.xhr?
      p "in the new todo save and xhr"
      todo.to_json
    else
      redirect '/todos'
    end
  else
    @errors = todo.errors.full_messages
    redirect '/todos'
  end
end



# Show specific todos
get '/todos/:id' do
  @todo = Todo.find(params[:id])
  if @todo
    if request.xhr?
      @todo.to_json
    else
      erb :show
    end
  else
    redirect '/todos'
  end
end

# Form to edit todo
get '/todos/:id/edit' do
  @todo = Todo.find(params["id"])
  @bj_name = bj_name
  if request.xhr?
    response = erb :'/todos/_edit', layout: false, locals: {task: @todo, brainjuice_name: @bj_name}
    response.to_json
  else
    erb :'/todos/edit'
  end
end

# Update a todo
put '/todos/:id' do
  todo = Todo.find(params[:id])

  todo.name = params[:name]
  todo.notes = params[:notes]
  todo.time_est = params[:time_est]
  todo.brainjuice_id = bj_id(params[:brainjuice_id])
  if params[:completed]
    todo.update(completed: true)
  end

  if todo.save
    if request.xhr?
      todo.to_json
    else
      redirect "/todos"
    end
  else
  end
end



# Delete todos
delete '/todos/:id' do
  redirect '/todos'
end

