

  def bj_id
    bj_required = params[:todo]["brainjuice_id"]
    case bj_required
    when "High"
      bj_id = 1
    when "Medium"
      bj_id = 2
    when "low"
      bj_id = 3
    end
  end

