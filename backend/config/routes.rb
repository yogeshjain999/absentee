Rails.application.routes.draw do
  devise_for :staffs, controllers: {
    sessions: 'sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json }do
    resources :attendances, only: [:create]

    namespace :staffs do
      post   'sign_in'  => 'sessions#create'
      delete 'sign_out' => 'sessions#destroy'
    end
  end
end
