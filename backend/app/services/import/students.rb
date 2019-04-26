# Responsible for importing item master vessel tags
class Import::Students
  include ActiveModel::Validations
  attr_reader :result, :file_path

  def initialize(file_path)
    @file_path = file_path
  end

  def call
    process_file &&
      prepare_data &&
      import_records
  end

  private

  def process_file
    @data = SmarterCSV.process(file_path, options)
    if SmarterCSV.errors.present?
      errors.add(:base, SmarterCSV.errors)
      return false
    end
    true
  end

  def prepare_data
    @student_data = @data.collect do |data|
      Student.new(data)
    end
  end

  def import_records
    result = Student.bulk_import!(@student_data, recursive: true)
    @result = { records_added: result.ids.count }
  end

  def options
    {
      header_transformations: [key_mapping: key_mapping],
      header_validations: [required_headers: required_headers],
      hash_validations: [required_fields: required_fields]
    }
  end

  def required_headers
    [:registration_no, :roll_no, :name_en,
      :gender, :dob, :address, :guardian_name, :guardian_mobile_no,
      :guardian_alternate_mobile_no]
  end

  def required_fields
    [:registration_no, :roll_no, :name_en, :name_mr_in,
      :gender, :dob, :address, :guardian_name, :guardian_mobile_no,
      :guardian_alternate_mobile_no]
  end

  def key_mapping
    {
      reg_no: :registration_no,
      name_english: :name_en,
      name_marathi: :name_mr_in,
      guardian_mobile: :guardian_mobile_no,
      alternate_mobile: :guardian_alternate_mobile_no,
      date_of_birth: :dob
    }
  end

end
