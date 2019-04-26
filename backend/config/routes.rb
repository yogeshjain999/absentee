Rails.application.routes.draw do
  root "dashboard#index"

  devise_for :staffs, controllers: {
    sessions: 'sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json }do
    resources :standards, only: [:index]
    resources :attendances, only: [:create]

    namespace :staffs do
      post   'sign_in'  => 'sessions#create'
      delete 'sign_out' => 'sessions#destroy'
    end
  end
end
