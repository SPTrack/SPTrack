
package DAO;

import DTO.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;


public class UsuarioDAO {

    Connection conn;
    public ResultSet autenticacaoUsuario(Usuario usuario){
    conn = new ConexaoDAO().conectaBD();
    
        try {
           String sql = "select * from usuario where email = ? and senha = ?";
            PreparedStatement pstm = conn.prepareStatement(sql);
            pstm.setString(1, usuario.getEmail_usuario());
            pstm.setString(2, usuario.getSenha_usuario());
            
            ResultSet rs = pstm.executeQuery();
            return rs;
                    
        } catch (SQLException erro) {
            JOptionPane.showMessageDialog(null, "UsuarioDAO: " + erro);
            return null;
        }
    
    }
}
