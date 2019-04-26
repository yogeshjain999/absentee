class Api::AttendancesController < BaseController
  def create
    Attendance::Create.new(params[:roll_nos], params[:standard_id], params[:date]).call
    render_success(data: {}, message: I18n.t('attendance.created'), status: :created)
  end
end