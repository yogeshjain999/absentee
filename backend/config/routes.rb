Rails.application.routes.draw do
  root "dashboard#index"

  devise_for :staffs, controllers: {
    sessions: 'sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
