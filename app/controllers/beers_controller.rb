class BeersController < ApplicationController
  before_action :set_beer, only: %i[ show edit update destroy ]

  # GET /beers or /beers.json
  def index
  
  end

end
