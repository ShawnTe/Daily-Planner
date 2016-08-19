
  def bj_id(bj_word)
    bj_required = (bj_word)
    case bj_required
    when "High"
      bj_id = 1
    when "Medium"
      bj_id = 2
    when "Low"
      bj_id = 3
    end
  end

  def bj_name
    bj_given = @todo.brainjuice_id
    case bj_given
    when 1
      bj_name = "High"
    when 2
      bj_name = "Medium"
    when 3
      bj_name = "Low"
    end
  end

