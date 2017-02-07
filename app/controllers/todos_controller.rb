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
  todo.time_est = params[:time_est].to_i
  p todo.notes
  p todo.name
  p params[:todo]
  if todo.save
    if request.xhr?
      p "in the new todo save and xhr"
      # p todo
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
  todo = Todo.find(params[:id])
  if todo
    if request.xhr?
      todo.to_json
    else
      erb :show
    end
  else
    redirect '/todos'
  end
end

# Form to edit todo
get '/todos/:id/edit' do
  p 'in the edit todo controller'
  @todo = Todo.find(params["id"])
  p @todo.id
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
p "in the Todo put Controller"
  todo.name = params[:name]
  todo.notes = params[:notes]
  todo.time_est = params[:time_est]
  p todo.time_est = params[:time_est]

  todo.brainjuice_id = bj_id(params[:brainjuice_id])
  if params[:completed]
    todo.update(completed: true)
  end

  if todo.save
    if request.xhr?
      p 'in the saved put controller xhr section'
      p todo
      todo.to_json
    else
      redirect "/todos"
    end
  else
  end
end



# Delete todos
delete '/todos/:id' do
  p "In the delete action"
  @todo = Todo.delete(params[:id])
  redirect '/todos'
end
