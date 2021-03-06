ENV['RAILS_ENV'] ||= 'test'
require "simplecov"
SimpleCov.start("rails")
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'

# Capybara.app_host = "https://localhost:3001"
# Capybara.server_port = 3000

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!
end

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

# require 'capybara/poltergeist'
# Capybara.javascript_driver = :poltergeist
# Capybara.register_driver :poltergeist do |app|
#     Capybara::Poltergeist::Driver.new(app, {:js_errors => false})
# end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end

  RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end
end
end
