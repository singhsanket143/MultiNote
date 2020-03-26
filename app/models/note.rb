class Note < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :labels
  before_save :default_values
  mount_uploader :image, ImageUploader

  private
  def default_values
    self.is_completed = :false
  end
end
