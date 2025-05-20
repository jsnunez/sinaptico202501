
-- --------------------------------------------------------
-- para eliminar en cascada los registros de la tabla UsuarioEmpresaCargo
-- -------------------------------------------------------- 
ALTER TABLE UsuarioEmpresaCargo
  DROP FOREIGN KEY UsuarioEmpresaCargo_ibfk_1337;

ALTER TABLE UsuarioEmpresaCargo
  ADD CONSTRAINT UsuarioEmpresaCargo_ibfk_1337
  FOREIGN KEY (userId) REFERENCES Users(id)
  ON DELETE CASCADE;
