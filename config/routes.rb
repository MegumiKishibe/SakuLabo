Rails.application.routes.draw do
  get "courses/index"
  get "sakura_study_path/index"
  root "home#index"

  resources :courses, only: [:index]

  post "enroll", to: "enrollments#create" # LPのGet Started送信先

  get "/sakura_study_path", to: "sakura_study_path#index", as: :sakura_study_path
  get  "/sakura_study_path/result", to: "sakura_study_path#result", as: :sakura_study_path_result
  post "/sakura_study_path/result", to: "sakura_study_path#result"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
