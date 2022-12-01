package DAO;

import DTO.Usuario;
import at.favre.lib.crypto.bcrypt.BCrypt;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;

public class UsuarioSQL {

    Connection conn;

    public ResultSet autenticacaoUsuario(Usuario usuario) {
        conn = new ConexaoSQL().conectaSQL();

        try {
            String sql = "select * from usuario where email = ? and senha = ?";
            PreparedStatement pstm = conn.prepareStatement(sql);
            pstm.setString(1, usuario.getEmail_usuario());
            pstm.setString(2, usuario.getSenha_usuario());
            
            
            //cancelado
//            String password = usuario.getSenha_usuario();

//            String senhaBanco = "?";

//            BCrypt.Result result = BCrypt.verifyer().verify(password.getBytes(StandardCharsets.UTF_8), senhaBanco.getBytes(StandardCharsets.UTF_8));

            ResultSet rs = pstm.executeQuery();

            return rs;

        } catch (SQLException erro) {
            JOptionPane.showMessageDialog(null, "UsuarioSQL: " + erro);
            return null;
        }

    }
}
