update users as usuarios
   set usuarios.name = name,
       usuarios.PASSWORD = password,
       usuarios.email = email,
       usuarios.last_password = usuarios.PASSWORD
       usuarios.user_type = user_type
where usuarios.id = id
