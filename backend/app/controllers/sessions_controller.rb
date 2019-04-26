class SessionsController < Devise::SessionsController
  layout 'login'

  before_action :configure_sign_in_params, only: [:create]

  private

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:mobile_number, :password])
  end
end
