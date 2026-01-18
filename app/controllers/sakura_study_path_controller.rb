class SakuraStudyPathController < ApplicationController
  def index
  end

  def result
    answers = params[:answers] || {}

    scores = Hash.new(0)
    answers.each_value do |a|
      type  = a[:type]
      score = a[:score].to_i
      scores[type] += score
    end

    labels = {
      "v_photo" => "視覚優位｜写真（カメラアイ）タイプ",
      "v_3d"    => "視覚優位｜三次元映像タイプ",
      "l_movie" => "言語優位｜言語映像タイプ",
      "l_abs"   => "言語優位｜言語抽象タイプ",
      "a_words" => "聴覚優位｜聴覚言語タイプ",
      "a_sound" => "聴覚優位｜聴覚＆音タイプ"
    }

    sorted = scores.sort_by { |_, v| -v }
    top_key, top_score = sorted.first

    @scores  = sorted.map { |k, v| { key: k, label: labels[k], score: v } }
    @top     = { key: top_key, label: labels[top_key], score: top_score }
  end
end
