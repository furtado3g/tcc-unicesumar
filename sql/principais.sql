--Select de reservas
select * 
   from reservations as reserva,
        locations    as locais,
        users        as usuarios
  where reserva.teacher_id  = usuarios.id
    and reserva.location_id = locais.id
    and reserva.date >= to_date(to_char(now(),'DD Mon YYYY'),'DD Mon YYYY');

--Select reservas por periodo
select *
   from reservations as reserva,
        locations    as locais,
        users        as usuarios
  where reserva.teacher_id  = usuarios.id
    and reserva.location_id = locais.id
    and reserva.date 
        between to_date('01 05 2020','DD MM YYYY') 
            and to_date('20 05 2020','DD MM YYYY');

--SELECT RESPONSAVEIS PELOS LOCAIS
SELECT * 
  FROM locations	 as locais,
	   user_location as local_responsavel,
	   users 		 as usuario
 where locais.id = local_responsavel.location_id
   and local_responsavel.user_id = usuario.id; 

--SELEct de acessos por usuario
select * 
  from access as acessos
where acessos.user_id = :pUSER_ID;

--SELECT DE GERENCIAMENTO DE PERMISSOES por usuario
SELECT * 
FROM USER_TYPES AS TPUS
   , type_user_permisions AS UPER
   , permissions as perm
   , users as usu
WHERE TPUS.ID = UPER.tp_user
  AND UPER.id_permission = perm.id 
  and usu.tp_user = tpus.id
  and usu.id = :pUSUID;

