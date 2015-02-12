Rails.application.routes.draw do
 
  root 'static_pages#home'
  get  'game',    to: 'static_pages#game'
  
end
