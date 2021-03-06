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
  todo.brainjuice_id = bj_id(params[:brainjuice_id])
  todo.time_est = params[:time_est].to_i
  if todo.save
    if request.xhr?
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
  p @bj_name
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
  if params[:completed] == "true"
    todo.update_attribute(:completed, 't')
  end
  brainjuice = bj_id(params[:brainjuice_id])
  todo.update(name: params[:name], notes: params[:notes], time_est: params[:time_est], brainjuice_id: brainjuice)
  if todo.save
    if request.xhr?
      todo.to_json
    else
      redirect "/todos"
    end
  else
    @errors = todo.errors.full_messages
  end
end

# Delete todos
delete '/todos/:id' do
  p "In the delete action"
  @todo = Todo.delete(params[:id])
  redirect '/todos'
end
